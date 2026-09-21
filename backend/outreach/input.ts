import { readString } from "@shared/read-string";
import {
  isOutreachType,
  isUsableEmail,
  normalizeEmail,
  parseAudienceIds,
  type OutreachAudienceId,
  type OutreachType,
} from "@shared/outreach";

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

export type OutreachAdditionalInput = {
  fullName: string;
  email: string;
  phone?: string;
  notes?: string;
};

export function parseOutreachAdditionalInput(body: Record<string, unknown>): OutreachAdditionalInput | string {
  const fullName = readString(body.fullName);
  if (!fullName) return "Name is required.";
  if (fullName.length > 200) return "Name must be 200 characters or fewer.";
  const email = normalizeEmail(readString(body.email));
  if (!isUsableEmail(email)) return "A valid email is required.";
  if (email.length > 256) return "Email must be 256 characters or fewer.";
  const phone = readString(body.phone);
  if (phone.length > 40) return "Phone must be 40 characters or fewer.";
  const notes = readString(body.notes);
  if (notes.length > 500) return "Notes must be 500 characters or fewer.";
  return {
    fullName,
    email,
    phone: phone || undefined,
    notes: notes || undefined,
  };
}
