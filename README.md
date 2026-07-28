# Conduit Cypress Automation Suite

A TypeScript + Cypress end-to-end test automation framework built against the
[Conduit](https://demo.realworld.show) demo application. This is a
portfolio project demonstrating Page Object Model design, API-driven tests,
and CI integration.

![Cypress Tests](https://github.com/TestCode12/cypress-conduit-automation-poc/actions/workflows/cypress-pipeline.yml/badge.svg)

## Tech Stack
- Cypress (POM, API actions, Custom commands,Reports)
- TypeScript
- cypress-mochawesome-reporter
- GitHub Actions (CI)

## Project Structure
cypress/
e2e/ → test specs
page-objects/ → Page Object Model classes
support/ → custom commands, constants, type declarations
fixtures/ → test data
docs/
test-plan.md → coverage and notes
.github/workflows/ → CI pipeline

## How to Run Locally
```bash
npm install
npm run cy:open     # opens interactive runner
npm run cy:run       # headless run
```

## Test Coverage
See [docs/test-plan.md] for full coverage details, including
an edge case discovered during testing (signup does not enforce email
uniqueness).

## CI
Tests run automatically on push via GitHub Actions. See workflow badge above.