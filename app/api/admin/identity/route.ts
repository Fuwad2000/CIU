import { NextResponse } from "next/server";
import {
  ADMIN_EMAIL_COOKIE,
  adminEmailCookieOptions,
  jsonError,
  jsonOk,
  readAdminEmail,
  readString,
  recordHistory,
  requireAdmin,
} from "@/lib/portal/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  return jsonOk({ email: readAdminEmail(request) });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = (await request.json().catch(() => ({}))) as { email?: unknown };
  const email = readString(body.email).toLowerCase();
  if (!email || !email.includes("@")) {
    return jsonError("Enter a valid staff email so history can record your changes.");
  }

  await recordHistory(request, {
    action: "authenticated",
    area: "session",
    summary: `Signed in as ${email}`,
    adminEmail: email,
  });

  const response = jsonOk({ email });
  response.cookies.set(ADMIN_EMAIL_COOKIE, email, adminEmailCookieOptions());
  return response;
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const email = readAdminEmail(request);
  if (email) {
    await recordHistory(request, {
      action: "signed-out",
      area: "session",
      summary: `Signed out ${email}`,
      adminEmail: email,
    });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_EMAIL_COOKIE);
  return response;
}
