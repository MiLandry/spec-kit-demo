# Spec Kit Demo

A full-stack employee management system built with a monorepo structure and a spec-driven workflow.

## Repository Layout

- `backend/` - Express backend, Postgres repository layer, and REST APIs
- `frontend/` - React + Material UI single-page app
- `shared/` - shared TypeScript domain types and validation
- `specs/` - feature specifications, plans, and task tracking
- `.specify/` - Spec Kit workflow metadata and templates

## Prerequisites

- Node.js 24.x
- npm 10.x
- PostgreSQL (for backend persistence)

## Local Setup

1. Install dependencies at the repository root:

```bash
npm install
```

2. Copy environment settings:

```bash
cp .env.example .env
```

3. Configure `.env` with your local database connection and backend port.

4. Create the database and run the schema migration:

```bash
createdb -O employeeadmin employee_management
psql -h localhost -U employeeadmin -d employee_management -f backend/src/db/migrations/001-create-employees-table.sql
```

If you do not have `createdb` or `psql` installed, install PostgreSQL or use Docker for a local database.

## Run the App

### Frontend

```bash
npm run dev --workspace frontend
```

### Backend

```bash
npm run dev --workspace backend
```

### Run both services in separate terminals

- Terminal 1: `npm run dev --workspace backend`
- Terminal 2: `npm run dev --workspace frontend`

## Build

### Build frontend only

```bash
npm run build --workspace frontend
```

### Build backend only

```bash
npm run build --workspace backend
```

### Build all workspaces

```bash
npm run build --workspaces
```

## Testing

### Run all workspace tests

```bash
npm run test --workspaces
```

### Run frontend tests only

```bash
npm run test --workspace frontend -- --runInBand
```

### Run backend tests only

```bash
npm run test --workspace backend -- --runInBand
```

## Contribution

See `CONTRIBUTING.md` for contribution guidelines, branch naming, and PR expectations.
