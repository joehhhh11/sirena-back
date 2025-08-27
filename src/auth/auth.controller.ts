import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientService } from 'src/modules/client/client.service';
import type { Response, Request } from 'express';
import { Public } from 'src/config/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private clientService: ClientService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() body) {
    const user = await this.authService.register(
      body.email,
      body.password,
      body.nombre,
    );
    return { id: user.id, email: user.email, nombre: user.nombre };
  }

  @Public()
  @Post('login')
  async login(@Body() body, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateCliente(
      body.email,
      body.password,
    );
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const { accessToken, refreshToken } = await this.authService.login({
      id: user.id,
      email: user.email,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/api/auth/refresh',
    });

    return { accessToken };
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) throw new UnauthorizedException('No hay refresh token');

    const payload = await this.authService.verifyRefreshToken(refreshToken);
    const { accessToken, refreshToken: newRefresh } =
      await this.authService.refreshTokens(payload.sub, refreshToken);

    res.cookie('refresh_token', newRefresh, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/api/auth/refresh',
    });

    return { accessToken };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token', { path: '/api/auth/refresh' });
    if (req.user) {
      await this.authService.logout(req.user['sub']);
    }
    return { message: 'Logged out' };
  }
}
