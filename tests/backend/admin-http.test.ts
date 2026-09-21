import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AdminActor } from "@backend/auth/entra-auth";
import { flagsForRole } from "@shared/admin-roles";
import type { StaffUserRecord } from "@shared/records";

const requireAdmin = vi.fn();
const recordHistory = vi.fn();
const requireAdminActor = vi.fn();
const authenticateAdminRequest = vi.fn();
const listStaffUsers = vi.fn();
const createStaffUser = vi.fn();
const getStaffUserById = vi.fn();
const updateStaffUserAccess = vi.fn();
const listMembers = vi.fn();
const listVolunteers = vi.fn();
const listNewsletter = vi.fn();
const listOutreachCampaigns = vi.fn();
const createOutreachCampaign = vi.fn();
const isSqlConfigured = vi.fn();

const announcements = new Map<string, { id: string; message: string; href?: string; active: boolean }>();
const events = new Map<string, Record<string, unknown>>();
const contacts: Array<Record<string, unknown>> = [];
const registrations: Array<Record<string, unknown>> = [];
const history: Array<Record<string, unknown>> = [];

const backend = {
  async listAnnouncements() {
    return [...announcements.values()];
  },
  async createAnnouncement(input: { message: string; href?: string; active?: boolean }) {
    const record = { id: crypto.randomUUID(), message: input.message, href: input.href, active: input.active ?? true };
    announcements.set(record.id, record);
    return record;
  },
  async updateAnnouncement(id: string, input: Partial<{ message: string; href?: string; active: boolean }>) {
    const current = announcements.get(id);
    if (!current) return null;
    Object.assign(current, input);
    return current;
  },
  async deleteAnnouncement(id: string) {
    return announcements.delete(id);
  },
  async listEvents() {
    return [...events.values()];
  },
  async createEvent(input: Record<string, unknown>) {
    const record = { id: crypto.randomUUID(), ...input };
    events.set(record.id, record);
    return record;
  },
  async updateEvent(id: string, input: Record<string, unknown>) {
    const current = events.get(id);
    if (!current) return null;
    Object.assign(current, input);
    return current;
  },
  async deleteEvent(id: string) {
    return events.delete(id);
  },
  async listContacts() {
    return contacts;
  },
  async listRegistrations() {
    return registrations;
  },
  async listHistory() {
    return history;
  },
};

vi.mock("@backend/http/respond", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@backend/http/respond")>();
  return { ...actual, requireAdmin, recordHistory };
});

vi.mock("@backend/stores/backend", () => ({
  getPortalBackend: () => backend,
}));

vi.mock("@backend/auth/admin-auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@backend/auth/admin-auth")>();
  return { ...actual, requireAdminActor };
});

vi.mock("@backend/auth/entra-auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@backend/auth/entra-auth")>();
  return { ...actual, authenticateAdminRequest };
});

vi.mock("@backend/env", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@backend/env")>();
  return {
    ...actual,
    isSqlConfigured,
    isAzureConfigured: () => false,
    portalBackendName: () => "memory",
  };
});

vi.mock("@backend/sql/sql-store", () => ({
  listStaffUsers,
  createStaffUser,
  getStaffUserById,
  updateStaffUserAccess,
  listMembers,
  listVolunteers,
  listNewsletter,
}));

vi.mock("@backend/outreach/store", () => ({
  listOutreachCampaigns,
  createOutreachCampaign,
}));

