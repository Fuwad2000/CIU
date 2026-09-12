import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSession,
  verifyAdminPassword,
} from "@/lib/portal/auth";
import { isAdminConfigured } from "@/lib/portal/env";
import { jsonError, jsonOk, readString } from "@/lib/portal/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return jsonError("Set ADMIN_PASSWORD before using the admin portal.", 503);
  }

  const body = (await request.json().catch(() => ({}))) as { password?: unknown };
  const password = readString(body.password);
  if (!(await verifyAdminPassword(password))) {
    return jsonError("Incorrect password.", 401);
  }

  const token = await createAdminSession();
  const response = jsonOk({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, adminCookieOptions());
  return response;
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}
