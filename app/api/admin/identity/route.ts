import { NextResponse } from "next/server";
import { authenticateAdminRequest, toAdminMe } from "@/lib/portal/entra-auth";
import {
  ADMIN_EMAIL_COOKIE,
  jsonError,
  jsonOk,
  requireAdmin,
} from "@/lib/portal/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const auth = await authenticateAdminRequest(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);
  return jsonOk(toAdminMe(auth.actor));
}

export async function POST() {
  return jsonError("Sign in with Microsoft. Staff email cannot be set from the browser.", 410);
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_EMAIL_COOKIE);
  return response;
}
