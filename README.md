# Instruya

Proyecto full stack con:
- `frontend`: Angular + PrimeNG
- `backend`: Node.js + Express + TypeScript
- `database`: dump SQL de MySQL

## Estructura

```text
instruya/
  backend/
  frontend/
  database/
  .angular/
  .vscode/
```

## Requisitos

- Node.js 20+ (recomendado)
- npm 10+ (o compatible)
- MySQL 8+

## Base de datos

El dump está en:

- `database/instruya_dump.sql`

### 1. Crear la base

```sql
CREATE DATABASE instruya CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Importar el dump

Desde la raíz del proyecto:

```bash
mysql -u root -p instruya < database/instruya_dump.sql
```

Nota: el dump no incluye `CREATE DATABASE`, por eso primero hay que crearla.

## Backend

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar `.env`

Crear/usar `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_password_mysql
DB_NAME=instruya
PORT=3000
```

### 3. Levantar en desarrollo

```bash
npm run dev
```

API disponible en:

- `http://localhost:3000`

## Frontend

### 1. Instalar dependencias

```bash
cd frontend
npm install
```

### 2. Levantar en desarrollo

```bash
npm start
```

Aplicación disponible en:

- `http://localhost:4200`

## Cómo ejecutar todo

Usar dos terminales:

1. Terminal 1:
```bash
cd backend
npm run dev
```

2. Terminal 2:
```bash
cd frontend
npm start
```

## Usuarios de prueba (recomendados)

- Superadmin:
  - Email: `superadmin@gmail.com`
  - Contraseña: `123456`

- Admin:
  - Email: `admin@gmail.com`
  - Contraseña: `admin123`
  - Nota: todos los admin usan la misma contraseña.

- Alumno:
  - Email: `alumno@gmail.com`
  - Contraseña: `alumno123`
  - Nota: todos los alumnos usan la misma contraseña.

- Docente:
  - Email: `docente18@gmail.com`
  - Contraseña: `docente123`
  - Nota: todos los docentes usan la misma contraseña.

## Scripts útiles

### Backend

- `npm run dev`: desarrollo con recarga
- `npm run build`: compilar TypeScript
- `npm start`: correr build (`dist/server.js`)

### Frontend

- `npm start`: `ng serve`
- `npm run build`: build producción
- `npm test`: tests

