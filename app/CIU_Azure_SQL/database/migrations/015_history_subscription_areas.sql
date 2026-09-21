-- Allow staff history to record membership, volunteer, and newsletter removals.
-- sqlcmd defaults QUOTED_IDENTIFIER OFF; run with -I.
--
-- sqlcmd \
--   -S ciu-sql-dev.database.windows.net \
--   -d ciu-db-dev \
--   -G \
--   -I \
--   -P /tmp/sqltoken \
--   -Q "IF EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_history_area' AND parent_object_id = OBJECT_ID('dbo.history')) ALTER TABLE dbo.history DROP CONSTRAINT CK_history_area; ALTER TABLE dbo.history ADD CONSTRAINT CK_history_area CHECK (area IN ('session', 'users', 'announcements', 'events', 'contacts', 'registrations', 'outreach', 'members', 'volunteers', 'newsletter'));"

SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

IF EXISTS (
    SELECT 1
    FROM sys.check_constraints
    WHERE name = 'CK_history_area'
      AND parent_object_id = OBJECT_ID('dbo.history')
)
BEGIN
    ALTER TABLE dbo.history DROP CONSTRAINT CK_history_area;
END
GO

ALTER TABLE dbo.history
    ADD CONSTRAINT CK_history_area CHECK
    (
        area IN (
            'session',
            'users',
            'announcements',
            'events',
            'contacts',
            'registrations',
            'outreach',
            'members',
            'volunteers',
            'newsletter'
        )
    );
GO


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -Q "IF EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_history_area' AND parent_object_id = OBJECT_ID('dbo.history')) ALTER TABLE dbo.history DROP CONSTRAINT CK_history_area; ALTER TABLE dbo.history ADD CONSTRAINT CK_history_area CHECK (area IN ('session', 'users', 'announcements', 'events', 'contacts', 'registrations', 'outreach', 'members', 'volunteers', 'newsletter'));"
