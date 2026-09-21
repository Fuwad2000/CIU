import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@backend/auth/auth";
import { authenticateAdminRequest } from "@backend/auth/entra-auth";
import {
  applyStaffSessionCookie,
  clearStaffSessionCookie,
  endStaffSession,
  endStaffSessionsForUser,
  isStaffSessionTableMissing,
  readStaffSessionId,
  replaceStaffSession,
} from "@backend/auth/staff-session";
import { isSqlConfigured } from "@backend/env";
import { jsonError, recordHistory } from "@backend/http/respond";
import { STAFF_SESSION_MS, type StaffSessionRecord } from "@shared/admin-session";

function skippedSession(userId: string): StaffSessionRecord {
  const now = new Date();
  return {
    id: "",
    userId,
    createdAt: now.toISOString(),
    lastSeenAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + STAFF_SESSION_MS).toISOString(),
  };
}

export async function POST(request: Request) {
  const auth = await authenticateAdminRequest(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);

  let session = skippedSession(auth.actor.id);
  if (isSqlConfigured()) {
    try {
      session = await replaceStaffSession(auth.actor.id);
    } catch (error) {
      if (!isStaffSessionTableMissing(error)) {
        return jsonError("Could not start a staff session. Please try again.", 500);
      }
    }
  }

  try {
    await recordHistory(request, {
      action: "authenticated",
      area: "session",
      summary: `Signed in: ${auth.actor.displayName}`,
      entityId: session.id || auth.actor.id,
    });
  } catch {
    // A history write must not block a fresh sign-in.
  }

  const response = NextResponse.json(session, { status: 201 });
  applyStaffSessionCookie(response, session.id);
  return response;
}

export async function DELETE(request: Request) {
  const sessionId = readStaffSessionId(request);
  if (isSqlConfigured()) {
    try {
      if (sessionId) await endStaffSession(sessionId);
    } catch {
      // Sign-out should still clear the browser even if SQL is briefly unavailable.
    }
  }

  const auth = await authenticateAdminRequest(request);
  if (auth.actor && isSqlConfigured()) {
    try {
      await endStaffSessionsForUser(auth.actor.id);
    } catch {
      // Same as above: the cookie still has to be cleared.
    }
    try {
      await recordHistory(request, {
        action: "signed-out",
        area: "session",
        summary: `Signed out: ${auth.actor.displayName}`,
        entityId: sessionId || auth.actor.id,
        adminEmail: auth.actor.email,
      });
    } catch {
      // Sign-out still has to clear the cookie.
    }
  }

  const response = NextResponse.json({ ok: true });
  clearStaffSessionCookie(response);
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
