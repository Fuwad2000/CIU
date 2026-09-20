nano 002_create_announcements.sql
IF OBJECT_ID('dbo.announcements', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.announcements
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_announcements PRIMARY KEY
            DEFAULT NEWID(),
        message NVARCHAR(500) NOT NULL,
        href NVARCHAR(500) NULL,
        active BIT NOT NULL
            CONSTRAINT DF_announcements_active DEFAULT 1,
        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_announcements_createdAt DEFAULT SYSUTCDATETIME(),
        updatedAt DATETIME2 NOT NULL
            CONSTRAINT DF_announcements_updatedAt DEFAULT SYSUTCDATETIME()
    );
END;
GO


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -i 002_create_announcements.sql


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \