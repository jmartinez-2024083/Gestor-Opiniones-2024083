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
│   ├── configs/
│   ├── helpers/
│   ├── middlewares/
│   └── src/
│
├── postgres_db/
│   └── docker-compose.yml            
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

## Roles y Permisos

- **USER**: Usuario estándar (default al registrarse)
- **ADMIN**: Administrador del sistema
- **MODERATOR**: Moderador de contenido
- **SUPER_ADMIN**: Super administrador

Los roles se configuran automáticamente mediante seeds en la base de datos.

## Modelos de Base de Datos

### User

- `id` (UUID, PK)
- `username` (unique)
- `email` (unique)
- `passwordHash`
- `emailVerified`
- `isActive`
- `createdAt`, `updatedAt`

### UserProfile

- `userId` (FK)
- `firstName`
- `lastName`
- `phone`
- `avatar` (URL Cloudinary)
- `bio`

### UserEmail

- `userId` (FK)
- `verificationToken`
- `verificationTokenExpires`

### UserPasswordReset

- `userId` (FK)
- `resetToken`
- `resetTokenExpires`

### Role

- `id` (UUID, PK)
- `name` (USER, ADMIN, etc.)
- `description`

### UserRole (Tabla intermedia many-to-many)

- `userId` (FK)
- `roleId` (FK)


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
