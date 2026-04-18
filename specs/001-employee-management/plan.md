# Implementation Plan: Employee Management System

**Branch**: `[001-employee-management]` | **Date**: 2026-04-17 | **Spec**: ../spec.md
**Input**: Feature specification from `/specs/001-employee-management/spec.md`

## Summary

Build a modern full-stack employee management system with a Node.js Backend-For-Frontend (BFF) layer, a React + Material UI frontend, and Postgres persistence. The backend exposes REST APIs for employee CRUD and view-centric endpoints mapped to frontend widgets, while shared TypeScript packages contain domain models, validation, and business logic.

## Technical Context

**Language/Version**: Node.js 20+ with TypeScript 5+; React 19+ with strict TypeScript.
**Primary Dependencies**: Express (backend REST+BFF), React, Material UI, Prisma or Postgres `pg` client, Zod for runtime validation, Jest + Testing Library + Supertest for tests.
**Storage**: PostgreSQL as the primary persistent data store for employee records.
**Testing**: Jest for unit tests, React Testing Library for frontend components, Supertest for backend endpoint tests, and integration tests for the BFF + DB flow.
**Target Platform**: Linux/macOS server for backend, modern browsers for frontend.
**Project Type**: full-stack web application (backend + SPA + shared types/business logic).
**Performance Goals**: list and detail views should render within 200ms for normal admin workloads; backend REST calls should respond in under 100ms for cached/common queries.
**Constraints**: Must use REST for all frontend-facing APIs, Postgres for storage, and a BFF design for frontend-specific endpoints. Keep the architecture minimal and follow library-first, test-first principles.
**Scale/Scope**: Internal admin tool for up to 100 concurrent users; simple employee directory and management workflow with one CRUD screen and a detail view.

## Constitution Check

The current constitution requires library-first engineering, CLI exposure, strict test-first development, simplicity-first architecture, strict TypeScript safety, and performance/security by default. This plan aligns with those principles by:

- isolating business logic in shared packages before application integration
- exposing backend behaviors via REST endpoints and CLI-friendly services
- using TypeScript strict mode across backend, frontend, and shared code
- selecting a simple Express + React + Postgres stack, avoiding unnecessary abstractions

## Project Structure

```text
backend/
├── src/
│   ├── controllers/         # REST/BFF endpoint handlers
│   ├── routes/              # express route definitions and view-centric API mappings
│   ├── services/            # business logic and integration orchestration
│   ├── db/                  # Postgres connectivity, schema, and repository layer
│   ├── cli/                 # CLI utilities for library-powered operations
│   └── app.ts              # Express app bootstrap
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/

frontend/
├── src/
│   ├── components/          # reusable React UI components
│   ├── pages/               # page-level views like EmployeeList and EmployeeDetail
│   ├── services/            # API client wrappers and frontend adapters
│   ├── hooks/               # reusable UI hooks
│   ├── types/               # frontend-specific TypeScript types
│   └── App.tsx
└── tests/
    ├── unit/
    └── integration/

shared/
├── src/
│   ├── types/               # shared domain types and interfaces
│   ├── validation/          # shared Zod schemas and validation helpers
│   └── employees/           # reusable employee domain logic and CLI helpers
└── tests/
```

**Structure Decision**: Use a split `backend/`, `frontend/`, and `shared/` layout to keep the BFF logic separate from the React UI and to enforce reusable domain code. The `shared/` folder supports the library-first obligation and keeps shared models and validation in a single place.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Shared package layer | Enables library-first domain sharing between backend and frontend | Placing all shared types inside one app would blur boundaries and reduce reuse/testability |
| Express + Prisma/Zod | Provides minimal, explicit backend REST handling with type-safe DB access | Raw SQL without a lightweight schema mapping would increase developer error and reduce clarity |

## Implementation Approach

1. Create `shared/` package containing employee domain types, Zod validation schemas, and CLI-friendly utilities.
2. Build the Postgres schema for employee records with fields inferred from the spec: `id`, `fullName`, `email`, `title`, `department`, `status`, `manager`, `startDate`, `phone`, `location`.
3. Implement backend `backend/src/db/` layer for Postgres access, then backend `services/` layer for business logic.
4. Expose REST endpoints in `backend/src/routes/` with BFF-style naming that corresponds to frontend views/widgets.
5. Implement React frontend screens in `frontend/src/pages/` and wire them to the BFF with `frontend/src/services/api.ts`.
6. Write tests first for domain logic, persistence, API routes, and frontend components before implementing features.
7. Add CLI helpers in `backend/src/cli/` or `shared/src/cli/` to support library-first automation and manual testing.

## Next Step

Proceed to the task breakdown phase with `/speckit.tasks` to convert this plan into discrete implementation tasks. After tasks are created, start implementation from shared domain packages outward to backend REST endpoints and then frontend integration.
