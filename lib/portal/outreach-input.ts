import { readString } from "@/lib/portal/http";
import {
  isOutreachType,
  parseAudienceIds,
  type OutreachAudienceId,
  type OutreachType,
} from "@/lib/portal/outreach";

export type OutreachCampaignInput = {
  type: OutreachType;
  subject: string;
  content: string;
  audiences: OutreachAudienceId[];
  eventId?: string;
};

export function parseOutreachCampaignInput(body: Record<string, unknown>): OutreachCampaignInput | string {
  const typeValue = readString(body.type).toLowerCase();
  if (!isOutreachType(typeValue)) {
    return "Choose a campaign type.";
  }
  const subject = readString(body.subject);
  if (!subject) return "Subject is required.";
  if (subject.length > 200) return "Subject must be 200 characters or fewer.";
  const content = typeof body.content === "string" ? body.content : "";
  const audiences = parseAudienceIds(body.audiences);
  if (audiences === "invalid") {
    return "Choose only supported audiences.";
  }
  const eventId = readString(body.eventId);
  return {
    type: typeValue,
    subject,
    content,
    audiences,
    eventId: eventId || undefined,
  };
}
