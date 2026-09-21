-- Allow more than one staff row without an Entra object id.
-- SQL Server unique constraints treat NULL as a value, so the second
-- invited admin failed with UQ_users_entraObjectId duplicate (<NULL>).
-- sqlcmd defaults QUOTED_IDENTIFIER OFF; run with -I.
--
-- sqlcmd \
--   -S ciu-sql-dev.database.windows.net \
--   -d ciu-db-dev \
--   -G \
--   -I \
--   -P /tmp/sqltoken \
--   -Q "IF EXISTS (SELECT 1 FROM sys.key_constraints WHERE name = 'UQ_users_entraObjectId' AND parent_object_id = OBJECT_ID('dbo.users')) ALTER TABLE dbo.users DROP CONSTRAINT UQ_users_entraObjectId; IF EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'UQ_users_entraObjectId' AND object_id = OBJECT_ID('dbo.users')) DROP INDEX UQ_users_entraObjectId ON dbo.users; CREATE UNIQUE INDEX UQ_users_entraObjectId ON dbo.users (entraObjectId) WHERE entraObjectId IS NOT NULL;"

SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

IF EXISTS (
    SELECT 1
    FROM sys.key_constraints
    WHERE name = 'UQ_users_entraObjectId'
      AND parent_object_id = OBJECT_ID('dbo.users')
)
BEGIN
    ALTER TABLE dbo.users DROP CONSTRAINT UQ_users_entraObjectId;
END
GO

IF EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'UQ_users_entraObjectId'
      AND object_id = OBJECT_ID('dbo.users')
)
BEGIN
    DROP INDEX UQ_users_entraObjectId ON dbo.users;
END
GO

CREATE UNIQUE INDEX UQ_users_entraObjectId
    ON dbo.users (entraObjectId)
    WHERE entraObjectId IS NOT NULL;
GO


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -Q "IF EXISTS (SELECT 1 FROM sys.key_constraints WHERE name = 'UQ_users_entraObjectId' AND parent_object_id = OBJECT_ID('dbo.users')) ALTER TABLE dbo.users DROP CONSTRAINT UQ_users_entraObjectId; IF EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'UQ_users_entraObjectId' AND object_id = OBJECT_ID('dbo.users')) DROP INDEX UQ_users_entraObjectId ON dbo.users; CREATE UNIQUE INDEX UQ_users_entraObjectId ON dbo.users (entraObjectId) WHERE entraObjectId IS NOT NULL;"
