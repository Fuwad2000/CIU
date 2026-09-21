-- Copy each unique contact-form sender into the contact list once.
-- Repeat messages stay in dbo.contacts. Run after 013_outreach_additional.sql.
-- If outreach_additional already exists without phone, run 016 first.
-- sqlcmd defaults QUOTED_IDENTIFIER OFF; run with -I.

INSERT INTO dbo.outreach_additional (fullName, email, phone, notes)
SELECT c.fullName, c.email, c.phone, N'Reached out via the contact form'
FROM (
    SELECT
        COALESCE(NULLIF(LTRIM(RTRIM(name)), ''), LTRIM(RTRIM(CONCAT(firstName, N' ', surname)))) AS fullName,
        LOWER(LTRIM(RTRIM(email))) AS email,
        NULLIF(LTRIM(RTRIM(phone)), N'') AS phone,
        ROW_NUMBER() OVER (
            PARTITION BY LOWER(LTRIM(RTRIM(email)))
            ORDER BY createdAt ASC
        ) AS rn
    FROM dbo.contacts
    WHERE email IS NOT NULL
      AND LTRIM(RTRIM(email)) <> N''
) c
WHERE c.rn = 1
  AND c.fullName <> N''
  AND NOT EXISTS (
      SELECT 1
      FROM dbo.outreach_additional a
      WHERE a.email = c.email
  );
GO


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -i 014_outreach_additional_from_contacts.sql


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -Q "INSERT INTO dbo.outreach_additional (fullName, email, phone, notes) SELECT c.fullName, c.email, c.phone, N'Reached out via the contact form' FROM (SELECT COALESCE(NULLIF(LTRIM(RTRIM(name)), ''), LTRIM(RTRIM(CONCAT(firstName, N' ', surname)))) AS fullName, LOWER(LTRIM(RTRIM(email))) AS email, NULLIF(LTRIM(RTRIM(phone)), N'') AS phone, ROW_NUMBER() OVER (PARTITION BY LOWER(LTRIM(RTRIM(email))) ORDER BY createdAt ASC) AS rn FROM dbo.contacts WHERE email IS NOT NULL AND LTRIM(RTRIM(email)) <> N'') c WHERE c.rn = 1 AND c.fullName <> N'' AND NOT EXISTS (SELECT 1 FROM dbo.outreach_additional a WHERE a.email = c.email);"


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -Q "SELECT COUNT(*) AS additionalFromContacts FROM dbo.outreach_additional WHERE notes = N'Reached out via the contact form';"
