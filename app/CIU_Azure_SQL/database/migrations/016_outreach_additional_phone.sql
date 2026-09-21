-- Add phone to the contact list and copy it from Inbox messages.
-- sqlcmd defaults QUOTED_IDENTIFIER OFF; run with -I.
--
-- sqlcmd \
--   -S ciu-sql-dev.database.windows.net \
--   -d ciu-db-dev \
--   -G \
--   -I \
--   -P /tmp/sqltoken \
--   -Q "IF COL_LENGTH('dbo.outreach_additional', 'phone') IS NULL ALTER TABLE dbo.outreach_additional ADD phone NVARCHAR(40) NULL; UPDATE a SET a.phone = LEFT(LTRIM(RTRIM(c.phone)), 40) FROM dbo.outreach_additional a INNER JOIN (SELECT LOWER(LTRIM(RTRIM(email))) AS email, phone, ROW_NUMBER() OVER (PARTITION BY LOWER(LTRIM(RTRIM(email))) ORDER BY createdAt ASC) AS rn FROM dbo.contacts WHERE email IS NOT NULL AND LTRIM(RTRIM(email)) <> N'' AND phone IS NOT NULL AND LTRIM(RTRIM(phone)) <> N'') c ON c.email = a.email AND c.rn = 1 WHERE a.phone IS NULL OR LTRIM(RTRIM(a.phone)) = N'';"

SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

IF COL_LENGTH('dbo.outreach_additional', 'phone') IS NULL
BEGIN
    ALTER TABLE dbo.outreach_additional ADD phone NVARCHAR(40) NULL;
END
GO

UPDATE a
SET a.phone = LEFT(LTRIM(RTRIM(c.phone)), 40)
FROM dbo.outreach_additional a
INNER JOIN (
    SELECT
        LOWER(LTRIM(RTRIM(email))) AS email,
        phone,
        ROW_NUMBER() OVER (
            PARTITION BY LOWER(LTRIM(RTRIM(email)))
            ORDER BY createdAt ASC
        ) AS rn
    FROM dbo.contacts
    WHERE email IS NOT NULL
      AND LTRIM(RTRIM(email)) <> N''
      AND phone IS NOT NULL
      AND LTRIM(RTRIM(phone)) <> N''
) c ON c.email = a.email AND c.rn = 1
WHERE a.phone IS NULL
   OR LTRIM(RTRIM(a.phone)) = N'';
GO


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -Q "IF COL_LENGTH('dbo.outreach_additional', 'phone') IS NULL ALTER TABLE dbo.outreach_additional ADD phone NVARCHAR(40) NULL; UPDATE a SET a.phone = LEFT(LTRIM(RTRIM(c.phone)), 40) FROM dbo.outreach_additional a INNER JOIN (SELECT LOWER(LTRIM(RTRIM(email))) AS email, phone, ROW_NUMBER() OVER (PARTITION BY LOWER(LTRIM(RTRIM(email))) ORDER BY createdAt ASC) AS rn FROM dbo.contacts WHERE email IS NOT NULL AND LTRIM(RTRIM(email)) <> N'' AND phone IS NOT NULL AND LTRIM(RTRIM(phone)) <> N'') c ON c.email = a.email AND c.rn = 1 WHERE a.phone IS NULL OR LTRIM(RTRIM(a.phone)) = N'';"
