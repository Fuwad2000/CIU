import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AdminActor } from "@backend/auth/entra-auth";
import { canDeleteSubscriptions, flagsForRole } from "@shared/admin-roles";

const requireAdminActor = vi.fn();
const recordHistory = vi.fn();
const isSqlConfigured = vi.fn();
const deleteMember = vi.fn();
const deleteVolunteer = vi.fn();
const deleteNewsletter = vi.fn();
const deleteOutreachAdditional = vi.fn();

vi.mock("@backend/auth/admin-auth", () => ({
  requireAdminActor: (...args: unknown[]) => requireAdminActor(...args),
}));

vi.mock("@backend/http/respond", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@backend/http/respond")>();
  return { ...actual, recordHistory };
});

vi.mock("@backend/env", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@backend/env")>();
  return { ...actual, isSqlConfigured };
});

vi.mock("@backend/sql/sql-store", () => ({
  deleteMember,
  deleteVolunteer,
  deleteNewsletter,
}));

vi.mock("@backend/outreach/additional", () => ({
  deleteOutreachAdditional,
}));

function actor(role: AdminActor["adminRole"]): AdminActor {
  return {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    email: "fuwad.oladega@ciucanada.ca",
    displayName: "Fuwad Oladega",
    role,
    adminRole: role,
    isActive: true,
    ...flagsForRole(role),
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
}

function jsonRequest(url: string) {
  return new Request(url, { method: "DELETE", headers: { Authorization: "Bearer test" } });
}

async function read(response: Response) {
  return { status: response.status, body: await response.json() };
}

const params = { params: Promise.resolve({ id: "11111111-1111-4111-8111-111111111111" }) };

describe("subscription deletes", () => {
  beforeEach(() => {
    requireAdminActor.mockReset().mockResolvedValue({ actor: actor("intermediateadmin") });
    recordHistory.mockReset().mockResolvedValue({ id: "h1" });
    isSqlConfigured.mockReset().mockReturnValue(true);
    deleteMember.mockReset().mockResolvedValue({ id: "m1", fullName: "Amina Hassan", email: "amina@example.com" });
    deleteVolunteer.mockReset().mockResolvedValue({ id: "v1", fullName: "Sara Khan", email: "sara@example.com" });
    deleteNewsletter.mockReset().mockResolvedValue({ id: "n1", fullName: "Omar Ali", email: "omar@example.com" });
    deleteOutreachAdditional.mockReset().mockResolvedValue({
      id: "a1",
      fullName: "Guest",
      email: "guest@example.com",
    });
  });

  it("lets only intermediate and super admins remove subscription people", () => {
    expect(canDeleteSubscriptions("regularadmin")).toBe(false);
    expect(canDeleteSubscriptions("intermediateadmin")).toBe(true);
    expect(canDeleteSubscriptions("superadmin")).toBe(true);
  });

  it("blocks regularadmin from every subscription delete route", async () => {
    requireAdminActor.mockResolvedValue({ actor: actor("regularadmin") });
    const members = await import("@backend/http/admin/members-id");
    const volunteers = await import("@backend/http/admin/volunteers-id");
    const newsletter = await import("@backend/http/admin/newsletter-id");
    const additional = await import("@backend/http/admin/outreach-additional-id");

    expect((await read(await members.DELETE(jsonRequest("http://localhost/api/admin/members/x"), params))).status).toBe(
      403
    );
    expect((await read(await volunteers.DELETE(jsonRequest("http://localhost/api/admin/volunteers/x"), params))).status).toBe(
      403
    );
    expect((await read(await newsletter.DELETE(jsonRequest("http://localhost/api/admin/newsletter/x"), params))).status).toBe(
      403
    );
    expect(
      (await read(await additional.DELETE(jsonRequest("http://localhost/api/admin/outreach/additional/x"), params))).status
    ).toBe(403);
    expect(deleteMember).not.toHaveBeenCalled();
    expect(deleteVolunteer).not.toHaveBeenCalled();
    expect(deleteNewsletter).not.toHaveBeenCalled();
    expect(deleteOutreachAdditional).not.toHaveBeenCalled();
  });

  it("lets an intermediate admin delete a member", async () => {
    const members = await import("@backend/http/admin/members-id");
    const result = await read(await members.DELETE(jsonRequest("http://localhost/api/admin/members/x"), params));
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(deleteMember).toHaveBeenCalledWith("11111111-1111-4111-8111-111111111111");
    expect(recordHistory).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        action: "deleted",
        area: "members",
        summary: "Removed membership: Amina Hassan (amina@example.com)",
      })
    );
  });
});
