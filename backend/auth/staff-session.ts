import sql from "mssql";
import { NextResponse } from "next/server";
import { query } from "@backend/db/sql-query";
import { STAFF_SESSION_COOKIE, STAFF_SESSION_MS, type StaffSessionRecord } from "@shared/admin-session";

type Row = Record<string, unknown>;

function iso(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value) return new Date(value).toISOString();
  return "";
}

function asString(value: unknown) {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

function isUuid(value: string | undefined) {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

function mapSession(row: Row | undefined): StaffSessionRecord | null {
  if (!row) return null;
  return {
    id: asString(row.id),
    userId: asString(row.userId),
    createdAt: iso(row.createdAt),
    lastSeenAt: iso(row.lastSeenAt),
    expiresAt: iso(row.expiresAt),
  };
}

export function isStaffSessionTableMissing(error: unknown) {
  const text = error instanceof Error ? error.message : String(error);
  return /Invalid object name.*staff_sessions/i.test(text);
}

export function staffSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(STAFF_SESSION_MS / 1000),
  };
}

export function readStaffSessionId(request: Request) {
  const raw = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${STAFF_SESSION_COOKIE}=`))
    ?.slice(STAFF_SESSION_COOKIE.length + 1);

  if (!raw) return "";
  const id = decodeURIComponent(raw).trim();
  return isUuid(id) ? id : "";
}

export function applyStaffSessionCookie(response: NextResponse, id: string) {
  if (!isUuid(id)) return;
  response.cookies.set(STAFF_SESSION_COOKIE, id, staffSessionCookieOptions());
}

export function clearStaffSessionCookie(response: NextResponse) {
  response.cookies.delete(STAFF_SESSION_COOKIE);
}

export async function replaceStaffSession(userId: string): Promise<StaffSessionRecord> {
  if (!isUuid(userId)) throw new Error("A valid staff user is required to start a session.");
  await query(`DELETE FROM dbo.staff_sessions WHERE userId = @userId`, (request) => {
    request.input("userId", sql.UniqueIdentifier, userId);
  });
  const rows = await query<Row>(
    `INSERT INTO dbo.staff_sessions (userId, expiresAt)
     OUTPUT INSERTED.id, INSERTED.userId, INSERTED.createdAt, INSERTED.lastSeenAt, INSERTED.expiresAt
     VALUES (@userId, @expiresAt)`,
    (request) => {
      request.input("userId", sql.UniqueIdentifier, userId);
      request.input("expiresAt", sql.DateTime2, new Date(Date.now() + STAFF_SESSION_MS));
    }
  );
  const record = mapSession(rows[0]);
  if (!record) throw new Error("Could not start a staff session.");
  return record;
}

export async function endStaffSession(id: string) {
  if (!isUuid(id)) return;
  await query(`DELETE FROM dbo.staff_sessions WHERE id = @id`, (request) => {
    request.input("id", sql.UniqueIdentifier, id);
  });
}

export async function endStaffSessionsForUser(userId: string) {
  if (!isUuid(userId)) return;
  await query(`DELETE FROM dbo.staff_sessions WHERE userId = @userId`, (request) => {
    request.input("userId", sql.UniqueIdentifier, userId);
  });
}

export async function touchStaffSession(id: string): Promise<StaffSessionRecord | null> {
  if (!isUuid(id)) return null;
  const rows = await query<Row>(
    `UPDATE dbo.staff_sessions
     SET lastSeenAt = SYSUTCDATETIME(),
         expiresAt = DATEADD(SECOND, @seconds, SYSUTCDATETIME())
     OUTPUT INSERTED.id, INSERTED.userId, INSERTED.createdAt, INSERTED.lastSeenAt, INSERTED.expiresAt
     WHERE id = @id`,
    (request) => {
      request.input("id", sql.UniqueIdentifier, id);
      request.input("seconds", sql.Int, Math.floor(STAFF_SESSION_MS / 1000));
    }
  );
  return mapSession(rows[0]);
}
