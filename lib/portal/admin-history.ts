import type { AdminHistoryAction, AdminHistoryArea } from "@/lib/portal/types";

export const HISTORY_ACTION_LABELS: Record<AdminHistoryAction, string> = {
  authenticated: "Signed in",
  "signed-out": "Signed out",
  created: "Created",
  updated: "Updated",
  deleted: "Deleted",
};

export const HISTORY_AREA_LABELS: Record<AdminHistoryArea, string> = {
  session: "Login",
  users: "Users",
  announcements: "Announcements",
  events: "Events",
  contacts: "Contacts",
  registrations: "Registrations",
  outreach: "Outreach",
};
