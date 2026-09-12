import { NextResponse } from "next/server";
import { getPortalBackend } from "@/lib/portal/backend";
import type { AdminHistoryArea, AdminHistoryAction } from "@/lib/portal/types";

export const ADMIN_EMAIL_COOKIE = "ciu_admin_email";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireAdmin(_request: Request) {
  return null;
}

export function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function readAdminEmail(request: Request) {
  const raw = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_EMAIL_COOKIE}=`))
    ?.slice(ADMIN_EMAIL_COOKIE.length + 1);

  if (!raw) return "";
  return decodeURIComponent(raw).trim().toLowerCase();
}

export function adminEmailCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  };
}

export async function recordHistory(
  request: Request,
  input: {
    action: AdminHistoryAction;
    area: AdminHistoryArea;
    summary: string;
    entityId?: string;
    adminEmail?: string;
  }
) {
  const adminEmail = input.adminEmail || readAdminEmail(request) || "unknown";
  return getPortalBackend().createHistory({
    adminEmail,
    action: input.action,
    area: input.area,
    summary: input.summary,
    entityId: input.entityId,
  });
}
