import {
  canSelectStaffAudience,
  canSendOutreach,
  canViewOutreachRecipients,
  type AdminRole,
} from "@shared/admin-roles";
import type { OutreachAudienceId } from "@shared/outreach";

export { canSelectStaffAudience, canSendOutreach, canViewOutreachRecipients };

export function denyOutreachCreate(role: AdminRole | null) {
  if (canSendOutreach(role)) return null;
  return "You do not have permission to create Outreach campaigns.";
}

export function denyOutreachSend(role: AdminRole | null) {
  if (canSendOutreach(role)) return null;
  return "You do not have permission to send Outreach campaigns.";
}

export function denyOutreachRecipients(role: AdminRole | null) {
  if (canViewOutreachRecipients(role)) return null;
  return "You do not have permission to view Outreach recipient emails.";
}

export function denyStaffAudience(
  role: AdminRole | null,
  audiences: OutreachAudienceId[],
  previous: OutreachAudienceId[] = []
) {
  const addingStaff = audiences.includes("admins") && !previous.includes("admins");
  if (addingStaff && !canSelectStaffAudience(role)) {
    return "You do not have permission to select CIU staff as an audience.";
  }
  return null;
}
