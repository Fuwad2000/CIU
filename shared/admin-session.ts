export const ADMIN_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
export const ADMIN_IDLE_WARNING_MS = 2 * 60 * 1000;
export const STAFF_SESSION_MS = ADMIN_IDLE_TIMEOUT_MS + ADMIN_IDLE_WARNING_MS;
export const STAFF_SESSION_COOKIE = "ciu_staff_session";

export type StaffSessionRecord = {
  id: string;
  userId: string;
  createdAt: string;
  lastSeenAt: string;
  expiresAt: string;
};
