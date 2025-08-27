import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { BadRequestException } from '@nestjs/common';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Post()
  create(@Body() data: any) {
    return this.turnosService.create(data);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.turnosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.turnosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.remove(id);
  }

  @Get('disponibles')
  async obtenerDisponibles(
    @Query('peliculaId', ParseIntPipe) peliculaId: number,
    @Query('sala') sala: string,
    @Query('fecha') fecha: string,
  ) {
    if (!sala || !fecha) {
      throw new BadRequestException('Debe proporcionar sala y fecha');
    }

    return this.turnosService.obtenerDisponibles(peliculaId, sala, fecha);
  }
}
