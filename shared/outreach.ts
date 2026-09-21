export const OUTREACH_TYPES = ["newsletter", "announcement", "event", "volunteer", "marketing", "general"] as const;
export const OUTREACH_AUDIENCES = [
  "newsletter",
  "members",
  "volunteers",
  "contacts",
  "additional",
  "quran",
  "kids",
  "admins",
] as const;
export const OUTREACH_SELECTABLE_AUDIENCES = OUTREACH_AUDIENCES.filter((id) => id !== "contacts");
export const OUTREACH_STATUSES = ["draft", "sending", "sent", "failed"] as const;
export const OUTREACH_DELIVERY_STATUSES = ["pending", "sent", "failed", "skipped"] as const;

export type OutreachType = (typeof OUTREACH_TYPES)[number];
export type OutreachAudienceId = (typeof OUTREACH_AUDIENCES)[number];
export type OutreachStatus = (typeof OUTREACH_STATUSES)[number];
export type OutreachDeliveryStatus = (typeof OUTREACH_DELIVERY_STATUSES)[number];

export const OUTREACH_TYPE_LABELS: Record<OutreachType, string> = {
  newsletter: "Newsletter",
  announcement: "Announcement",
  event: "Event",
  volunteer: "Volunteer",
  marketing: "Marketing",
  general: "General",
};

export const OUTREACH_AUDIENCE_LABELS: Record<OutreachAudienceId, string> = {
  newsletter: "Newsletter subscribers",
  members: "Members",
  volunteers: "Volunteers",
  contacts: "Contact messages",
  additional: "Contact list",
  quran: "Quran class",
  kids: "Kids program",
  admins: "CIU staff / admins",
};

export const OUTREACH_AUDIENCE_DESCRIPTIONS: Record<OutreachAudienceId, string> = {
  newsletter: "People who asked for CIU event and community emails.",
  members: "People who joined the membership mailing list.",
  volunteers: "People who registered to volunteer at CIU.",
  contacts: "People who sent a message through the website contact form.",
  additional: "Unique people: each contact-form sender once, plus anyone staff add by hand.",
  quran: "People who registered for weekly Quran class. They can receive any campaign type the admin chooses.",
  kids: "Families who registered for the kids program. They can receive any campaign type the admin chooses.",
  admins: "Active CIU staff accounts.",
};

export const OUTREACH_AUDIENCE_HREFS: Record<OutreachAudienceId, string> = {
  newsletter: "/admin/newsletter",
  members: "/admin/members",
  volunteers: "/admin/volunteers",
  contacts: "/admin/contacts",
  additional: "/admin/outreach/additional",
  quran: "/admin/registrations/quran",
  kids: "/admin/registrations/kids",
  admins: "/admin/users",
};

export const OUTREACH_STATUS_LABELS: Record<OutreachStatus, string> = {
  draft: "Draft",
  sending: "Sending",
  sent: "Sent",
  failed: "Failed",
};

export type OutreachDeliveryCounts = {
  total: number;
  pending: number;
  sent: number;
  failed: number;
  skipped: number;
};

export type OutreachCampaign = {
  id: string;
  type: OutreachType;
  subject: string;
  content: string;
  status: OutreachStatus;
  audiences: OutreachAudienceId[];
  eventId?: string;
  createdBy: string;
  createdByName: string;
  createdByEmail: string;
  sentBy?: string;
  sentByName?: string;
  sentByEmail?: string;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  delivery: OutreachDeliveryCounts;
};

export type OutreachRecipient = {
  id: string;
  campaignId: string;
  email: string;
  displayName: string;
  audience: OutreachAudienceId;
  deliveryStatus: OutreachDeliveryStatus;
  sentAt?: string;
  errorMessage?: string;
};

export type OutreachResolvedRecipient = {
  email: string;
  displayName: string;
  audience: OutreachAudienceId;
};

export type OutreachAdditionalPerson = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  notes?: string;
  createdBy?: string;
  createdByName?: string;
  createdAt: string;
};

export type OutreachPreview = {
  audiences: OutreachAudienceId[];
  uniqueCount: number;
  countsByAudience: Record<OutreachAudienceId, number>;
};

export function isOutreachType(value: string): value is OutreachType {
  return OUTREACH_TYPES.includes(value as OutreachType);
}

export function isOutreachAudienceId(value: string): value is OutreachAudienceId {
  return OUTREACH_AUDIENCES.includes(value as OutreachAudienceId);
}

export function isOutreachStatus(value: string): value is OutreachStatus {
  return OUTREACH_STATUSES.includes(value as OutreachStatus);
}

export function isOutreachHistoryStatus(status: OutreachStatus) {
  return status === "sending" || status === "sent" || status === "failed";
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isUsableEmail(value: string) {
  const email = normalizeEmail(value);
  return Boolean(email && email.includes("@") && !email.startsWith("@") && !email.endsWith("@"));
}

export function parseAudienceIds(value: unknown): OutreachAudienceId[] | "invalid" {
  if (value == null) return [];
  if (!Array.isArray(value)) return "invalid";
  const unique: OutreachAudienceId[] = [];
  for (const item of value) {
    if (typeof item !== "string") return "invalid";
    const id = item.trim();
    if (!(OUTREACH_SELECTABLE_AUDIENCES as readonly string[]).includes(id)) return "invalid";
    const audience = id as OutreachAudienceId;
    if (!unique.includes(audience)) unique.push(audience);
  }
  return unique;
}

export function mergeAudienceRecipients(
  groups: Array<{ audience: OutreachAudienceId; recipients: Array<{ email: string; displayName: string }> }>
): OutreachResolvedRecipient[] {
  const seen = new Set<string>();
  const merged: OutreachResolvedRecipient[] = [];
  for (const group of groups) {
    for (const item of group.recipients) {
      if (!isUsableEmail(item.email)) continue;
      const email = normalizeEmail(item.email);
      if (seen.has(email)) continue;
      seen.add(email);
      merged.push({
        email,
        displayName: item.displayName.trim() || email,
        audience: group.audience,
      });
    }
  }
  return merged;
}

export function emptyDeliveryCounts(total = 0): OutreachDeliveryCounts {
  return { total, pending: 0, sent: 0, failed: 0, skipped: 0 };
}

export function emptyAudienceCounts(): Record<OutreachAudienceId, number> {
  return {
    newsletter: 0,
    members: 0,
    volunteers: 0,
    contacts: 0,
    additional: 0,
    quran: 0,
    kids: 0,
    admins: 0,
  };
}
