-- Staff-managed Outreach list for people who are not on a public form.
-- sqlcmd defaults QUOTED_IDENTIFIER OFF; run with -I.
-- This is one whole script. Run it after 011_create_outreach.sql
-- (and 012_outreach_contacts_audience.sql if that was already applied).
--
-- sqlcmd \
--   -S ciu-sql-dev.database.windows.net \
--   -d ciu-db-dev \
--   -G \
--   -I \
--   -P /tmp/sqltoken \
--   -i 013_outreach_additional.sql

SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

IF OBJECT_ID('dbo.outreach_additional', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.outreach_additional
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_outreach_additional PRIMARY KEY
            DEFAULT NEWID(),

        fullName NVARCHAR(200) NOT NULL,

        email NVARCHAR(256) NOT NULL,

        phone NVARCHAR(40) NULL,

        notes NVARCHAR(500) NULL,

        createdBy UNIQUEIDENTIFIER NULL,

        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_outreach_additional_createdAt DEFAULT SYSUTCDATETIME(),

        CONSTRAINT UQ_outreach_additional_email
            UNIQUE (email),

        CONSTRAINT FK_outreach_additional_createdBy
            FOREIGN KEY (createdBy) REFERENCES dbo.users(id)
            ON DELETE SET NULL
    );
END;
GO

IF EXISTS (
    SELECT 1
    FROM sys.check_constraints
    WHERE name = 'CK_outreach_recipients_audience'
      AND parent_object_id = OBJECT_ID('dbo.outreach_campaign_recipients')
)
BEGIN
    ALTER TABLE dbo.outreach_campaign_recipients
        DROP CONSTRAINT CK_outreach_recipients_audience;
END
GO

ALTER TABLE dbo.outreach_campaign_recipients
    ADD CONSTRAINT CK_outreach_recipients_audience
    CHECK (audience IN ('newsletter', 'members', 'volunteers', 'contacts', 'additional', 'quran', 'kids', 'admins'));
GO
