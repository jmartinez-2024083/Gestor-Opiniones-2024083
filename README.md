# Gestor de Opiniones 2024083 - Auth Service

## Descripción

Servicio de autenticación y gestión de usuarios implementado en Node.js y Express. Permite registro, inicio de sesión, recuperación de contraseñas, gestión de perfiles y roles, y manejo de archivos de perfil en Cloudinary.

## Funcionalidades Principales

- Registro y autenticación de usuarios con JWT
- Recuperación y restablecimiento de contraseñas
- Gestión de perfiles de usuario y subida de fotos (Cloudinary)
- Sistema de roles y permisos
- Envío de correos electrónicos (SMTP)
- Rate limiting y protección de endpoints
- Middleware de manejo global de errores

## Tecnologías Utilizadas

- Node.js
- Express
- PostgreSQL
- JWT
- Cloudinary
- Nodemailer
- dotenv
- Helmet, CORS, Rate Limiting

## Configuración

1. Clona el repositorio y navega a la carpeta `postrgres_db`.

2. Eliminar y crea el docker compose para que no hayan incidencias.
```bash
  docker compose down -v
  docker compose up -d
```

2. Navega y a la carpeta `auth-service`.

3. Ejecuta el siguiente comando para actualizar las dependencias e iniciar el servidor.
```bash
  pnpm install
  pnpm run dev
```

## Notas
- Este servicio está pensado para ser usado como respaldo ante caídas del AuthService principal.
- Mantén sincronizadas las variables de entorno críticas (DB, JWT, Cloudinary, SMTP) con el servicio principal.
- Para pruebas locales, asegúrate de tener una base de datos PostgreSQL y credenciales válidas.

## Desarrollado por Jeremy Jorge Aaron Martinez - IN6AV, Kinal Guatemala 2026

```
Gestor-Opiniones-2024083/
├── auth-service/
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
├── publication-service/
│   ├── configs/
│   ├── node_modules/
│   ├── middlewares/
│   ├── src/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── pnpm-lock.yaml
│
│
├── coments-service/
│   ├── configs/
│   ├── node_modules/
│   ├── middlewares/
│   ├── src/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── pnpm-lock.yaml
│
├── .gitignore
├── LICENSE
└── README.md
```

## Endpoints Principales

### Autenticación

| Método | Endpoint                        | Descripción                    | Auth     |
| ------ | ------------------------------- | ------------------------------ | -------- |
| POST   | `/api/auth/register`            | Registrar nuevo usuario        | No       |
| POST   | `/api/auth/login`               | Iniciar sesión                 | No       |
| POST   | `/api/auth/verify-email`        | Verificar email con token      | No       |
| POST   | `/api/auth/resend-verification` | Reenviar email de verificación | No       |
| POST   | `/api/auth/forgot-password`     | Solicitar reset de contraseña  | No       |
| POST   | `/api/auth/reset-password`      | Resetear contraseña con token  | No       |
| GET    | `/api/auth/profile`             | Obtener perfil del usuario     | Sí (JWT) |

### Gestión de Usuarios (Admin)

| Método | Endpoint                       | Descripción               | Auth       |
| ------ | ------------------------------ | ------------------------- | ---------- |
| PUT    | `/api/users/:userId/role`      | Actualizar rol de usuario | Sí (Admin) |
| GET    | `/api/users/:userId/roles`     | Obtener roles de usuario  | Sí (Admin) |
| GET    | `/api/users/by-role/:roleName` | Listar usuarios por rol   | Sí (Admin) |

### Ejemplo de Request

**Registro:**

```bash
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Login:**

```bash
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Perfil (con token):**

```bash
GET http://localhost:3001/api/auth/profile
Authorization: Bearer <tu-jwt-token>
```

### publications (/publications)

| Método | Ruta                              | Descripción                          | Auth |
| ------ | ----------------------------      | ------------------------------       | ---- |
| POST   | /publications                     | Crear una nueva publicación          | Sí   |
| GET    | /publications                     | Obtener todos las publicaciones      | Sí   |
| GET    | /publications/my-publications     | Obtener una publicacion por usuario  | Sí   |
| PUT    | /publications/my-publications/id  | Actualizar publicacion               | Sí   |
| DELETE | /publications/my-publications/id  | Eliminar publicacion                 | Sí   |

**create (con token):**

```bash
GET http://localhost:3003/gestoropiniones/v1/publications
Authorization: Bearer <tu-jwt-token>

{
  "titulo": "",
  "categoria": "POSITIVA",
  "texto": "."
}
```

**update (con token):**

```bash
GET http://localhost:3003/gestoropiniones/v1/publications/my-publications/id
Authorization: Bearer <tu-jwt-token>

{
  "titulo": "",
  "categoria": "POSITIVA",
  "texto": "."
}
```

## Notas de Desarrollo

- El servidor escucha en el puerto definido en `.env` (default: 3001)
- Las rutas están prefijadas con `/api`
- Los tokens JWT expiran según configuración en `.env`
- Los emails de verificación y reset de contraseña son válidos por 24 horas
- Las imágenes de perfil se suben a Cloudinary automáticamente
- Rate limiting configurado: 100 requests por 15 minutos por IP

## Autor

**Jeremy Martinez**

## Licencia

MIT
