import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategys/jwt.strategy';
import { RefreshTokenStrategy } from 'src/strategys/refresh.stretegy';
import { ClientService } from 'src/modules/client/client.service';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, ClientService, JwtStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
