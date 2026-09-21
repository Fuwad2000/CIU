import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const createContact = vi.fn();
const createRegistration = vi.fn();
const createMember = vi.fn();
const createVolunteer = vi.fn();
const createNewsletter = vi.fn();
const listAnnouncements = vi.fn();
const listEvents = vi.fn();
const rememberContactPerson = vi.fn();

vi.mock("@backend/stores/backend", () => ({
  getPortalBackend: () => ({
    createContact,
    createRegistration,
    listAnnouncements,
    listEvents,
  }),
}));

vi.mock("@backend/outreach/additional", () => ({
  rememberContactPerson: (...args: unknown[]) => rememberContactPerson(...args),
}));

vi.mock("@backend/sql/sql-store", () => {
  class DuplicateEmailError extends Error {
    constructor(message = "This email is already on the list.") {
      super(message);
      this.name = "DuplicateEmailError";
    }
  }
  return {
    DuplicateEmailError,
    createMember,
    createVolunteer,
    createNewsletter,
  };
});

vi.mock("@email/form-mail", () => ({
  formatFormDetails: () => "details",
  sendFormSubmissionEmails: vi.fn(async () => undefined),
}));

const envKeys = ["SQL_SERVER", "SQL_DATABASE"] as const;
const previous = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));

function jsonRequest(url: string, body: Record<string, unknown>) {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function bodyOf(response: Response) {
  return { status: response.status, body: await response.json() };
}

describe("public form validation", () => {
  beforeEach(() => {
    createContact.mockReset();
    createRegistration.mockReset();
    createMember.mockReset();
    createVolunteer.mockReset();
    createNewsletter.mockReset();
    rememberContactPerson.mockReset().mockResolvedValue(true);
    delete process.env.SQL_SERVER;
    delete process.env.SQL_DATABASE;
  });

  afterEach(() => {
    for (const key of envKeys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  });

  it("rejects an incomplete contact message before save", async () => {
    const { POST } = await import("@backend/http/contact");
    const result = await bodyOf(await POST(jsonRequest("http://localhost/api/contact", { firstName: "Amina" })));
    expect(result.status).toBe(400);
    expect(result.body.error).toMatch(/required/i);
    expect(createContact).not.toHaveBeenCalled();
  });

  it("saves every contact message and remembers the sender once in additional people", async () => {
    process.env.SQL_SERVER = "ciu-sql-dev.database.windows.net";
    process.env.SQL_DATABASE = "ciu-db-dev";
    createContact.mockResolvedValue({ id: "c1" });
    const { POST } = await import("@backend/http/contact");
    const payload = {
      firstName: "Amina",
      surname: "Hassan",
      email: "amina@example.com",
      phone: "4165550100",
      subject: "Hall booking",
      message: "Please call back.",
    };

    const first = await bodyOf(await POST(jsonRequest("http://localhost/api/contact", payload)));
    const second = await bodyOf(
      await POST(jsonRequest("http://localhost/api/contact", { ...payload, message: "Following up." }))
    );

    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(createContact).toHaveBeenCalledTimes(2);
    expect(rememberContactPerson).toHaveBeenCalledTimes(2);
    expect(rememberContactPerson).toHaveBeenCalledWith({
      fullName: "Amina Hassan",
      email: "amina@example.com",
      phone: "4165550100",
    });
  });

  it("still saves the contact message if additional people cannot be updated", async () => {
    process.env.SQL_SERVER = "ciu-sql-dev.database.windows.net";
    process.env.SQL_DATABASE = "ciu-db-dev";
    createContact.mockResolvedValue({ id: "c1" });
    rememberContactPerson.mockRejectedValueOnce(new Error("SQL unavailable"));
    const { POST } = await import("@backend/http/contact");
    const result = await bodyOf(
      await POST(
        jsonRequest("http://localhost/api/contact", {
          firstName: "Amina",
          surname: "Hassan",
          email: "amina@example.com",
          phone: "4165550100",
          subject: "Hall booking",
          message: "Please call back.",
        })
      )
    );
    expect(result.status).toBe(201);
    expect(createContact).toHaveBeenCalledOnce();
  });

  it("rejects a kids registration with a free-text age", async () => {
    const { POST } = await import("@backend/http/registrations");
    const result = await bodyOf(
      await POST(
        jsonRequest("http://localhost/api/registrations", {
          program: "kids",
          studentName: "Zayd",
          studentAge: "8 years",
          grade: "2",
          parentName: "Fatima",
          email: "fatima@example.com",
          phone: "4165550102",
        })
      )
    );
    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Choose a student age range.");
    expect(createRegistration).not.toHaveBeenCalled();
  });

  it("rejects a quran registration without contact details", async () => {
    const { POST } = await import("@backend/http/registrations");
    const result = await bodyOf(
      await POST(jsonRequest("http://localhost/api/registrations", { program: "quran", studentName: "Zayd" }))
    );
    expect(result.status).toBe(400);
    expect(createRegistration).not.toHaveBeenCalled();
  });

  it("returns 503 for membership when SQL is not configured", async () => {
    const { POST } = await import("@backend/http/members");
    const result = await bodyOf(
      await POST(
        jsonRequest("http://localhost/api/members", {
          fullName: "Omar Ali",
          email: "omar@example.com",
          membershipType: "individual",
          agreement: true,
        })
      )
    );
    expect(result.status).toBe(503);
    expect(createMember).not.toHaveBeenCalled();
  });

  it("rejects membership without agreement when SQL is configured", async () => {
    process.env.SQL_SERVER = "ciu-sql-dev.database.windows.net";
    process.env.SQL_DATABASE = "ciu-db-dev";
    const { POST } = await import("@backend/http/members");
    const result = await bodyOf(
      await POST(
        jsonRequest("http://localhost/api/members", {
          fullName: "Omar Ali",
          email: "omar@example.com",
          membershipType: "individual",
        })
      )
    );
    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Agreement is required.");
    expect(createMember).not.toHaveBeenCalled();
  });

  it("rejects volunteer and newsletter payloads that fail field rules", async () => {
    process.env.SQL_SERVER = "ciu-sql-dev.database.windows.net";
    process.env.SQL_DATABASE = "ciu-db-dev";
    const volunteers = await import("@backend/http/volunteers");
    const newsletter = await import("@backend/http/newsletter");

    expect(
      (await bodyOf(await volunteers.POST(jsonRequest("http://localhost/api/volunteers", { fullName: "Sara" })))).status
    ).toBe(400);
    expect(
      (
        await bodyOf(
          await volunteers.POST(
            jsonRequest("http://localhost/api/volunteers", {
              fullName: "Sara Khan",
              email: "sara@example.com",
              phone: "4165550101",
              ageGroup: "adult",
              availability: "weekends",
              roles: ["events"],
            })
          )
        )
      ).body.error
    ).toBe("Agreement is required.");

    expect(
      (await bodyOf(await newsletter.POST(jsonRequest("http://localhost/api/newsletter", { email: "a@b.com" })))).status
    ).toBe(400);
    expect(createVolunteer).not.toHaveBeenCalled();
    expect(createNewsletter).not.toHaveBeenCalled();
  });
});

describe("public list endpoints", () => {
  beforeEach(() => {
    listAnnouncements.mockReset().mockResolvedValue([
      { id: "a1", message: "Live", active: true },
      { id: "a2", message: "Hidden", active: false },
    ]);
    listEvents.mockReset().mockResolvedValue([{ id: "e1", title: "Iftar" }]);
  });

  it("returns only active announcements", async () => {
    const { GET } = await import("@backend/http/announcements");
    const result = await bodyOf(await GET());
    expect(result.status).toBe(200);
    expect(result.body).toEqual([{ id: "a1", message: "Live", active: true }]);
  });

  it("returns the public events list", async () => {
    const { GET } = await import("@backend/http/events");
    const result = await bodyOf(await GET());
    expect(result.status).toBe(200);
    expect(result.body).toEqual([{ id: "e1", title: "Iftar" }]);
  });
});
