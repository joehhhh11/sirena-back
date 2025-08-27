import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { DateTime } from 'luxon';

@Injectable()
export class TurnosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const pelicula = await this.prisma.pelicula.findUnique({
      where: { id: Number(data.peliculaId) },
    });
    if (!pelicula) throw new NotFoundException('Película no encontrada');

    const inicio = new Date(data.inicio);
    const fin = new Date(data.fin);

    if (fin <= inicio)
      throw new BadRequestException('El fin debe ser posterior al inicio');

    const duracionMs = pelicula.duracionMin * 60 * 1000;
    if (fin.getTime() - inicio.getTime() < duracionMs) {
      throw new BadRequestException(
        'La duración del turno es menor que la duración de la película',
      );
    }

    const overlap = await this.prisma.turno.findFirst({
      where: {
        sala: data.sala,
        AND: [{ inicio: { lt: data.fin } }, { fin: { gt: data.inicio } }],
      },
    });
    if (overlap)
      throw new BadRequestException('Ya existe un turno solapado en esta sala');

    return this.prisma.turno.create({
      data: { ...data,peliculaId: Number(data.peliculaId), inicio, fin },
    });
  }

  async findAll(query: {
    peliculaId?: string;
    sala?: string;
    desde?: string;
    hasta?: string;
  }) {
    const where: any = {};

    if (query.peliculaId) where.peliculaId = parseInt(query.peliculaId, 10); // <-- convertir a número
    if (query.sala) where.sala = query.sala;

    if (query.desde || query.hasta) {
      where.inicio = {};
      if (query.desde) where.inicio.gte = new Date(query.desde);
      if (query.hasta) where.inicio.lte = new Date(query.hasta);
    }

    return this.prisma.turno.findMany({ where });
  }

  async findOne(id: number) {
    const turno = await this.prisma.turno.findUnique({ where: { id } });
    if (!turno) throw new NotFoundException('Turno no encontrado');

    return {
      ...turno,
      inicioLocal: DateTime.fromJSDate(turno.inicio)
        .setZone('America/Lima')
        .toISO(),
      finLocal: DateTime.fromJSDate(turno.fin).setZone('America/Lima').toISO(),
    };
  }

  async update(id: number, data: any) {
    const {
      peliculaId,
      sala,
      inicio,
      fin,
      precio,
      idioma,
      formato,
      aforo,
      estado,
    } = data;

    return this.prisma.turno.update({
      where: { id },
      data: {
        peliculaId,
        sala,
        inicio: inicio ? new Date(inicio) : undefined,
        fin: fin ? new Date(fin) : undefined,
        precio,
        idioma,
        formato,
        aforo,
        estado,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.turno.update({
      where: { id },
      data: { estado: 'INACTIVO' },
    });
  }
  async obtenerDisponibles(peliculaId: number, sala: string, fecha: string) {
    const pelicula = await this.prisma.pelicula.findUnique({
      where: { id: peliculaId },
    });
    if (!pelicula) throw new NotFoundException('Película no encontrada');

    const turnosExistentes = await this.prisma.turno.findMany({
      where: {
        sala,
        inicio: {
          gte: new Date(fecha + 'T00:00:00Z'),
          lte: new Date(fecha + 'T23:59:59Z'),
        },
        estado: 'ACTIVO',
      },
      orderBy: { inicio: 'asc' },
    });

    const slots: { inicio: string; fin: string; disponible: boolean }[] = [];
    let hora = new Date(fecha + 'T10:00:00');
    const cierre = new Date(fecha + 'T23:00:00');

    while (
      hora.getTime() + pelicula.duracionMin * 60 * 1000 <=
      cierre.getTime()
    ) {
      const fin = new Date(hora.getTime() + pelicula.duracionMin * 60 * 1000);
      const solapado = turnosExistentes.some(
        (t) => !(fin <= new Date(t.inicio) || hora >= new Date(t.fin)),
      );
      slots.push({
        inicio: hora.toISOString(),
        fin: fin.toISOString(),
        disponible: !solapado,
      });
      hora = new Date(hora.getTime() + 30 * 60 * 1000);
    }

    return slots;
  }
}
