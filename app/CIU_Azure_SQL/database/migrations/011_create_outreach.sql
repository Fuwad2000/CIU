-- Create Outreach campaign tables for CIU communications.
-- sqlcmd defaults QUOTED_IDENTIFIER OFF; unique indexes require it ON.
-- Run in Azure Cloud Shell after creating /tmp/sqltoken:
--
-- sqlcmd \
--   -S ciu-sql-dev.database.windows.net \
--   -d ciu-db-dev \
--   -G \
--   -I \
--   -P /tmp/sqltoken \
--   -i 011_create_outreach.sql

SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

IF OBJECT_ID('dbo.outreach_campaigns', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.outreach_campaigns
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_outreach_campaigns PRIMARY KEY
            DEFAULT NEWID(),

        type NVARCHAR(32) NOT NULL,

        subject NVARCHAR(200) NOT NULL,

        content NVARCHAR(MAX) NOT NULL
            CONSTRAINT DF_outreach_campaigns_content DEFAULT (''),

        status NVARCHAR(20) NOT NULL
            CONSTRAINT DF_outreach_campaigns_status DEFAULT ('draft'),

        audiences NVARCHAR(MAX) NOT NULL
            CONSTRAINT DF_outreach_campaigns_audiences DEFAULT ('[]'),

        eventId UNIQUEIDENTIFIER NULL,

        createdBy UNIQUEIDENTIFIER NOT NULL,

        sentBy UNIQUEIDENTIFIER NULL,

        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_outreach_campaigns_createdAt DEFAULT SYSUTCDATETIME(),

        updatedAt DATETIME2 NOT NULL
            CONSTRAINT DF_outreach_campaigns_updatedAt DEFAULT SYSUTCDATETIME(),

        sentAt DATETIME2 NULL,

        CONSTRAINT CK_outreach_campaigns_type
            CHECK (type IN ('newsletter', 'announcement', 'event', 'volunteer', 'marketing', 'general')),

        CONSTRAINT CK_outreach_campaigns_status
            CHECK (status IN ('draft', 'sending', 'sent', 'failed')),

        CONSTRAINT FK_outreach_campaigns_eventId
            FOREIGN KEY (eventId) REFERENCES dbo.events(id),

        CONSTRAINT FK_outreach_campaigns_createdBy
            FOREIGN KEY (createdBy) REFERENCES dbo.users(id),

        CONSTRAINT FK_outreach_campaigns_sentBy
            FOREIGN KEY (sentBy) REFERENCES dbo.users(id)
    );
END;
GO

IF OBJECT_ID('dbo.outreach_campaign_recipients', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.outreach_campaign_recipients
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_outreach_campaign_recipients PRIMARY KEY
            DEFAULT NEWID(),

        campaignId UNIQUEIDENTIFIER NOT NULL,

        email NVARCHAR(256) NOT NULL,

        displayName NVARCHAR(200) NULL,

        audience NVARCHAR(32) NOT NULL,

        deliveryStatus NVARCHAR(20) NOT NULL
            CONSTRAINT DF_outreach_recipients_status DEFAULT ('pending'),

        sentAt DATETIME2 NULL,

        errorMessage NVARCHAR(500) NULL,

        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_outreach_recipients_createdAt DEFAULT SYSUTCDATETIME(),

        CONSTRAINT FK_outreach_recipients_campaignId
            FOREIGN KEY (campaignId) REFERENCES dbo.outreach_campaigns(id),

        CONSTRAINT UQ_outreach_recipients_campaign_email
            UNIQUE (campaignId, email),

        CONSTRAINT CK_outreach_recipients_audience
            CHECK (audience IN ('newsletter', 'members', 'volunteers', 'quran', 'kids', 'admins')),

        CONSTRAINT CK_outreach_recipients_status
            CHECK (deliveryStatus IN ('pending', 'sent', 'failed', 'skipped'))
    );
END;
GO

IF OBJECT_ID('dbo.outreach_templates', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.outreach_templates
    (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_outreach_templates PRIMARY KEY
            DEFAULT NEWID(),

        type NVARCHAR(32) NOT NULL,

        name NVARCHAR(120) NOT NULL,

        subject NVARCHAR(200) NOT NULL,

        content NVARCHAR(MAX) NOT NULL,

        createdAt DATETIME2 NOT NULL
            CONSTRAINT DF_outreach_templates_createdAt DEFAULT SYSUTCDATETIME(),

        CONSTRAINT CK_outreach_templates_type
            CHECK (type IN ('newsletter', 'announcement', 'event', 'volunteer', 'marketing', 'general'))
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.outreach_templates)
BEGIN
    INSERT INTO dbo.outreach_templates (type, name, subject, content)
    VALUES
    (
        'newsletter',
        'Community newsletter',
        'CIU community update',
        'Assalamu alaikum,' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'Here are this month''s programs, events, and announcements from the Canadian Islamic Union.' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'We look forward to seeing you at the centre.' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'Canadian Islamic Union'
    ),
    (
        'event',
        'Upcoming event',
        'You are invited to a CIU event',
        'Assalamu alaikum,' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'We would like to invite you to an upcoming CIU program. Details are below.' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'We hope you can join us.' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'Canadian Islamic Union'
    ),
    (
        'volunteer',
        'Volunteer call',
        'Volunteer help needed at CIU',
        'Assalamu alaikum,' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'We are looking for volunteers to help at the centre. Please reply if you are available.' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'JazakAllahu khairan,' + CHAR(13) + CHAR(10) +
        'Canadian Islamic Union'
    ),
    (
        'announcement',
        'Centre announcement',
        'An important update from CIU',
        'Assalamu alaikum,' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'Please see this update from the Canadian Islamic Union.' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'Canadian Islamic Union'
    ),
    (
        'marketing',
        'Class offer',
        'A special offer for CIU Quran class and kids program families',
        'Assalamu alaikum,' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'Thank you for registering for a CIU class. We have an update and a special offer for Quran class and kids program families.' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'Details are below.' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) +
        'Canadian Islamic Union'
    );
END;
GO

IF EXISTS (
    SELECT 1
    FROM sys.check_constraints
    WHERE name = 'CK_history_area'
      AND parent_object_id = OBJECT_ID('dbo.history')
)
BEGIN
    ALTER TABLE dbo.history DROP CONSTRAINT CK_history_area;
END;
GO

IF OBJECT_ID('dbo.history', 'U') IS NOT NULL
    AND NOT EXISTS (
        SELECT 1
        FROM sys.check_constraints
        WHERE name = 'CK_history_area'
          AND parent_object_id = OBJECT_ID('dbo.history')
    )
BEGIN
    ALTER TABLE dbo.history
        ADD CONSTRAINT CK_history_area CHECK
        (
            area IN ('session', 'users', 'announcements', 'events', 'contacts', 'registrations', 'outreach')
        );
END;
GO
