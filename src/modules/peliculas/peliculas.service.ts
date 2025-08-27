import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { DateTime } from 'luxon'; 

@Injectable()
export class PeliculasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.pelicula.create({
      data: {
        ...data,
        fechaEstreno: data.fechaEstreno
          ? new Date(data.fechaEstreno)
          : undefined,
      },
    });
  }

  async getAll() {
    const peliculas = await this.prisma.pelicula.findMany();

    return peliculas.map((p) => ({
      ...p,
      fechaEstrenoLocal: DateTime.fromJSDate(p.fechaEstreno)
        .setZone('America/Lima')
        .toISO(),
    }));
  }

  async findAll(query: {
    search?: string;
    genero?: string;
    estado?: string;
    page?: number;
    pageSize?: number;
  }) {
    const { search, genero, estado, page = 1, pageSize = 10 } = query;

    const where: any = {
      AND: [
        search
          ? { titulo: { contains: search, mode: 'insensitive' as any } }
          : {},
        genero ? { genero: { has: genero } } : {},
        estado ? { estado: estado.toUpperCase() } : {},
      ],
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.pelicula.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.pelicula.count({ where }),
    ]);

    return {
      items: items.map((p) => ({
        ...p,
        fechaEstrenoLocal: DateTime.fromJSDate(p.fechaEstreno)
          .setZone('America/Lima')
          .toISO(),
      })),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: number) {
    const pelicula = await this.prisma.pelicula.findUnique({ where: { id } });
    if (!pelicula) throw new NotFoundException('Película no encontrada');

    return {
      ...pelicula,
      fechaEstrenoLocal: DateTime.fromJSDate(pelicula.fechaEstreno)
        .setZone('America/Lima')
        .toISO(),
    };
  }

async update(id: number, data: any) {
  const { titulo, sinopsis, duracionMin, clasificacion, genero, estado, fechaEstreno } = data;

  return this.prisma.pelicula.update({
    where: { id },
    data: {
      titulo,
      sinopsis,
      duracionMin,
      clasificacion,
      genero,
      estado,
      fechaEstreno: fechaEstreno ? new Date(fechaEstreno) : undefined,
    },
  });
}


  async remove(id: number) {
    const pelicula = await this.prisma.pelicula.findUnique({ where: { id } });
    if (!pelicula) throw new NotFoundException('Película no encontrada');

    return this.prisma.$transaction([
      this.prisma.turno.updateMany({
        where: { peliculaId: id },
        data: { estado: 'INACTIVO' },
      }),
      this.prisma.pelicula.update({
        where: { id },
        data: { estado: 'INACTIVO' },
      }),
    ]);
  }
}
