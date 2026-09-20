nano 003_create_events.sql
IF OBJECT_ID('dbo.events', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.events
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_events PRIMARY KEY
            DEFAULT NEWID(),
        title NVARCHAR(200) NOT NULL,
        category NVARCHAR(32) NOT NULL,
        dateLabel NVARCHAR(120) NULL,
        [date] DATE NULL,
        [time] NVARCHAR(80) NOT NULL,
        location NVARCHAR(200) NOT NULL,
        description NVARCHAR(MAX) NOT NULL,
        tags NVARCHAR(MAX) NULL,
        href NVARCHAR(500) NOT NULL,
        buttonLabel NVARCHAR(80) NOT NULL
            CONSTRAINT DF_events_buttonLabel DEFAULT 'View Details',
        image NVARCHAR(1000) NULL,
        recurring BIT NOT NULL
            CONSTRAINT DF_events_recurring DEFAULT 0,
        featured BIT NOT NULL
            CONSTRAINT DF_events_featured DEFAULT 0,
        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_events_createdAt DEFAULT SYSUTCDATETIME(),
        updatedAt DATETIME2 NOT NULL
            CONSTRAINT DF_events_updatedAt DEFAULT SYSUTCDATETIME(),

        CONSTRAINT CK_events_category CHECK
        (
            category IN ('education','youth','family','community','spiritual','volunteer')
        )
    );
END;
GO

sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -i 003_create_events.sql


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \