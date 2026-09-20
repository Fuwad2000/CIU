-- Align dbo.users with the three application admin levels:
-- regularadmin, intermediateadmin, and superadmin.
-- Super admins are created or promoted only in SQL, never by the application API.
-- sqlcmd defaults QUOTED_IDENTIFIER OFF; unique indexes on dbo.users require it ON.
SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;

UPDATE dbo.users
SET role = 'superadmin',
    isActive = 1,
    isOwner = 1,
    canManageAdmins = 1,
    updatedAt = SYSUTCDATETIME()
WHERE LOWER(email) = 'fuwad.oladega@ciucanada.ca'
   OR (isOwner = 1 AND role NOT IN ('regularadmin', 'intermediateadmin', 'superadmin'));

UPDATE dbo.users
SET role = 'intermediateadmin',
    isOwner = 0,
    canManageAdmins = 1,
    updatedAt = SYSUTCDATETIME()
WHERE LOWER(email) <> 'fuwad.oladega@ciucanada.ca'
  AND isOwner = 0
  AND canManageAdmins = 1
  AND role NOT IN ('regularadmin', 'intermediateadmin', 'superadmin');

UPDATE dbo.users
SET role = 'regularadmin',
    isOwner = 0,
    canManageAdmins = 0,
    updatedAt = SYSUTCDATETIME()
WHERE LOWER(email) <> 'fuwad.oladega@ciucanada.ca'
  AND isOwner = 0
  AND canManageAdmins = 0
  AND role NOT IN ('regularadmin', 'intermediateadmin', 'superadmin');

DECLARE @roleDefault sysname;
SELECT @roleDefault = dc.name
FROM sys.default_constraints dc
JOIN sys.columns c ON c.default_object_id = dc.object_id
WHERE dc.parent_object_id = OBJECT_ID('dbo.users')
  AND c.name = 'role';

IF @roleDefault IS NOT NULL
BEGIN
    EXEC('ALTER TABLE dbo.users DROP CONSTRAINT [' + @roleDefault + ']');
END;

ALTER TABLE dbo.users
    ADD CONSTRAINT DF_users_role DEFAULT ('regularadmin') FOR role;

IF NOT EXISTS (
    SELECT 1
    FROM sys.check_constraints
    WHERE name = 'CK_users_role'
      AND parent_object_id = OBJECT_ID('dbo.users')
)
BEGIN
    ALTER TABLE dbo.users
        ADD CONSTRAINT CK_users_role
        CHECK (role IN ('regularadmin', 'intermediateadmin', 'superadmin'));
END;
GO



