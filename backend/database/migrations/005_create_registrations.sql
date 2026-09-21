nano 005_create_registrations.sql
IF OBJECT_ID('dbo.registrations', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.registrations
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_registrations PRIMARY KEY
            DEFAULT NEWID(),
        program NVARCHAR(16) NOT NULL,
        studentName NVARCHAR(200) NOT NULL,
        studentAge NVARCHAR(20) NULL,
        grade NVARCHAR(8) NULL,
        parentName NVARCHAR(200) NULL,
        email NVARCHAR(256) NOT NULL,
        phone NVARCHAR(40) NOT NULL,
        notes NVARCHAR(MAX) NULL,
        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_registrations_createdAt DEFAULT SYSUTCDATETIME(),

        CONSTRAINT CK_registrations_program CHECK (program IN ('quran','kids')),
        CONSTRAINT CK_registrations_kids_fields CHECK
        (
            (program = 'quran')
            OR
            (program = 'kids' AND studentAge IS NOT NULL AND grade IS NOT NULL AND parentName IS NOT NULL)
        )
    );
END;
GO


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -i 005_create_registrations.sql


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -Q "SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'registrations';"