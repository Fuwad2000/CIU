# CIU Azure SQL Database Migrations

Source: **CIU Azure Setup Requirements — August 2026**.

## Migration order

1. `001_create_users.sql`
2. `002_create_announcements.sql`
3. `003_create_events.sql`
4. `004_create_contacts.sql`
5. `005_create_registrations.sql`
6. `006_create_history.sql`
7. `007_create_members.sql`
8. `008_create_volunteers.sql`
9. `009_admin_roles.sql`
10. `010_create_newsletter.sql`
11. `011_create_outreach.sql`
12. `012_outreach_contacts_audience.sql` — expands campaign recipients to include contact-form emails if `011` was already applied.
13. `013_outreach_additional.sql` — staff-managed extra Outreach list. Run this on the current database.

`001b_fix_existing_users_schema.sql` is a compatibility migration for the current CIU development database because an earlier experimental `users` table was already created before the latest requirements file was reviewed.

`009_admin_roles.sql` updates the existing owner row for `fuwad.oladega@ciucanada.ca` to `superadmin` and maps leftover `admin`/`staff` roles to `regularadmin` or `intermediateadmin`. It does not delete or recreate that owner account. Super admins are created only in SQL.

## Azure SQL execution example

Create an Entra token file in Azure Cloud Shell:

```bash
az account get-access-token \
  --resource https://database.windows.net \
  --output tsv \
  --query accessToken | \
  tr -d '\n' | \
  iconv -f UTF-8 -t UTF-16LE > /tmp/sqltoken
```

Run a migration:

```bash
sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -i database/migrations/009_admin_roles.sql
```

Create the newsletter table the same way:

```bash
sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -i database/migrations/010_create_newsletter.sql
```

Create Outreach campaign tables the same way:

```bash
sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -i database/migrations/011_create_outreach.sql
```

Allow contact-form emails as an Outreach audience if `011` was already applied without `contacts`:

```bash
sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -i database/migrations/012_outreach_contacts_audience.sql
```

Create the staff-managed additional audience list:

```bash
sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -i database/migrations/013_outreach_additional.sql
```

Copy each unique contact-form sender into Additional people (existing messages stay in `dbo.contacts`):

```bash
sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -i database/migrations/014_outreach_additional_from_contacts.sql
```

`-I` turns `QUOTED_IDENTIFIER ON`. sqlcmd leaves it off by default, which causes `Msg 1934` on `UPDATE` against `dbo.users` because of the unique indexes.

## Next.js backend

The website reads these tables through server-side Next.js API routes. `backend/db/db.ts` connects with a Microsoft Entra access token from `DefaultAzureCredential`. There is no SQL username or password.

Local development:

```bash
az login
npm run dev
```

Azure CLI credentials are used automatically. In production, configure an Entra app identity such as `ciu-nextjs-web` and let `DefaultAzureCredential` pick it up. Set `SQL_SERVER` and `SQL_DATABASE` in the server environment. Access tokens stay on the server and are never sent to the browser.

## Notes

- UUIDs are generated with `NEWID()`.
- UTC timestamps use `SYSUTCDATETIME()`.
- `updatedAt` must be explicitly changed by the API on UPDATE operations.
- JSON-array fields such as `tags`, `emailTopics`, and `roles` are stored as `NVARCHAR(MAX)`.
- The application/API should lowercase staff email addresses before storage.
- The API must hash staff passwords before writing `passwordHash`; raw passwords must never be stored.
