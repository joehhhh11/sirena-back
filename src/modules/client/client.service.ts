import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.cliente.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.cliente.findUnique({ where: { id } });
  }

  async createClient(email: string, password: string, nombre?: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.cliente.create({
      data: { email, password: hashed, nombre },
    });
  }
  async setCurrentRefreshToken(refreshToken: string, clienteId: number) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    return this.prisma.cliente.update({
      where: { id: clienteId },
      data: { currentHashedRefreshToken: hashed },
    });
  }

  async removeRefreshToken(clienteId: number) {
    return this.prisma.cliente.update({
      where: { id: clienteId },
      data: { currentHashedRefreshToken: null },
    });
  }

  async validatePassword(password: string, hashed: string) {
    return bcrypt.compare(password, hashed);
  }
}
