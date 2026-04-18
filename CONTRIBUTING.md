# Contributing to Spec Kit Demo

Thank you for contributing to this project. This repository follows a spec-driven workflow, and contributions should be clear, testable, and aligned with the existing architecture.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env
```

3. Run the backend and frontend in separate terminals:

```bash
npm run dev --workspace backend
npm run dev --workspace frontend
```

## Branches

- Create feature branches from `main`.
- Use descriptive branch names, such as `001-employee-management` or `feature/<short-description>`.
- Keep branches focused on a single feature, bug fix, or documentation update.

## Workflow

This repository uses the Spec Kit workflow:

1. Update or create spec artifacts in `specs/<feature>/spec.md`.
2. Generate or update the implementation plan with `/speckit.plan` if applicable.
3. Create or update task tracking in `specs/<feature>/tasks.md`.
4. Implement code changes in the appropriate workspace (`backend/`, `frontend/`, `shared/`).
5. Add or update tests before finalizing implementation.
6. Open a pull request with a clear description and linked issue or feature spec.

## Testing

### Run all tests

```bash
npm run test --workspaces
```

### Frontend tests

```bash
npm run test --workspace frontend -- --runInBand
```

### Backend tests

```bash
npm run test --workspace backend -- --runInBand
```

## Pull Request Checklist

- [ ] Code implements the intended feature or fix.
- [ ] Tests were added or updated and pass locally.
- [ ] Documentation or specs were updated if needed.
- [ ] The change is described clearly in the PR title and description.
- [ ] No TODOs or placeholder text remain in production code.

## Reporting Issues

If you find a bug or unclear behavior, open a GitHub issue with:

- A concise summary of the problem
- Steps to reproduce
- Expected and actual behavior
- Any relevant logs or screenshots

## Questions

If you are unsure about the best way to contribute, please ask before making major architecture changes. When in doubt, keep changes small and focused.
