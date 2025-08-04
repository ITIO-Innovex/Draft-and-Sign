# Draft & Sign - Microservices Architecture

This project implements a microservices architecture for both backend and frontend services, allowing you to run all services with a single command.

## Architecture Overview

### Backend Services
- **Auth Service** (Port 4000): User authentication and authorization
- **PDF Service** (Port 4001): PDF processing and management
- **MongoDB** (Port 27017): Database

### Frontend Services
- **Auth Frontend** (Port 3000): Authentication UI
- **PDF Frontend** (Port 3001): PDF management UI
- **Main Frontend** (Port 3002): Main application with navigation

### Shared Packages
- **shared-ui**: Reusable React components
- **auth-lib**: Authentication utilities

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 20+
- npm

### Running All Services

#### Option 1: Run Everything (Backend + Frontend)
```bash
# Install dependencies
npm run install:all

# Start all services (backend + frontend)
npm run dev:all
```

#### Option 2: Run Backend Only
```bash
npm run dev:backend
```

#### Option 3: Run Frontend Only
```bash
npm run dev:frontend
```

### Access Points

After running the services, you can access:

- **Main Application**: http://localhost:3002
- **Auth Service UI**: http://localhost:3000
- **PDF Service UI**: http://localhost:3001
- **Auth API**: http://localhost:4000
- **PDF API**: http://localhost:4001
- **MongoDB**: localhost:27017

## Project Structure

```
Draft-and-Sign/
├── docker-compose.yml              # Backend services
├── docker-compose.frontend.yml     # Frontend services
├── package.json                    # Root workspace config
├── packages/
│   ├── auth-lib/                   # Shared auth utilities
│   └── shared-ui/                  # Shared React components
└── services/
    ├── auth-service/
    │   ├── backend/                # Auth API service
    │   └── frontend/               # Auth UI service
    ├── pdf-service/
    │   ├── backend/                # PDF API service
    │   └── frontend/               # PDF UI service
    └── main-frontend/              # Main application
```

## Development Commands

### Build Services
```bash
# Build all services
npm run build:all

# Build backend only
npm run build:backend

# Build frontend only
npm run build:frontend
```

### Stop Services
```bash
# Stop all services
npm run stop:all

# Stop backend only
npm run stop:backend

# Stop frontend only
npm run stop:frontend
```

## Environment Variables

Each service can have its own `.env` file:

- `services/auth-service/backend/.env`
- `services/auth-service/frontend/.env`
- `services/pdf-service/backend/.env`
- `services/pdf-service/frontend/.env`
- `services/main-frontend/.env`

## Key Features

1. **Single Command Startup**: Run all services with one command
2. **Hot Reloading**: All services support hot reloading during development
3. **Shared Packages**: Reusable code across services
4. **Docker Isolation**: Each service runs in its own container
5. **Monorepo Structure**: Easy dependency management and code sharing

## Microservices Communication

- Frontend services communicate with backend APIs via HTTP
- Services can communicate with each other using the shared packages
- Authentication is handled centrally through the auth service

## Adding New Services

To add a new service:

1. Create the service directory under `services/`
2. Add backend and/or frontend subdirectories
3. Create Dockerfile(s) for the service
4. Add the service to the appropriate docker-compose file
5. Update the root package.json scripts if needed

## Troubleshooting

### Port Conflicts
If you get port conflicts, check that no other services are running on the required ports (3000-3002, 4000-4001, 27017).

### Build Issues
If you encounter build issues:
```bash
# Clean and rebuild
docker-compose down
docker system prune -f
npm run build:all
```

### Dependencies Issues
If shared packages aren't working:
```bash
npm run install:packages
``` 