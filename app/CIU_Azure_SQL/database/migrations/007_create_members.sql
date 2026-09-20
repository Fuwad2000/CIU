nano 007_create_members.sql
IF OBJECT_ID('dbo.members', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.members
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_members PRIMARY KEY
            DEFAULT NEWID(),
        fullName NVARCHAR(200) NOT NULL,
        email NVARCHAR(256) NOT NULL,
        phone NVARCHAR(40) NULL,
        city NVARCHAR(100) NULL,
        membershipType NVARCHAR(20) NOT NULL,
        emailTopics NVARCHAR(MAX) NULL,
        notes NVARCHAR(MAX) NULL,
        agreedToEmails BIT NOT NULL,
        unsubscribedAt DATETIME2 NULL,
        source NVARCHAR(40) NOT NULL,
        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_members_createdAt DEFAULT SYSUTCDATETIME(),

        CONSTRAINT UQ_members_email UNIQUE (email),
        CONSTRAINT CK_members_membershipType CHECK (membershipType IN ('individual','family')),
        CONSTRAINT CK_members_agreedToEmails CHECK (agreedToEmails = 1),
        CONSTRAINT CK_members_source CHECK (source IN ('membership','events-newsletter'))
    );
END;
GO


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -i 007_create_members.sql


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -Q "SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'members';"