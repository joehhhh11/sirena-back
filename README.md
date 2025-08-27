# Proyecto Backend - Cine App (NestJS + PostgreSQL)

Este proyecto es el backend de la aplicación de gestión de películas y turnos de cine usando **NestJS** y **PostgreSQL**.

---

## Stack Tecnológico

- **NestJS** (v10.x) - Framework de Node.js para aplicaciones escalables y mantenibles.
- **PostgreSQL** (v17.x) - Base de datos relacional.
- **Prisma** (v6.x) - ORM moderno para Node.js/TypeScript.
- **Node.js** (v20.x) y **npm** (v9.x) - Entorno de ejecución.
- **Angular** (v16.x) + **Tailwind CSS** en el frontend (explicación más abajo).

### Por qué NestJS y Angular + Tailwind

- **NestJS**: Estructura modular, inyección de dependencias, escalable y compatible con TypeScript.
- **Angular**: Frontend sólido y estructurado, integración fácil con servicios REST.
- **Tailwind CSS**: Ligero, rápido para estilos sin dependencias pesadas.
- Se optó por no usar otras alternativas como Next.js/React por **optimización de recursos** y consistencia en proyectos fullstack corporativos.

---

## Requisitos

- Node.js >= 20.x
- npm >= 9.x
- PostgreSQL >= 17.x
- Nest CLI >= 10.x

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/cine-backend.git
cd cine-backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz:

```env
DATABASE_URL="postgresql://postgres:joehxd@localhost:5432/sirenadb"
JWT_SECRET="supersecretkey"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="refreshsecret"
JWT_REFRESH_EXPIRES_IN="7d"
```

---

## Configuración de la base de datos

- La base de datos está definida en el proyecto usando PostgreSQL.
- Prisma se encarga de generar el esquema y migraciones.

1. Inicializar Prisma:

```bash
npx prisma init
```

Esto creará:

- `prisma/schema.prisma`
- `.env` (ya lo tenemos con DATABASE_URL)
- Carpeta `prisma/` para migraciones y seeds

2. Definir el esquema en `prisma/schema.prisma` con tus modelos (`Cliente`, `Pelicula`, `Turno`, etc.)

3. Generar el cliente Prisma:

```bash
npx prisma generate
```

4. Crear la base de datos (si no existe):

```sql
CREATE DATABASE sirenadb;
```

5. Crear migración inicial:

```bash
npx prisma migrate dev --name init
```

6. Ejecutar seed (usuarios y datos de prueba):

```bash
npx prisma db seed
```

7. Abrir Prisma Studio (opcional, para ver datos):

```bash
npx prisma studio
```

---

## Usuario de prueba

- **Email:** `adminxd@example.com`  
- **Password:** `Admin123!`  
- Este usuario se creó en el seed inicial y tiene permisos administrativos.

---

## Colección Postman

- La colección Postman se encuentra en `postman_collection.json`.  
- Contiene todos los endpoints:

```
/api/auth/register
/api/auth/login
/api/auth/refresh
/api/auth/logout
/api/client
/api/peliculas
/api/peliculas/:id
/api/turnos
/api/turnos/:id
/api/turnos/disponibles
```

- Importar el archivo en Postman para probar la API.

---

## Scripts útiles

```bash
# Ejecutar la aplicación en modo desarrollo
npm run start:dev

# Ejecutar pruebas unitarias
npm run test

# Ejecutar lint
npm run lint

# Construir para producción
npm run build
```

---

## Estructura del proyecto

```
src/
├─ modules/
│  ├─ auth/         # Autenticación JWT
│  ├─ client/       # Gestión de clientes
│  ├─ peliculas/    # CRUD de películas
│  └─ turnos/       # CRUD de turnos
├─ config/
│  ├─ prisma/       # PrismaService
│  └─ public.decorator.ts
├─ main.ts          # Entry point de NestJS
```

---

## Prisma

- Generar cliente Prisma:

```bash
npx prisma generate
```

- Visualizar esquema:

```bash
npx prisma studio
```

- Migraciones:

```bash
npx prisma migrate dev --name <nombre_migracion>
```

- Seed:

```bash
npx prisma db seed
```

---

## Variables de Entorno

```env
DATABASE_URL="postgresql://postgres:joehxd@localhost:5432/sirenadb"
JWT_SECRET="supersecretkey"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="refreshsecret"
JWT_REFRESH_EXPIRES_IN="7d"
```

- `DATABASE_URL`: conexión a PostgreSQL.
- `JWT_SECRET`: clave para token de acceso.
- `JWT_EXPIRES_IN`: expiración del token de acceso.
- `JWT_REFRESH_SECRET`: clave para refresh token.
- `JWT_REFRESH_EXPIRES_IN`: expiración del refresh token.

---

## Notas

- La elección de NestJS + Angular + Tailwind permite un stack **TypeScript fullstack**, rápido y mantenible.
- La colección Postman permite probar toda la API sin necesidad de frontend inicialmente.
- La base de datos contiene un usuario admin (`adminxd@example.com`) listo para pruebas.

