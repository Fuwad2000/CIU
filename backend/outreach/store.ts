import sql from "mssql";
import {
  emptyDeliveryCounts,
  isOutreachAudienceId,
  isOutreachStatus,
  isOutreachType,
  type OutreachAudienceId,
  type OutreachCampaign,
  type OutreachDeliveryCounts,
  type OutreachRecipient,
  type OutreachResolvedRecipient,
  type OutreachStatus,
  type OutreachType,
} from "@shared/outreach";
import { query } from "@backend/db/sql-query";

type Row = Record<string, unknown>;

function iso(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value) return new Date(value).toISOString();
  return "";
}

function asString(value: unknown) {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

function optionalString(value: unknown) {
  const text = asString(value).trim();
  return text || undefined;
}

function asNumber(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function isUuid(value: string | undefined) {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
      )
  );
}

function parseAudiences(value: unknown): OutreachAudienceId[] {
  const text = asString(value).trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is OutreachAudienceId => typeof item === "string" && isOutreachAudienceId(item));
  } catch {
    return [];
  }
}

function deliveryFromRow(row: Row): OutreachDeliveryCounts {
  return {
    total: asNumber(row.recipientCount),
    pending: asNumber(row.pendingCount),
    sent: asNumber(row.sentCount),
    failed: asNumber(row.failedCount),
    skipped: asNumber(row.skippedCount),
  };
}

const campaignSelect = `
  SELECT c.id, c.type, c.subject, c.content, c.status, c.audiences, c.eventId,
         c.createdBy, c.sentBy, c.createdAt, c.updatedAt, c.sentAt,
         creator.displayName AS createdByName,
         creator.email AS createdByEmail,
         sender.displayName AS sentByName,
         sender.email AS sentByEmail,
         ISNULL(stats.recipientCount, 0) AS recipientCount,
         ISNULL(stats.pendingCount, 0) AS pendingCount,
         ISNULL(stats.sentCount, 0) AS sentCount,
         ISNULL(stats.failedCount, 0) AS failedCount,
         ISNULL(stats.skippedCount, 0) AS skippedCount
  FROM dbo.outreach_campaigns AS c
  LEFT JOIN dbo.users AS creator ON creator.id = c.createdBy
  LEFT JOIN dbo.users AS sender ON sender.id = c.sentBy
  LEFT JOIN (
    SELECT campaignId,
           COUNT(*) AS recipientCount,
           SUM(CASE WHEN deliveryStatus = 'pending' THEN 1 ELSE 0 END) AS pendingCount,
           SUM(CASE WHEN deliveryStatus = 'sent' THEN 1 ELSE 0 END) AS sentCount,
           SUM(CASE WHEN deliveryStatus = 'failed' THEN 1 ELSE 0 END) AS failedCount,
           SUM(CASE WHEN deliveryStatus = 'skipped' THEN 1 ELSE 0 END) AS skippedCount
    FROM dbo.outreach_campaign_recipients
    GROUP BY campaignId
  ) AS stats ON stats.campaignId = c.id
`;

function mapCampaign(row: Row): OutreachCampaign {
  const type = asString(row.type);
  const status = asString(row.status);
  return {
    id: asString(row.id),
    type: isOutreachType(type) ? type : "general",
    subject: asString(row.subject),
    content: asString(row.content),
    status: isOutreachStatus(status) ? status : "draft",
    audiences: parseAudiences(row.audiences),
    eventId: optionalString(row.eventId),
    createdBy: asString(row.createdBy),
    createdByName: asString(row.createdByName) || "Unknown",
    createdByEmail: asString(row.createdByEmail),
    sentBy: optionalString(row.sentBy),
    sentByName: optionalString(row.sentByName),
    sentByEmail: optionalString(row.sentByEmail),
    createdAt: iso(row.createdAt),
    updatedAt: iso(row.updatedAt),
    sentAt: optionalString(row.sentAt) ? iso(row.sentAt) : undefined,
    delivery: deliveryFromRow(row),
  };
}

function mapRecipient(row: Row): OutreachRecipient {
  const audience = asString(row.audience);
  return {
    id: asString(row.id),
    campaignId: asString(row.campaignId),
    email: asString(row.email),
    displayName: asString(row.displayName),
    audience: isOutreachAudienceId(audience) ? audience : "newsletter",
    deliveryStatus: asString(row.deliveryStatus) as OutreachRecipient["deliveryStatus"],
    sentAt: optionalString(row.sentAt) ? iso(row.sentAt) : undefined,
    errorMessage: optionalString(row.errorMessage),
  };
}

export async function listOutreachCampaigns() {
  const rows = await query<Row>(`${campaignSelect} ORDER BY c.updatedAt DESC`);
  return rows.map(mapCampaign);
}

export async function getOutreachCampaign(id: string) {
  if (!isUuid(id)) return null;
  const rows = await query<Row>(`${campaignSelect} WHERE c.id = @id`, (request) => {
    request.input("id", sql.UniqueIdentifier, id);
  });
  return rows[0] ? mapCampaign(rows[0]) : null;
}

export async function createOutreachCampaign(input: {
  type: OutreachType;
  subject: string;
  content: string;
  audiences: OutreachAudienceId[];
  eventId?: string;
  createdBy: string;
}) {
  const rows = await query<Row>(
    `INSERT INTO dbo.outreach_campaigns (type, subject, content, status, audiences, eventId, createdBy)
     OUTPUT INSERTED.id
     VALUES (@type, @subject, @content, 'draft', @audiences, @eventId, @createdBy)`,
    (request) => {
      request.input("type", sql.NVarChar(32), input.type);
      request.input("subject", sql.NVarChar(200), input.subject);
      request.input("content", sql.NVarChar(sql.MAX), input.content);
      request.input("audiences", sql.NVarChar(sql.MAX), JSON.stringify(input.audiences));
      request.input("eventId", sql.UniqueIdentifier, input.eventId && isUuid(input.eventId) ? input.eventId : null);
      request.input("createdBy", sql.UniqueIdentifier, input.createdBy);
    }
  );
  const id = asString(rows[0]?.id);
  const created = await getOutreachCampaign(id);
  return created ?? { ...emptyCampaign(input), id };
}

