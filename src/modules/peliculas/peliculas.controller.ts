import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  @Post()
  create(@Body() data: any) {
    return this.peliculasService.create(data);
  }

  @Get('all')
  getAll() {
    return this.peliculasService.getAll();
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('genero') genero?: string,
    @Query('estado') estado?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.peliculasService.findAll({
      search,
      genero,
      estado,
      page: page ? parseInt(page) : undefined,
      pageSize: pageSize ? parseInt(pageSize) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peliculasService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.peliculasService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peliculasService.remove(Number(id));
  }
}
