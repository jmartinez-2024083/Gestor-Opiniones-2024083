# Gestor de Opiniones 2024083

Sistema de gestión de opiniones compuesto por tres microservicios independientes y un contenedor de base de datos.

## Estructura del Proyecto

```
Gestor-Opiniones-2024083/
├── auth-service/               # Servicio de autenticación (.NET 8)
│   ├── src/
│   │   ├── AuthService.Api/
│   │   ├── AuthService.Application/
│   │   ├── AuthService.Domain/
│   │   └── AuthService.Persistence/
│   ├── AuthService.sln
│   └── global.json
│
├── postgres_db/
│   └── docker-compose.yml
│
├── publication-service/        # Servicio de publicaciones (Node.js)
│   ├── configs/
│   ├── middlewares/
│   ├── src/
│   ├── .env.example
│   ├── index.js
│   └── package.json
│
├── comments-service/           # Servicio de comentarios (Node.js)
│   ├── configs/
│   ├── middlewares/
│   ├── src/
│   ├── .env.example
│   ├── index.js
│   └── package.json
│
├── .gitignore
├── LICENSE
├── README.md
└── API.md
```

## Servicios

| Componente          | Tecnología   | Puerto | Base de datos |
| ------------------- | ------------ | ------ | ------------- |
| auth-service        | .NET 8       | 5000   | PostgreSQL    |
| publication-service | Node.js      | 3003   | MongoDB       |
| comments-service    | Node.js      | 3004   | MongoDB       |
| postgres_db         | Docker       | 5438   | —             |

## Requisitos Previos

- Docker y Docker Compose
- .NET 8 SDK
- Node.js 18+
- pnpm

## Instalación y Configuración

### 1. Base de datos (PostgreSQL)

```bash
cd postgres_db
docker compose down -v
docker compose up -d
```

### 2. Auth Service (.NET 8)

```bash
cd auth-service
```

Crea el archivo `src/AuthService.Api/appsettings.Development.json` basándote en `appsettings.json` y completa los valores vacíos.

```bash
dotnet run --project src/AuthService.Api
```

### 3. Publication Service (Node.js)

```bash
cd publication-service
cp .env.example .env
# Edita el .env con tus valores
pnpm install
pnpm run dev
```

### 4. Comments Service (Node.js)

```bash
cd comments-service
cp .env.example .env
# Edita el .env con tus valores
pnpm install
pnpm run dev
```

## Variables de Entorno

Cada servicio Node.js tiene un `.env.example` en su carpeta. Cópialo como `.env` y completa los valores.

El auth-service usa `appsettings.Development.json` — crea ese archivo localmente con los valores reales basándote en `appsettings.json`.

> ⚠️ Nunca subas archivos `.env` ni `appsettings.Development.json` al repositorio.

## Documentación de APIs

Consulta [API.md](./API.md) para ver todos los endpoints disponibles con ejemplos de uso.

## Autor

**Jeremy Martinez** — IN6AV, Kinal Guatemala 2026

## Licencia

MIT