function emptyCampaign(input: {
  type: OutreachType;
  subject: string;
  content: string;
  audiences: OutreachAudienceId[];
  eventId?: string;
  createdBy: string;
}): OutreachCampaign {
  const now = new Date().toISOString();
  return {
    id: "",
    type: input.type,
    subject: input.subject,
    content: input.content,
    status: "draft",
    audiences: input.audiences,
    eventId: input.eventId,
    createdBy: input.createdBy,
    createdByName: "",
    createdByEmail: "",
    createdAt: now,
    updatedAt: now,
    delivery: emptyDeliveryCounts(),
  };
}

export async function updateOutreachCampaign(
  id: string,
  input: {
    type: OutreachType;
    subject: string;
    content: string;
    audiences: OutreachAudienceId[];
    eventId?: string;
  }
) {
  if (!isUuid(id)) return null;
  const rows = await query<Row>(
    `UPDATE dbo.outreach_campaigns
     SET type = @type,
         subject = @subject,
         content = @content,
         audiences = @audiences,
         eventId = @eventId,
         updatedAt = SYSUTCDATETIME()
     OUTPUT INSERTED.id
     WHERE id = @id AND status = 'draft'`,
    (request) => {
      request.input("id", sql.UniqueIdentifier, id);
      request.input("type", sql.NVarChar(32), input.type);
      request.input("subject", sql.NVarChar(200), input.subject);
      request.input("content", sql.NVarChar(sql.MAX), input.content);
      request.input("audiences", sql.NVarChar(sql.MAX), JSON.stringify(input.audiences));
      request.input("eventId", sql.UniqueIdentifier, input.eventId && isUuid(input.eventId) ? input.eventId : null);
    }
  );
  if (!rows[0]) return null;
  return getOutreachCampaign(id);
}

export async function listOutreachRecipients(campaignId: string) {
  if (!isUuid(campaignId)) return [];
  const rows = await query<Row>(
    `SELECT id, campaignId, email, displayName, audience, deliveryStatus, sentAt, errorMessage
     FROM dbo.outreach_campaign_recipients
     WHERE campaignId = @campaignId
     ORDER BY email ASC`,
    (request) => {
      request.input("campaignId", sql.UniqueIdentifier, campaignId);
    }
  );
  return rows.map(mapRecipient);
}

export async function replaceOutreachRecipients(
  campaignId: string,
  recipients: OutreachResolvedRecipient[],
  deliveryStatus: OutreachRecipient["deliveryStatus"] = "pending"
) {
  if (!isUuid(campaignId)) return [];
  await query(`DELETE FROM dbo.outreach_campaign_recipients WHERE campaignId = @campaignId`, (request) => {
    request.input("campaignId", sql.UniqueIdentifier, campaignId);
  });
  for (const recipient of recipients) {
    await query(
      `INSERT INTO dbo.outreach_campaign_recipients (campaignId, email, displayName, audience, deliveryStatus)
       VALUES (@campaignId, @email, @displayName, @audience, @deliveryStatus)`,
      (request) => {
        request.input("campaignId", sql.UniqueIdentifier, campaignId);
        request.input("email", sql.NVarChar(256), recipient.email);
        request.input("displayName", sql.NVarChar(200), recipient.displayName);
        request.input("audience", sql.NVarChar(32), recipient.audience);
        request.input("deliveryStatus", sql.NVarChar(20), deliveryStatus);
      }
    );
  }
  return listOutreachRecipients(campaignId);
}

export async function updateOutreachRecipientDelivery(
  id: string,
  input: { deliveryStatus: OutreachRecipient["deliveryStatus"]; errorMessage?: string; sentAt?: boolean }
) {
  if (!isUuid(id)) return;
  await query(
    `UPDATE dbo.outreach_campaign_recipients
     SET deliveryStatus = @deliveryStatus,
         sentAt = CASE WHEN @setSentAt = 1 THEN SYSUTCDATETIME() ELSE sentAt END,
         errorMessage = @errorMessage
     WHERE id = @id`,
    (request) => {
      request.input("id", sql.UniqueIdentifier, id);
      request.input("deliveryStatus", sql.NVarChar(20), input.deliveryStatus);
      request.input("setSentAt", sql.Bit, input.sentAt ? 1 : 0);
      request.input("errorMessage", sql.NVarChar(500), input.errorMessage?.slice(0, 500) ?? null);
    }
  );
}

export async function setOutreachCampaignStatus(
  id: string,
  status: OutreachStatus,
  input?: { sentBy?: string; sentAt?: boolean }
) {
  if (!isUuid(id)) return null;
  await query(
    `UPDATE dbo.outreach_campaigns
     SET status = @status,
         sentBy = COALESCE(@sentBy, sentBy),
         sentAt = CASE WHEN @setSentAt = 1 THEN SYSUTCDATETIME() ELSE sentAt END,
         updatedAt = SYSUTCDATETIME()
     WHERE id = @id`,
    (request) => {
      request.input("id", sql.UniqueIdentifier, id);
      request.input("status", sql.NVarChar(20), status);
      request.input("sentBy", sql.UniqueIdentifier, input?.sentBy && isUuid(input.sentBy) ? input.sentBy : null);
      request.input("setSentAt", sql.Bit, input?.sentAt ? 1 : 0);
    }
  );
  return getOutreachCampaign(id);
}
