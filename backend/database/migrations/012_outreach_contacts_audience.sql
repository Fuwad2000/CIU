-- Allow Outreach campaigns to target people who used the website contact form.
-- sqlcmd defaults QUOTED_IDENTIFIER OFF; run with -I.
-- This is one whole script. Run it after 011_create_outreach.sql.
--
-- sqlcmd \
--   -S ciu-sql-dev.database.windows.net \
--   -d ciu-db-dev \
--   -G \
--   -I \
--   -P /tmp/sqltoken \
--   -i 012_outreach_contacts_audience.sql

SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

IF EXISTS (
    SELECT 1
    FROM sys.check_constraints
    WHERE name = 'CK_outreach_recipients_audience'
      AND parent_object_id = OBJECT_ID('dbo.outreach_campaign_recipients')
)
BEGIN
    ALTER TABLE dbo.outreach_campaign_recipients
        DROP CONSTRAINT CK_outreach_recipients_audience;
END
GO

ALTER TABLE dbo.outreach_campaign_recipients
    ADD CONSTRAINT CK_outreach_recipients_audience
    CHECK (audience IN ('newsletter', 'members', 'volunteers', 'contacts', 'additional', 'quran', 'kids', 'admins'));
GO
