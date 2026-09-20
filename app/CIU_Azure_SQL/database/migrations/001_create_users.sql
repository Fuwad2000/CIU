IF OBJECT_ID('dbo.users', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.users
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_users PRIMARY KEY
            DEFAULT NEWID(),

        entraObjectId NVARCHAR(64) NULL,

        email NVARCHAR(256) NOT NULL,

        displayName NVARCHAR(200) NOT NULL,

        role NVARCHAR(32) NOT NULL
            DEFAULT ('regularadmin'),

        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_users_createdAt DEFAULT SYSUTCDATETIME(),

        updatedAt DATETIME2 NOT NULL
            CONSTRAINT DF_users_updatedAt DEFAULT SYSUTCDATETIME(),

        isActive BIT NOT NULL
            CONSTRAINT DF_users_isActive DEFAULT 1,

        lastLoginAt DATETIME2 NULL,

        isOwner BIT NOT NULL
            DEFAULT 0,

        canManageAdmins BIT NOT NULL
            DEFAULT 0,

        createdBy UNIQUEIDENTIFIER NULL,

        CONSTRAINT UQ_users_email
            UNIQUE (email),

        CONSTRAINT UQ_users_entraObjectId
            UNIQUE (entraObjectId),

        CONSTRAINT CK_users_role
            CHECK (role IN ('regularadmin', 'intermediateadmin', 'superadmin')),

        CONSTRAINT FK_users_createdBy
            FOREIGN KEY (createdBy)
            REFERENCES dbo.users(id)
    );
END;
GO