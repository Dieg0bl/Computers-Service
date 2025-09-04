# Computers Service

## Descripción

**Computers Service** es un sistema completo de gestión para talleres de reparación de computadoras. Esta aplicación web permite administrar equipos, reparaciones, tiendas y usuarios con un sistema robusto de autenticación y control de acceso basado en roles.

### Características principales
- **Gestión de equipos**: Registro y seguimiento de computadoras y hardware
- **Control de reparaciones**: Seguimiento completo del estado de reparaciones
- **Administración de tiendas**: Gestión de múltiples ubicaciones de servicio
- **Sistema de usuarios**: Autenticación segura con roles (Administrador/Usuario básico)
- **Informes**: Generación de reportes y estadísticas
- **API REST**: Backend completo con documentación OpenAPI/Swagger

### Stack tecnológico
- **Backend**: Java 17, Spring Boot 3.2.5, Spring Security, Spring Data JPA
- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Base de datos**: PostgreSQL (producción), H2 (desarrollo)
- **Containerización**: Docker Compose
- **Testing**: JUnit (backend), Vitest (frontend)

## Estructura
- `backend/`: Java + Spring Boot
- `frontend/`: React + Vite

## Requisitos previos
- Java 17+
- Node.js 18+
- Docker (opcional, para entorno completo)

## Cómo correr el proyecto

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Docker (app + db)
```bash
docker-compose up --build
```

### Ejecutar tests
- Backend: `cd backend && mvn test`
- Frontend: `cd frontend && npm run test`

## Checklist de producción
- [x] Código ordenado y limpio (MVC, DRY, SOLID donde aplica)
- [x] .gitignore bien configurado
- [x] Linter y formatter (Prettier recomendado)
- [x] Tests unitarios básicos en backend y frontend
- [x] Seguridad básica (Spring Security, sin datos sensibles en repo)
- [x] Aviso legal accesible
- [x] Docker Compose funcional
- [x] README claro y actualizado

## Notas
- No subas contraseñas ni datos sensibles.
- Revisa el código antes de hacer commit.
- Usa ramas y PRs si trabajas en equipo.