function actor(role: AdminActor["adminRole"]): AdminActor {
  const flags = flagsForRole(role);
  return {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    email: "fuwad.oladega@ciucanada.ca",
    displayName: "Fuwad Oladega",
    role,
    adminRole: role,
    isActive: true,
    ...flags,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
}

function staff(overrides: Partial<StaffUserRecord> = {}): StaffUserRecord {
  return {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    email: "staff@ciucanada.ca",
    displayName: "Staff",
    role: "regularadmin",
    isActive: true,
    isOwner: false,
    canManageAdmins: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function jsonRequest(url: string, method: string, body?: Record<string, unknown>) {
  return new Request(url, {
    method,
    headers: { Authorization: "Bearer test", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
}

async function read(response: Response) {
  return { status: response.status, body: await response.json() };
}

const eventBody = {
  title: "Community Iftar",
  category: "community",
  date: "2026-09-19",
  startTime: "19:00",
  location: "CIU",
  description: "Join us",
  href: "/Events",
};

describe("admin HTTP handlers", () => {
  beforeEach(() => {
    announcements.clear();
    events.clear();
    contacts.length = 0;
    registrations.length = 0;
    history.length = 0;
    requireAdmin.mockReset().mockResolvedValue(null);
    recordHistory.mockReset().mockResolvedValue({ id: "h1" });
    requireAdminActor.mockReset().mockResolvedValue({ actor: actor("superadmin") });
    authenticateAdminRequest.mockReset().mockResolvedValue({ actor: actor("superadmin") });
    isSqlConfigured.mockReset().mockReturnValue(true);
    listStaffUsers.mockReset().mockResolvedValue([staff()]);
    createStaffUser.mockReset().mockResolvedValue(staff({ displayName: "New Staff" }));
    getStaffUserById.mockReset();
    updateStaffUserAccess.mockReset();
    listMembers.mockReset().mockResolvedValue([{ id: "m1" }]);
    listVolunteers.mockReset().mockResolvedValue([{ id: "v1" }, { id: "v2" }]);
    listNewsletter.mockReset().mockResolvedValue([]);
    listOutreachCampaigns.mockReset().mockResolvedValue([{ id: "o1" }]);
    createOutreachCampaign.mockReset().mockResolvedValue({ id: "o2", subject: "Draft" });
  });

  it("rejects unauthenticated admin reads", async () => {
    const { jsonError } = await import("@backend/http/respond");
    requireAdmin.mockResolvedValueOnce(jsonError("Invalid access token.", 401));
    const { GET } = await import("@backend/http/admin/announcements");
    expect((await read(await GET(jsonRequest("http://localhost/api/admin/announcements", "GET")))).status).toBe(401);
  });

  it("creates, updates, and deletes announcements", async () => {
    const list = await import("@backend/http/admin/announcements");
    const byId = await import("@backend/http/admin/announcements-id");

    const created = await read(
      await list.POST(jsonRequest("http://localhost/api/admin/announcements", "POST", { message: "Ticker", href: "/Events" }))
    );
    expect(created.status).toBe(201);
    expect(created.body.message).toBe("Ticker");

    const listed = await read(await list.GET(jsonRequest("http://localhost/api/admin/announcements", "GET")));
    expect(listed.body).toHaveLength(1);

    const updated = await read(
      await byId.PATCH(jsonRequest("http://localhost/api/admin/announcements/x", "PATCH", { active: false }), {
        params: Promise.resolve({ id: created.body.id }),
      })
    );
    expect(updated.body.active).toBe(false);

    const deleted = await read(
      await byId.DELETE(jsonRequest("http://localhost/api/admin/announcements/x", "DELETE"), {
        params: Promise.resolve({ id: created.body.id }),
      })
    );
    expect(deleted.body).toEqual({ ok: true });
    expect(await backend.listAnnouncements()).toEqual([]);
  });

  it("creates, updates, and deletes events", async () => {
    const list = await import("@backend/http/admin/events");
    const byId = await import("@backend/http/admin/events-id");

    const created = await read(await list.POST(jsonRequest("http://localhost/api/admin/events", "POST", eventBody)));
    expect(created.status).toBe(201);
    expect(created.body.dateLabel).toBe("Saturday, September 19, 2026");

    const updated = await read(
      await byId.PATCH(jsonRequest("http://localhost/api/admin/events/x", "PATCH", { title: "Updated Iftar" }), {
        params: Promise.resolve({ id: created.body.id }),
      })
    );
    expect(updated.body.title).toBe("Updated Iftar");

    const missing = await read(
      await byId.DELETE(jsonRequest("http://localhost/api/admin/events/x", "DELETE"), {
        params: Promise.resolve({ id: "missing" }),
      })
    );
    expect(missing.status).toBe(404);

    const deleted = await read(
      await byId.DELETE(jsonRequest("http://localhost/api/admin/events/x", "DELETE"), {
        params: Promise.resolve({ id: created.body.id }),
      })
    );
    expect(deleted.body).toEqual({ ok: true });
  });

  it("lists inbox tables and overview counts", async () => {
    contacts.push({ id: "c1" });
    registrations.push({ id: "r1", program: "quran" }, { id: "r2", program: "kids" });
    history.push({ id: "h1" });

    const contactsApi = await import("@backend/http/admin/contacts");
    const registrationsApi = await import("@backend/http/admin/registrations");
    const membersApi = await import("@backend/http/admin/members");
    const overviewApi = await import("@backend/http/admin/overview");

    expect((await read(await contactsApi.GET(jsonRequest("http://localhost/api/admin/contacts", "GET")))).body).toEqual([
      { id: "c1" },
    ]);
    expect((await read(await registrationsApi.GET(jsonRequest("http://localhost/api/admin/registrations", "GET")))).body).toHaveLength(
      2
    );
    expect((await read(await membersApi.GET(jsonRequest("http://localhost/api/admin/members", "GET")))).body).toEqual([
      { id: "m1" },
    ]);

    const overview = await read(await overviewApi.GET(jsonRequest("http://localhost/api/admin/overview", "GET")));
    expect(overview.body.counts).toMatchObject({
      contacts: 1,
      members: 1,
      volunteers: 2,
      newsletter: 0,
      outreach: 1,
      quranRegistrations: 1,
      kidsRegistrations: 1,
      history: 1,
    });
  });

  it("enforces user-management policy on create and update", async () => {
    const users = await import("@backend/http/admin/users");
    const usersId = await import("@backend/http/admin/users-id");

    requireAdminActor.mockResolvedValueOnce({ actor: actor("regularadmin") });
    const forbiddenList = await read(await users.GET(jsonRequest("http://localhost/api/admin/users", "GET")));
    expect(forbiddenList.status).toBe(403);

    const forbiddenCreate = await read(
      await users.POST(
        jsonRequest("http://localhost/api/admin/users", "POST", {
          displayName: "New",
          email: "new@ciucanada.ca",
          role: "superadmin",
        })
      )
    );
    expect(forbiddenCreate.status).toBe(403);
    expect(createStaffUser).not.toHaveBeenCalled();

    const created = await read(
      await users.POST(
        jsonRequest("http://localhost/api/admin/users", "POST", {
          displayName: "New Staff",
          email: "new@ciucanada.ca",
          role: "regularadmin",
        })
      )
    );
    expect(created.status).toBe(201);

    getStaffUserById.mockResolvedValueOnce(staff({ id: actor("superadmin").id, role: "superadmin" }));
    const selfDemote = await read(
      await usersId.PATCH(jsonRequest("http://localhost/api/admin/users/x", "PATCH", { role: "regularadmin" }), {
        params: Promise.resolve({ id: actor("superadmin").id }),
      })
    );
    expect(selfDemote.status).toBe(403);

    getStaffUserById.mockResolvedValueOnce(staff());
    updateStaffUserAccess.mockResolvedValueOnce(staff({ isActive: false }));
    const deactivated = await read(
      await usersId.PATCH(jsonRequest("http://localhost/api/admin/users/x", "PATCH", { isActive: false }), {
        params: Promise.resolve({ id: staff().id }),
      })
    );
    expect(deactivated.status).toBe(200);
    expect(deactivated.body.isActive).toBe(false);
  });

  it("blocks regular admins from creating outreach campaigns", async () => {
    const campaigns = await import("@backend/http/admin/outreach-campaigns");

    requireAdminActor.mockResolvedValueOnce({ actor: actor("regularadmin") });
    const blocked = await read(
      await campaigns.POST(
        jsonRequest("http://localhost/api/admin/outreach/campaigns", "POST", {
          type: "marketing",
          subject: "Class offer",
          content: "Body",
          audiences: ["quran", "kids"],
        })
      )
    );
    expect(blocked.status).toBe(403);
    expect(createOutreachCampaign).not.toHaveBeenCalled();

    requireAdminActor.mockResolvedValueOnce({ actor: actor("intermediateadmin") });
    const created = await read(
      await campaigns.POST(
        jsonRequest("http://localhost/api/admin/outreach/campaigns", "POST", {
          type: "marketing",
          subject: "Class offer",
          content: "Body",
          audiences: ["quran", "kids"],
        })
      )
    );
    expect(created.status).toBe(201);
    expect(createOutreachCampaign).toHaveBeenCalledWith(
      expect.objectContaining({ type: "marketing", audiences: ["quran", "kids"] })
    );
  });

  it("returns /api/me for an authenticated actor and 403 history for regularadmin", async () => {
    const me = await import("@backend/http/me");
    const profile = await read(await me.GET(jsonRequest("http://localhost/api/me", "GET")));
    expect(profile.status).toBe(200);
    expect(profile.body).toMatchObject({
      email: "fuwad.oladega@ciucanada.ca",
      role: "superadmin",
      canViewAdmins: true,
    });

    authenticateAdminRequest.mockResolvedValueOnce({ actor: actor("regularadmin") });
    const historyApi = await import("@backend/http/admin/history");
    const denied = await read(await historyApi.GET(jsonRequest("http://localhost/api/admin/history", "GET")));
    expect(denied.status).toBe(403);
  });
});
