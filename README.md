# Computers Service Monorepo

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
