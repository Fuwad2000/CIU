import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/portal/auth";
import { jsonError } from "@/lib/portal/http";

export const dynamic = "force-dynamic";

export async function POST() {
  return jsonError("Password sign-in is disabled. Use Microsoft Entra.", 410);
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
