import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/modules/client/client.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, nombre?: string) {
    const exists = await this.clientService.findByEmail(email);
    if (exists) throw new UnauthorizedException('El email ya existe');
    return this.clientService.createClient(email, password, nombre);
  }

  async validateCliente(email: string, password: string) {
    const cliente = await this.clientService.findByEmail(email);
    if (!cliente) return null;

    const valid = await bcrypt.compare(password, cliente.password);
    if (!valid) return null;

    return cliente;
  }

  async login(cliente: { id: number; email: string }) {
    const payload = { sub: cliente.id, email: cliente.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = this.jwtService.sign(
      { sub: cliente.id },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      },
    );

    await this.clientService.setCurrentRefreshToken(refreshToken, cliente.id);

    return { accessToken, refreshToken };
  }

  async refreshTokens(clienteId: number, refreshToken: string) {
    const cliente = await this.clientService.findById(clienteId);
    if (!cliente || !cliente.currentHashedRefreshToken) {
      throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      cliente.currentHashedRefreshToken,
    );
    if (!isValid) throw new UnauthorizedException();

    return this.login({ id: cliente.id, email: cliente.email });
  }

  async verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async logout(clienteId: number) {
    await this.clientService.removeRefreshToken(clienteId);
  }
}
