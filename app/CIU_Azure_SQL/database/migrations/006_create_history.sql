nano 006_create_history.sql
IF OBJECT_ID('dbo.history', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.history
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_history PRIMARY KEY
            DEFAULT NEWID(),
        userId UNIQUEIDENTIFIER NULL,
        adminEmail NVARCHAR(256) NOT NULL,
        action NVARCHAR(32) NOT NULL,
        area NVARCHAR(32) NOT NULL,
        summary NVARCHAR(500) NOT NULL,
        entityId UNIQUEIDENTIFIER NULL,
        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_history_createdAt DEFAULT SYSUTCDATETIME(),

        CONSTRAINT FK_history_userId FOREIGN KEY (userId) REFERENCES dbo.users(id),
        CONSTRAINT CK_history_action CHECK
        (
            action IN ('authenticated','signed-out','created','updated','deleted')
        ),
        CONSTRAINT CK_history_area CHECK
        (
            area IN ('session','users','announcements','events','contacts','registrations')
        )
    );
END;
GO


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -i 006_create_history.sql


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \   
  -G \
  -P /tmp/sqltoken \
  -Q "SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'history';"