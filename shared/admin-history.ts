import type { AdminHistoryAction, AdminHistoryArea } from "@shared/types";

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
  members: "Membership",
  volunteers: "Volunteers",
  newsletter: "Newsletter",
};

export const HISTORY_ACTION_FILTERS = [
  { value: "all", label: "All actions" },
  ...Object.entries(HISTORY_ACTION_LABELS).map(([value, label]) => ({ value, label })),
];

export const HISTORY_SERVICE_FILTERS = [
  { value: "all", label: "All services" },
  ...Object.entries(HISTORY_AREA_LABELS).map(([value, label]) => ({ value, label })),
];
