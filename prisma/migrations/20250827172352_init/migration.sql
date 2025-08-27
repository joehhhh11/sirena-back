-- CreateEnum
CREATE TYPE "public"."Estado" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "public"."Idioma" AS ENUM ('DOB', 'SUB');

-- CreateEnum
CREATE TYPE "public"."Formato" AS ENUM ('D2', 'D3');

-- CreateTable
CREATE TABLE "public"."Pelicula" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "sinopsis" TEXT,
    "duracionMin" INTEGER NOT NULL,
    "clasificacion" TEXT NOT NULL,
    "genero" TEXT[],
    "estado" "public"."Estado" NOT NULL DEFAULT 'ACTIVO',
    "fechaEstreno" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Pelicula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Turno" (
    "id" SERIAL NOT NULL,
    "peliculaId" INTEGER NOT NULL,
    "sala" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fin" TIMESTAMP(3) NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "idioma" "public"."Idioma" NOT NULL,
    "formato" "public"."Formato" NOT NULL,
    "aforo" INTEGER NOT NULL,
    "estado" "public"."Estado" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Turno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cliente" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT,
    "estado" "public"."Estado" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pelicula_titulo_key" ON "public"."Pelicula"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Turno_sala_inicio_fin_key" ON "public"."Turno"("sala", "inicio", "fin");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "public"."Cliente"("email");

-- AddForeignKey
ALTER TABLE "public"."Turno" ADD CONSTRAINT "Turno_peliculaId_fkey" FOREIGN KEY ("peliculaId") REFERENCES "public"."Pelicula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
