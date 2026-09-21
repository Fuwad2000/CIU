-- Create dbo.newsletter for CIU event and community email sign-ups.
-- sqlcmd defaults QUOTED_IDENTIFIER OFF; unique indexes require it ON.
-- Run in Azure Cloud Shell after creating /tmp/sqltoken:
--
-- sqlcmd \
--   -S ciu-sql-dev.database.windows.net \
--   -d ciu-db-dev \
--   -G \
--   -I \
--   -P /tmp/sqltoken \
--   -i 010_create_newsletter.sql
--
-- Confirm:
-- sqlcmd \
--   -S ciu-sql-dev.database.windows.net \
--   -d ciu-db-dev \
--   -G \
--   -I \
--   -P /tmp/sqltoken \
--   -Q "SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'newsletter';"

SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

IF OBJECT_ID('dbo.newsletter', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.newsletter
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_newsletter PRIMARY KEY
            DEFAULT NEWID(),

        fullName NVARCHAR(200) NOT NULL,

        email NVARCHAR(256) NOT NULL,

        source NVARCHAR(40) NOT NULL
            CONSTRAINT DF_newsletter_source DEFAULT ('events'),

        agreedToEmails BIT NOT NULL
            CONSTRAINT DF_newsletter_agreedToEmails DEFAULT (1),

        unsubscribedAt DATETIME2 NULL,

        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_newsletter_createdAt DEFAULT SYSUTCDATETIME(),

        CONSTRAINT UQ_newsletter_email
            UNIQUE (email),

        CONSTRAINT CK_newsletter_agreedToEmails
            CHECK (agreedToEmails = 1),

        CONSTRAINT CK_newsletter_source
            CHECK (source IN ('events', 'website'))
    );
END;
GO

IF OBJECT_ID('dbo.members', 'U') IS NOT NULL
    AND OBJECT_ID('dbo.newsletter', 'U') IS NOT NULL
BEGIN
    INSERT INTO dbo.newsletter (fullName, email, source, agreedToEmails, createdAt)
    SELECT
        m.fullName,
        m.email,
        'events',
        m.agreedToEmails,
        m.createdAt
    FROM dbo.members AS m
    WHERE m.source = 'events-newsletter'
      AND NOT EXISTS (
          SELECT 1
          FROM dbo.newsletter AS n
          WHERE n.email = m.email
      );
END;
GO
