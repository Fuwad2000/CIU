import { ADMIN_IDLE_TIMEOUT_MS, ADMIN_IDLE_WARNING_MS } from "@shared/admin-session";

export { ADMIN_IDLE_TIMEOUT_MS, ADMIN_IDLE_WARNING_MS };
export const ADMIN_SESSION_EXPIRED_EVENT = "ciu-admin-session-expired";

export type AdminSessionPhase = "active" | "warning" | "expired";

export function adminSessionPhase(input: {
  now: number;
  lastActivityAt: number;
  idleMs?: number;
  warningMs?: number;
}): AdminSessionPhase {
  const idleMs = input.idleMs ?? ADMIN_IDLE_TIMEOUT_MS;
  const warningMs = input.warningMs ?? ADMIN_IDLE_WARNING_MS;
  const elapsed = Math.max(0, input.now - input.lastActivityAt);
  if (elapsed < idleMs) return "active";
  if (elapsed < idleMs + warningMs) return "warning";
  return "expired";
}

export function adminSessionWarningRemainingMs(input: {
  now: number;
  lastActivityAt: number;
  idleMs?: number;
  warningMs?: number;
}) {
  const idleMs = input.idleMs ?? ADMIN_IDLE_TIMEOUT_MS;
  const warningMs = input.warningMs ?? ADMIN_IDLE_WARNING_MS;
  return Math.max(0, idleMs + warningMs - Math.max(0, input.now - input.lastActivityAt));
}

export function clampAuthProgress(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function formatSessionCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function notifyAdminSessionExpired() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(ADMIN_SESSION_EXPIRED_EVENT));
}
