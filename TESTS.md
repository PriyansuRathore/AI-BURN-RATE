# TESTS

Automated tests currently focus on the audit engine, because that is the most business-critical logic in the app.

## Tests Written

- `src/lib/audit/engine.test.ts`
  Covers team-plan downgrade recommendations, enterprise downgrade logic, alternative-tool switching logic, credit-based savings recommendations, and already-efficient stack handling.

## How To Run

```bash
npm run test
```

## Current Coverage Notes

- The minimum required count is met with 5 passing audit-engine tests.
- UI behavior, backend routes, and Supabase integration do not yet have automated tests.
- Additional tests should be added for backend lead capture, report retrieval, and summary fallback handling.
