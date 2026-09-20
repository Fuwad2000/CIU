import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CIU_INTERNAL_NOTIFICATION_TO } from "@/lib/email/form-mail";
import { setEmailTransportForTests } from "@/lib/email/send-mail";

const createContact = vi.fn();
const createRegistration = vi.fn();
const createMember = vi.fn();
const createVolunteer = vi.fn();
const createNewsletter = vi.fn();

vi.mock("@/lib/portal/backend", () => ({
  getPortalBackend: () => ({ createContact, createRegistration }),
}));

vi.mock("@/lib/portal/sql-store", () => {
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

const envKeys = ["AZURE_COMMUNICATION_SERVICES_ENDPOINT", "AZURE_EMAIL_SENDER", "SQL_SERVER", "SQL_DATABASE"] as const;
const previous = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));

function jsonRequest(url: string, body: Record<string, unknown>) {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("public form emails", () => {
  const sent: Array<{ to: string[]; purpose?: string; subject: string }> = [];

  beforeEach(() => {
    sent.length = 0;
    process.env.AZURE_COMMUNICATION_SERVICES_ENDPOINT = "https://ciu-acs-dev.canada.communication.azure.com";
    process.env.AZURE_EMAIL_SENDER = "donotreply@ciucanada.ca";
    process.env.SQL_SERVER = "ciu-sql-dev.database.windows.net";
    process.env.SQL_DATABASE = "ciu-db-dev";
    createContact.mockReset().mockResolvedValue({ id: "c1" });
    createRegistration.mockReset().mockResolvedValue({ id: "r1" });
    createMember.mockReset().mockResolvedValue({ id: "m1" });
    createVolunteer.mockReset().mockResolvedValue({ id: "v1" });
    createNewsletter.mockReset().mockResolvedValue({ id: "n1" });
    setEmailTransportForTests({
      async send(message) {
        sent.push({ to: message.to, purpose: message.purpose, subject: message.subject });
        return { messageId: "ok", status: "Succeeded" };
      },
    });
  });

  afterEach(() => {
    setEmailTransportForTests(undefined);
    for (const key of envKeys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  });

  it("emails info@ciucanada.ca and the contact submitter after a save", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const response = await POST(
      jsonRequest("http://localhost/api/contact", {
        firstName: "Amina",
        surname: "Hassan",
        email: "amina@example.com",
        phone: "4165550100",
        subject: "Hall booking",
        message: "Please call back.",
      })
    );

    expect(response.status).toBe(201);
    expect(createContact).toHaveBeenCalledOnce();
    expect(sent).toEqual([
      { to: [CIU_INTERNAL_NOTIFICATION_TO], purpose: "form-internal", subject: "New CIU contact message" },
      {
        to: ["amina@example.com"],
        purpose: "form-confirmation",
        subject: "We received your message — Canadian Islamic Union",
      },
    ]);
  });

  it("emails both inboxes after a membership save", async () => {
    const { POST } = await import("@/app/api/members/route");
    const response = await POST(
      jsonRequest("http://localhost/api/members", {
        fullName: "Omar Ali",
        email: "omar@example.com",
        membershipType: "individual",
        agreement: true,
      })
    );

    expect(response.status).toBe(201);
    expect(sent.map((item) => item.to)).toEqual([[CIU_INTERNAL_NOTIFICATION_TO], ["omar@example.com"]]);
    expect(sent[0]?.subject).toBe("New CIU membership registration");
  });

  it("does not email when a membership email is already stored", async () => {
    const { DuplicateEmailError } = await import("@/lib/portal/sql-store");
    createMember.mockRejectedValueOnce(new DuplicateEmailError());
    const { POST } = await import("@/app/api/members/route");
    const response = await POST(
      jsonRequest("http://localhost/api/members", {
        fullName: "Omar Ali",
        email: "omar@example.com",
        membershipType: "individual",
        agreement: true,
      })
    );

    expect(response.status).toBe(409);
    expect(sent).toEqual([]);
  });

  it("emails both inboxes after a volunteer save", async () => {
    const { POST } = await import("@/app/api/volunteers/route");
    const response = await POST(
      jsonRequest("http://localhost/api/volunteers", {
        fullName: "Sara Khan",
        email: "sara@example.com",
        phone: "4165550101",
        ageGroup: "adult",
        availability: "weekends",
        roles: ["events"],
        agreement: true,
      })
    );

    expect(response.status).toBe(201);
    expect(sent.map((item) => item.to)).toEqual([[CIU_INTERNAL_NOTIFICATION_TO], ["sara@example.com"]]);
    expect(sent[0]?.subject).toBe("New CIU volunteer registration");
  });

  it("emails both inboxes after a newsletter save", async () => {
    const { POST } = await import("@/app/api/newsletter/route");
    const response = await POST(
      jsonRequest("http://localhost/api/newsletter", {
        fullName: "Yusuf",
        email: "yusuf@example.com",
        source: "events",
        agreement: true,
      })
    );

    expect(response.status).toBe(201);
    expect(sent.map((item) => item.to)).toEqual([[CIU_INTERNAL_NOTIFICATION_TO], ["yusuf@example.com"]]);
    expect(sent[0]?.subject).toBe("New CIU newsletter sign-up");
  });

  it("emails both inboxes after a kids registration save", async () => {
    const { POST } = await import("@/app/api/registrations/route");
    const response = await POST(
      jsonRequest("http://localhost/api/registrations", {
        program: "kids",
        studentName: "Zayd",
        studentAge: "7–8",
        grade: "2",
        parentName: "Fatima",
        email: "fatima@example.com",
        phone: "4165550102",
      })
    );

    expect(response.status).toBe(201);
    expect(sent.map((item) => item.to)).toEqual([[CIU_INTERNAL_NOTIFICATION_TO], ["fatima@example.com"]]);
    expect(sent[0]?.subject).toBe("New CIU kids program registration");
  });

  it("still returns 201 if ACS fails after the form is saved", async () => {
    setEmailTransportForTests({
      async send() {
        throw new Error("ACS down");
      },
    });
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { POST } = await import("@/app/api/contact/route");
    const response = await POST(
      jsonRequest("http://localhost/api/contact", {
        firstName: "Amina",
        surname: "Hassan",
        email: "amina@example.com",
        phone: "4165550100",
        subject: "Hall booking",
        message: "Please call back.",
      })
    );

    expect(response.status).toBe(201);
    expect(createContact).toHaveBeenCalledOnce();
    expect(logged).toHaveBeenCalled();
    logged.mockRestore();
  });
});
