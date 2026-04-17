# Spec Kit Demo

A toy employee editor app built with a local `spec-kit` test harness and spec-driven development.

## What is included

- `spec-kit/` - a tiny spec runner with `describe`, `it`, and `expect`
- `spec/employees.spec.js` - spec-driven tests for employee state
- `src/` - simple UI for viewing and editing employees
- `spec-runner.js` - runs the spec suite in Node

## Run locally

1. Install dependencies

```bash
npm install
```

2. Run the spec suite

```bash
npm test
```

3. Start the UI

```bash
npm start
```

Then open the served page in your browser.
