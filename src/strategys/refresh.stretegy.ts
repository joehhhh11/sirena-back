import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClientService } from 'src/modules/client/client.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private clientService: ClientService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'default_secret',
    });
  }

  async validate(payload: any) {
    const user = await this.clientService.findById(payload.sub);
    if (!user) return null;
    return { id: user.id, email: user.email, nombre: user.nombre };
  }
}
