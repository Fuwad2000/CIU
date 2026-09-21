nano 008_create_volunteers.sql
IF OBJECT_ID('dbo.volunteers', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.volunteers
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_volunteers PRIMARY KEY
            DEFAULT NEWID(),
        fullName NVARCHAR(200) NOT NULL,
        email NVARCHAR(256) NOT NULL,
        phone NVARCHAR(40) NOT NULL,
        ageGroup NVARCHAR(20) NOT NULL,
        roles NVARCHAR(MAX) NOT NULL,
        availability NVARCHAR(20) NOT NULL,
        volunteerHours NVARCHAR(8) NULL,
        message NVARCHAR(MAX) NULL,
        agreement BIT NOT NULL,
        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_volunteers_createdAt DEFAULT SYSUTCDATETIME(),

        CONSTRAINT CK_volunteers_ageGroup CHECK (ageGroup IN ('high-school','adult','senior')),
        CONSTRAINT CK_volunteers_availability CHECK (availability IN ('weekdays','weekends','evenings','flexible')),
        CONSTRAINT CK_volunteers_volunteerHours CHECK (volunteerHours IS NULL OR volunteerHours IN ('yes','no')),
        CONSTRAINT CK_volunteers_agreement CHECK (agreement = 1)
    );
END;
GO

nano 008_create_volunteers.sql

sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -i 008_create_volunteers.sql


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -Q "SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'volunteers';"



  