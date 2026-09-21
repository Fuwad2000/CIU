import { isEmailConfigured, isSqlConfigured } from "@backend/env";
import { resolveAudiences } from "@backend/outreach/audience";
import { denyOutreachSend, denyStaffAudience } from "@backend/outreach/policy";
import { outreachSqlMessage } from "@backend/outreach/sql";
import {
  getOutreachCampaign,
  replaceOutreachRecipients,
  setOutreachCampaignStatus,
  updateOutreachRecipientDelivery,
} from "@backend/outreach/store";
import { sendOutreachRecipientMail } from "@email/outreach-mail";
import type { AdminRole } from "@shared/admin-roles";
import type { OutreachCampaign, OutreachRecipient } from "@shared/outreach";
import type { PosterImageInput } from "@shared/poster-image";

const SEND_CONCURRENCY = 6;

export type OutreachSendResult =
  | { ok: true; data: OutreachCampaign }
  | { ok: false; status: number; error: string; uniqueCount?: number };

async function mapLimit<T>(items: T[], limit: number, worker: (item: T) => Promise<void>) {
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = items[index++];
      if (current) await worker(current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) || 1 }, run));
}

export async function handleOutreachSend(input: {
  campaignId: string;
  actorId: string;
  actorRole: AdminRole;
  poster?: PosterImageInput;
}): Promise<OutreachSendResult> {
  const denied = denyOutreachSend(input.actorRole);
  if (denied) return { ok: false, status: 403, error: denied };

  if (!isSqlConfigured()) {
    return { ok: false, status: 503, error: "Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE." };
  }
  if (!isEmailConfigured()) {
    return {
      ok: false,
      status: 503,
      error: "Email delivery is not configured. Set AZURE_COMMUNICATION_SERVICES_ENDPOINT and AZURE_EMAIL_SENDER.",
    };
  }

  const campaign = await getOutreachCampaign(input.campaignId);
  if (!campaign) return { ok: false, status: 404, error: "Campaign not found." };
  if (campaign.status !== "draft") {
    return { ok: false, status: 409, error: "Only draft campaigns can be sent." };
  }
  if (!campaign.subject.trim() || !campaign.content.trim()) {
    return { ok: false, status: 400, error: "Subject and email content are required before sending." };
  }
  if (campaign.audiences.length === 0) {
    return { ok: false, status: 400, error: "Choose at least one audience before sending." };
  }

  const deniedStaff = denyStaffAudience(input.actorRole, campaign.audiences);
  if (deniedStaff) return { ok: false, status: 403, error: deniedStaff };

  const { recipients, preview } = await resolveAudiences(campaign.audiences);
  if (preview.uniqueCount === 0) {
    return { ok: false, status: 400, error: "There are no eligible recipients for the selected audiences." };
  }

  const stored = await replaceOutreachRecipients(campaign.id, recipients);
  await setOutreachCampaignStatus(campaign.id, "sending");

  let sent = 0;
  try {
    await mapLimit(stored, SEND_CONCURRENCY, async (recipient) => {
      const result = await deliverOne(campaign, recipient, input.poster);
      if (result === "sent") sent += 1;
    });
  } catch (error) {
    await setOutreachCampaignStatus(campaign.id, "failed", { sentBy: input.actorId });
    return { ok: false, status: 500, error: outreachSqlMessage(error, "Could not send campaign.") };
  }

  const succeeded = sent > 0;
  const finished = await setOutreachCampaignStatus(campaign.id, succeeded ? "sent" : "failed", {
    sentBy: input.actorId,
    sentAt: succeeded,
  });
  if (!finished) return { ok: false, status: 500, error: "Campaign was sent but could not be reloaded." };
  if (!succeeded) {
    return {
      ok: false,
      status: 502,
      error: "The campaign could not be delivered to any recipient.",
      uniqueCount: preview.uniqueCount,
    };
  }

  return { ok: true, data: finished };
}

async function deliverOne(
  campaign: OutreachCampaign,
  recipient: OutreachRecipient,
  poster?: PosterImageInput
): Promise<"sent" | "failed" | "skipped"> {
  try {
    const result = await sendOutreachRecipientMail(campaign, recipient, poster);
    if (result.status === "skipped") {
      await updateOutreachRecipientDelivery(recipient.id, {
        deliveryStatus: "skipped",
        errorMessage: "The email address is not valid.",
      });
      return "skipped";
    }
    await updateOutreachRecipientDelivery(recipient.id, { deliveryStatus: "sent", sentAt: true });
    return "sent";
  } catch {
    await updateOutreachRecipientDelivery(recipient.id, {
      deliveryStatus: "failed",
      errorMessage: "The email could not be sent.",
    });
    return "failed";
  }
}
