import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.pelicula.createMany({
    data: [
      {
        titulo: 'The Matrix',
        sinopsis: 'Un hacker descubre la realidad virtual...',
        duracionMin: 136,
        clasificacion: 'R',
        genero: ['Accion', 'Ciencia Ficción'],
        fechaEstreno: new Date('1999-03-31')
      },
      {
        titulo: 'Inception',
        sinopsis: 'Sueños dentro de sueños...',
        duracionMin: 148,
        clasificacion: 'PG-13',
        genero: ['Accion', 'Thriller'],
        fechaEstreno: new Date('2010-07-16')
      }
    ]
  });

  await prisma.cliente.create({
    data: {
      email: 'admin@example.com',
      password: 'Admin123!', 
      nombre: 'Admin'
    }
  });

  console.log('Seed completado!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
