nano 004_create_contacts.sql
IF OBJECT_ID('dbo.contacts', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.contacts
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_contacts PRIMARY KEY
            DEFAULT NEWID(),
        firstName NVARCHAR(100) NOT NULL,
        surname NVARCHAR(100) NOT NULL,
        name NVARCHAR(200) NOT NULL,
        email NVARCHAR(256) NOT NULL,
        phone NVARCHAR(40) NOT NULL,
        subject NVARCHAR(200) NOT NULL,
        message NVARCHAR(MAX) NOT NULL,
        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_contacts_createdAt DEFAULT SYSUTCDATETIME()
    );
END;
GO


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -i 004_create_contacts.sql


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -Q "SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'contacts';"


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -i 004_create_contacts.sql


sqlcmd \
  -S ciu-sql-dev.database.windows.net \
  -d ciu-db-dev \
  -G \
  -P /tmp/sqltoken \
  -Q "SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'contacts';"