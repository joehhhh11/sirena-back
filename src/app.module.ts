import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientService } from './modules/client/client.service';
import { PeliculasService } from './modules/peliculas/peliculas.service';
import { TurnosService } from './modules/turnos/turnos.service';
import { TurnosController } from './modules/turnos/turnos.controller';
import { PeliculasController } from './modules/peliculas/peliculas.controller';
import { ClientController } from './modules/client/client.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './config/prisma/prisma.module';
@Module({
    imports: [
    ConfigModule.forRoot({
      isGlobal: true,            
      envFilePath: '.env',      
    }),
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController, TurnosController, PeliculasController, ClientController],
  providers: [AppService, ClientService, PeliculasService, TurnosService],
})
export class AppModule {}
