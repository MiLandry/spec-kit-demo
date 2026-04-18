# Tasks: Employee Management System

**Input**: Design documents from `/specs/001-employee-management/`
**Prerequisites**: plan.md (✓), spec.md (✓)

**Organization**: Tasks are grouped by Phase and User Story for independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, minimal dependencies)
- **[Story]**: User story label (US1, US2, US3) for feature phases
- Each task includes exact file paths for implementation

---

## Phase 1: Setup and Project Initialization

**Purpose**: Initialize project structure, package.json files, and tooling configuration.

- [x] T001 Create project root structure and shared package directory at `shared/`
- [x] T002 [P] Initialize shared package with TypeScript config at `shared/tsconfig.json`
- [x] T003 [P] Initialize backend package with TypeScript config at `backend/tsconfig.json`
- [x] T004 [P] Initialize frontend package with React and TypeScript config at `frontend/`
- [x] T005 Create root `package.json` with monorepo workspace configuration for `shared/`, `backend/`, `frontend/`
- [x] T006 [P] Create Postgres setup script at `.specify/scripts/setup-postgres.sh`
- [x] T007 Add `.env` template at `.env.example` for local Postgres credentials and backend port

---

## Phase 2: Foundational (Shared Domain and Persistence)

**Purpose**: Build shared domain types, validation, database schema, and repository layer.

- [x] T008 [P] Create shared employee types in `shared/src/types/employee.ts` with all fields from spec
- [x] T009 [P] Create Zod validation schemas in `shared/src/validation/employee.ts` for required/optional fields
- [x] T010 Create Postgres schema migration in `backend/src/db/migrations/001-create-employees-table.sql`
- [x] T011 Set up Postgres connection pool in `backend/src/db/connection.ts`
- [x] T012 [P] Create employee repository layer in `backend/src/db/repositories/employeeRepository.ts` with CRUD methods
- [x] T013 Create backend service layer in `backend/src/services/employeeService.ts` for business logic
- [x] T014 [P] Create Express app bootstrap in `backend/src/app.ts` with middleware setup
- [x] T015 Create shared CLI entry point in `shared/src/cli/index.ts` for testing and automation

---

## Phase 3: User Story 1 - Manage Employee Records (CRUD Core)

**Story**: An administrator can view a list of employees, add a new employee, update an existing employee, and remove an employee.
**Independent Test**: CRUD operations work end-to-end via the REST API and database.

- [x] T016 [US1] Write test spec for employee list endpoint in `backend/tests/integration/employeeList.test.ts` (RED)
- [x] T017 [US1] Create GET `/api/employees/list` endpoint in `backend/src/routes/employees.ts` (GREEN)
- [x] T018 [US1] Write test spec for create employee endpoint in `backend/tests/integration/createEmployee.test.ts` (RED)
- [x] T019 [US1] Create POST `/api/employees/list/create` endpoint in `backend/src/routes/employees.ts` (GREEN)
- [x] T020 [US1] Write test spec for update employee endpoint in `backend/tests/integration/updateEmployee.test.ts` (RED)
- [x] T021 [US1] Create PUT `/api/employees/{id}/edit` endpoint in `backend/src/routes/employees.ts` (GREEN)
- [x] T022 [US1] Write test spec for delete employee endpoint in `backend/tests/integration/deleteEmployee.test.ts` (RED)
- [x] T023 [US1] Create DELETE `/api/employees/{id}` endpoint in `backend/src/routes/employees.ts` (GREEN)
- [x] T024 [P] [US1] Create React component `EmployeeListPage` in `frontend/src/pages/EmployeeList.tsx` with table layout
- [x] T025 [P] [US1] Create React component `EmployeeForm` in `frontend/src/components/EmployeeForm.tsx` for add/edit
- [x] T026 [P] [US1] Create API client wrapper in `frontend/src/services/api.ts` for employee endpoints
- [x] T027 [US1] Wire EmployeeListPage to API in `frontend/src/pages/EmployeeList.tsx` for list fetching
- [x] T028 [US1] Wire EmployeeForm to API for create operation in `frontend/src/pages/EmployeeList.tsx`
- [x] T029 [US1] Wire EmployeeForm to API for update operation in `frontend/src/pages/EmployeeList.tsx`
- [x] T030 [US1] Wire delete confirmation and API call in `frontend/src/pages/EmployeeList.tsx`
- [x] T031 [US1] Write integration test for EmployeeListPage in `frontend/tests/integration/EmployeeList.test.tsx`
- [ ] T032 [US1] Manual acceptance test: verify CRUD workflow end-to-end via UI

---

## Phase 4: User Story 2 - View Details and Search

**Story**: An administrator can open an employee record to see full details and can filter the employee list by name or department.
**Independent Test**: Detail view and search filtering work via the UI and backend filtering endpoints.

