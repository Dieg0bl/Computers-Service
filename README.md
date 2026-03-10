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
