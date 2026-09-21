# Backend

Server-only code. This folder can import Azure SQL (`mssql`). Do not import it from `frontend/` or from any `"use client"` file.

## Add a feature

1. Put table changes in `database/migrations/`.
2. Put queries in `sql/` or `outreach/`.
3. Put the request handler in `http/` (one file per resource).
4. Add a thin `app/api/.../route.ts` that re-exports the handler.
5. Put UI in `frontend/components`.
6. Put mail in `services/email`.
7. Put the test in `tests/`.

## Folder map

- `env.ts` — server environment
- `db/` — SQL pool and query helpers
- `sql/` — table access
- `stores/` — SQL / Azure API / memory backends
- `auth/` — Entra token checks and admin policy
- `outreach/` — campaign audience and storage
- `http/` — API handlers and JSON helpers
- `database/migrations/` — Azure SQL scripts
