# Computers Service Monorepo

## Estructura
- `backend/`: Java + Spring Boot
- `frontend/`: React + Vite

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

## Notas
- No subas contraseñas ni datos sensibles.
- Revisa el código antes de hacer commit.
- Usa ramas y PRs si trabajas en equipo.