- [ ] T033 [P] [US2] Create employee detail/edit page `EmployeeDetailPage` in `frontend/src/pages/EmployeeDetail.tsx`
- [ ] T034 [P] [US2] Create search/filter input component in `frontend/src/components/EmployeeFilter.tsx`
- [ ] T035 [US2] Write test for filtered list endpoint in `backend/tests/integration/employeeSearch.test.ts` (RED)
- [ ] T036 [US2] Create GET `/api/employees/list?search=X&department=Y` filtering in `backend/src/routes/employees.ts` (GREEN)
- [ ] T037 [US2] Wire detail route and navigation in `frontend/src/App.tsx` for EmployeeDetailPage
- [ ] T038 [US2] Wire search input to API call in `EmployeeListPage`
- [ ] T039 [US2] Wire filter dropdown to API call in `EmployeeListPage`
- [ ] T040 [US2] Write integration test for search and filter in `frontend/tests/integration/EmployeeSearch.test.tsx`
- [ ] T041 [US2] Manual acceptance test: verify detail view and search/filter usability

---

## Phase 5: User Story 3 - Maintain Valid Employee Data

**Story**: The system prevents invalid employee records and provides clear validation feedback for required fields.
**Independent Test**: Validation rejects invalid inputs at both frontend and backend.

- [ ] T042 [P] [US3] Add client-side validation to `EmployeeForm` component using shared Zod schemas
- [ ] T043 [P] [US3] Create error display UI in `EmployeeForm` for field-level validation messages
- [ ] T044 [US3] Write test for backend validation in `backend/tests/integration/employeeValidation.test.ts` (RED)
- [ ] T045 [US3] Add server-side validation middleware in `backend/src/middleware/validateEmployee.ts` (GREEN)
- [ ] T046 [US3] Wire validation errors to API 400 responses in employee endpoints
- [ ] T047 [US3] Wire API validation errors to frontend display in `EmployeeForm`
- [ ] T048 [US3] Add duplicate email check in backend service layer in `backend/src/services/employeeService.ts`
- [ ] T049 [US3] Write test for duplicate email rejection in `backend/tests/integration/duplicateEmail.test.ts`
- [ ] T050 [US3] Write integration test for validation flow in `frontend/tests/integration/EmployeeValidation.test.tsx`
- [ ] T051 [US3] Manual acceptance test: verify validation feedback for all required fields

---

## Phase 6: Polish and Cross-Cutting Concerns

**Purpose**: Add error handling, empty states, loading states, and general UX polish.

- [ ] T052 [P] Create empty state component in `frontend/src/components/EmptyState.tsx`
- [ ] T053 [P] Create loading spinner component in `frontend/src/components/LoadingSpinner.tsx`
- [ ] T054 [P] Create error boundary component in `frontend/src/components/ErrorBoundary.tsx`
- [ ] T055 Add error handling to all API client methods in `frontend/src/services/api.ts`
- [ ] T056 Wire loading states to list and detail pages
- [ ] T057 Wire empty state to EmployeeListPage when no employees exist
- [ ] T058 Add error modal or toast for failed API calls in `frontend/src/services/api.ts`
- [ ] T059 Write test for error handling in `frontend/tests/integration/ErrorHandling.test.tsx`
- [ ] T060 Add CLI command for seeding test data in `shared/src/cli/seed.ts` or `backend/src/cli/seed.ts`
- [ ] T061 Create README for local setup and running the app in `README.md`
- [ ] T062 Manual full system test: verify all happy paths and error scenarios end-to-end

---

## Dependencies and Parallel Execution

### Execution Order

1. **Phase 1**: All setup tasks must complete first (T001–T007).
2. **Phase 2**: Shared packages and DB setup (T008–T015) are foundational; many can run in parallel.
3. **Phases 3–5**: User story tasks can be executed in priority order (T016–T051); tasks within a story marked `[P]` can run in parallel.
4. **Phase 6**: Polish tasks (T052–T062) run after phases 3–5 are complete.

### Parallel Opportunities per Story

**User Story 1 (T016–T032)**:
- T024–T026 (React components and API client setup) can parallelize with T016–T023 (backend CRUD endpoints).
- Within backend, T017, T019, T021, T023 (endpoint implementations) can run after their test specs are approved.

**User Story 2 (T033–T041)**:
- T033–T034 (frontend detail page and filter component) can parallelize with T035–T036 (backend search logic).

**User Story 3 (T042–T051)**:
- T042–T043 (client-side validation) can parallelize with T044–T049 (server-side validation).

### Suggested MVP Scope

**Minimum Viable Product**: Complete Phases 1, 2, and 3 (US1 CRUD). This delivers a working employee list, create, edit, and delete workflow. Phases 4 (search/detail) and 5 (validation polish) add usability and safety.

---

## Acceptance Criteria Summary

Each task is independently testable and verifiable:
- **Backend tasks**: verified by Supertest integration tests (RED/GREEN cycles).
- **Frontend tasks**: verified by React Testing Library component tests.
- **Integration tasks**: verified by end-to-end manual testing of user workflows.

All tasks follow the Constitution's test-first, library-first, and simplicity-first principles.
