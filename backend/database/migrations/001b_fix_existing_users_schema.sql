-- Compatibility migration for the existing CIU dev database.
-- Adds columns required by the August 2026 CIU requirements without dropping
-- any earlier experimental columns such as entraObjectId or active.
IF COL_LENGTH('dbo.users', 'passwordHash') IS NULL
BEGIN
    ALTER TABLE dbo.users
    ADD passwordHash NVARCHAR(256) NULL;
END;

IF COL_LENGTH('dbo.users', 'isActive') IS NULL
BEGIN
    ALTER TABLE dbo.users
    ADD isActive BIT NOT NULL
        CONSTRAINT DF_users_isActive DEFAULT 1;
END;

IF COL_LENGTH('dbo.users', 'lastLoginAt') IS NULL
BEGIN
    ALTER TABLE dbo.users
    ADD lastLoginAt DATETIME2 NULL;
END;

IF COL_LENGTH('dbo.users', 'isOwner') IS NULL
BEGIN
    ALTER TABLE dbo.users
    ADD isOwner BIT NOT NULL
        CONSTRAINT DF_users_isOwner DEFAULT 0;
END;

IF COL_LENGTH('dbo.users', 'canManageAdmins') IS NULL
BEGIN
    ALTER TABLE dbo.users
    ADD canManageAdmins BIT NOT NULL
        CONSTRAINT DF_users_canManageAdmins DEFAULT 0;
END;

IF COL_LENGTH('dbo.users', 'createdBy') IS NULL
BEGIN
    ALTER TABLE dbo.users
    ADD createdBy UNIQUEIDENTIFIER NULL;
END;
GO
