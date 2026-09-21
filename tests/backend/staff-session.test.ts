import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AdminActor } from "@backend/auth/entra-auth";
import { flagsForRole } from "@shared/admin-roles";

const query = vi.fn();
const authenticateAdminRequest = vi.fn();
const recordHistory = vi.fn();
const isSqlConfigured = vi.fn();

vi.mock("@backend/db/sql-query", () => ({
  query: (...args: unknown[]) => query(...args),
}));

vi.mock("@backend/auth/entra-auth", () => ({
  authenticateAdminRequest: (...args: unknown[]) => authenticateAdminRequest(...args),
}));

vi.mock("@backend/http/respond", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@backend/http/respond")>();
  return { ...actual, recordHistory };
});

vi.mock("@backend/env", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@backend/env")>();
  return { ...actual, isSqlConfigured };
});

const USER_ID = "11111111-1111-4111-8111-111111111111";
const SESSION_ID = "22222222-2222-4222-8222-222222222222";

function actor(): AdminActor {
  return {
    id: USER_ID,
    email: "fuwad.oladega@ciucanada.ca",
    displayName: "Fuwad Oladega",
    role: "superadmin",
    adminRole: "superadmin",
    isActive: true,
    ...flagsForRole("superadmin"),
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
}

function jsonRequest(method: string, cookie = "") {
  return new Request("http://localhost/api/admin/session", {
    method,
    headers: {
      Authorization: "Bearer test",
      ...(cookie ? { cookie } : {}),
    },
  });
}

describe("staff session rotation", () => {
  beforeEach(() => {
    query.mockReset();
    authenticateAdminRequest.mockReset().mockResolvedValue({ actor: actor() });
    recordHistory.mockReset().mockResolvedValue({ id: "h1" });
    isSqlConfigured.mockReset().mockReturnValue(true);
  });

  it("deletes any previous sessions for the user before inserting a new one", async () => {
    const { replaceStaffSession } = await import("@backend/auth/staff-session");
    query
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          id: SESSION_ID,
          userId: USER_ID,
          createdAt: "2026-09-21T20:00:00.000Z",
          lastSeenAt: "2026-09-21T20:00:00.000Z",
          expiresAt: "2026-09-21T20:32:00.000Z",
        },
      ]);

    const session = await replaceStaffSession(actor().id);
    expect(query.mock.calls[0]?.[0]).toMatch(/DELETE FROM dbo.staff_sessions WHERE userId = @userId/i);
    expect(query.mock.calls[1]?.[0]).toMatch(/INSERT INTO dbo.staff_sessions/i);
    expect(session.id).toBe(SESSION_ID);
  });

  it("starts a new database session after Entra validation", async () => {
    const { POST } = await import("@backend/http/admin/session");
    query
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          id: SESSION_ID,
          userId: USER_ID,
          createdAt: "2026-09-21T20:00:00.000Z",
          lastSeenAt: "2026-09-21T20:00:00.000Z",
          expiresAt: "2026-09-21T20:32:00.000Z",
        },
      ]);

    const response = await POST(jsonRequest("POST"));
    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body.id).toBe(SESSION_ID);
    expect(recordHistory).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ action: "authenticated", area: "session" })
    );
  });

  it("deletes the current session cookie row on sign-out", async () => {
    const { DELETE } = await import("@backend/http/admin/session");
    query.mockResolvedValue([]);

    const response = await DELETE(
      jsonRequest("DELETE", `ciu_staff_session=${SESSION_ID}`)
    );
    expect(response.status).toBe(200);
    expect(query.mock.calls[0]?.[0]).toMatch(/DELETE FROM dbo.staff_sessions WHERE id = @id/i);
    expect(query.mock.calls[1]?.[0]).toMatch(/DELETE FROM dbo.staff_sessions WHERE userId = @userId/i);
    expect(recordHistory).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ action: "signed-out", area: "session" })
    );
  });
});
