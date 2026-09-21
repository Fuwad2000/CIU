-- One active staff-portal session per person. Sign-in deletes any previous row.
-- sqlcmd defaults QUOTED_IDENTIFIER OFF; run with -I.
--
-- sqlcmd \
--   -S ciu-sql-dev.database.windows.net \
--   -d ciu-db-dev \
--   -G \
--   -I \
--   -P /tmp/sqltoken \
--   -i 017_create_staff_sessions.sql

SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

IF OBJECT_ID('dbo.staff_sessions', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.staff_sessions
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_staff_sessions PRIMARY KEY
            DEFAULT NEWID(),

        userId UNIQUEIDENTIFIER NOT NULL,

        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_staff_sessions_createdAt DEFAULT SYSUTCDATETIME(),

        lastSeenAt DATETIME2 NOT NULL
            CONSTRAINT DF_staff_sessions_lastSeenAt DEFAULT SYSUTCDATETIME(),

        expiresAt DATETIME2 NOT NULL,

        CONSTRAINT FK_staff_sessions_user
            FOREIGN KEY (userId) REFERENCES dbo.users(id)
            ON DELETE CASCADE
    );

    CREATE INDEX IX_staff_sessions_userId
        ON dbo.staff_sessions (userId);
END
GO


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -I \
  -P /tmp/sqltoken \
  -Q "IF OBJECT_ID('dbo.staff_sessions', 'U') IS NULL BEGIN CREATE TABLE dbo.staff_sessions (id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_staff_sessions PRIMARY KEY DEFAULT NEWID(), userId UNIQUEIDENTIFIER NOT NULL, createdAt DATETIME2 NOT NULL CONSTRAINT DF_staff_sessions_createdAt DEFAULT SYSUTCDATETIME(), lastSeenAt DATETIME2 NOT NULL CONSTRAINT DF_staff_sessions_lastSeenAt DEFAULT SYSUTCDATETIME(), expiresAt DATETIME2 NOT NULL, CONSTRAINT FK_staff_sessions_user FOREIGN KEY (userId) REFERENCES dbo.users(id) ON DELETE CASCADE); CREATE INDEX IX_staff_sessions_userId ON dbo.staff_sessions (userId); END"
