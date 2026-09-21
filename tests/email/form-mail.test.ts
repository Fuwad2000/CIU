import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CIU_INTERNAL_NOTIFICATION_TO,
  formatFormDetails,
  sendFormSubmissionEmails,
} from "@email/form-mail";
import { setEmailTransportForTests } from "@email/send-mail";

const envKeys = ["AZURE_COMMUNICATION_SERVICES_ENDPOINT", "AZURE_EMAIL_SENDER"] as const;
const previous = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));

afterEach(() => {
  setEmailTransportForTests(undefined);
  vi.restoreAllMocks();
  for (const key of envKeys) {
    if (previous[key] === undefined) delete process.env[key];
    else process.env[key] = previous[key];
  }
});

describe("form details", () => {
  it("skips empty fields and joins list values", () => {
    expect(
      formatFormDetails({
        Name: "Amina",
        Phone: "",
        Topics: ["events", "youth"],
        Notes: undefined,
      })
    ).toBe("Name: Amina\nTopics: events, youth");
  });
});

describe("form submission emails", () => {
  it("notifies the server-controlled CIU inbox and confirms the submitter", async () => {
    process.env.AZURE_COMMUNICATION_SERVICES_ENDPOINT = "https://ciu-acs-dev.canada.communication.azure.com";
    process.env.AZURE_EMAIL_SENDER = "donotreply@ciucanada.ca";

    const sent: Array<{ to: string[]; purpose?: string; html?: string; subject: string }> = [];
    setEmailTransportForTests({
      async send(message) {
        sent.push({
          to: message.to,
          purpose: message.purpose,
          html: message.html,
          subject: message.subject,
        });
        return { messageId: "ok", status: "Succeeded" };
      },
    });

    await sendFormSubmissionEmails({
      form: "contact",
      submitterName: "Amina <script>",
      submitterEmail: "amina@example.com",
      internalDetails: "Subject: Hall booking",
    });

    expect(sent.map((item) => ({ to: item.to, purpose: item.purpose }))).toEqual([
      { to: [CIU_INTERNAL_NOTIFICATION_TO], purpose: "form-internal" },
      { to: ["amina@example.com"], purpose: "form-confirmation" },
    ]);
    expect(CIU_INTERNAL_NOTIFICATION_TO).toBe("info@ciucanada.ca");
    expect(sent[0]?.html).toContain("cid:ciu-logo");
    expect(sent[0]?.html).toContain("Hall booking");
    expect(sent[0]?.html).toContain("New contact message");
    expect(sent[1]?.html).toContain("cid:ciu-logo");
    expect(sent[1]?.html).toContain("Assalamu Alaikum Amina");
    expect(sent[1]?.html).not.toContain("<script>");
    expect(sent[1]?.subject).toBe("We received your message — Canadian Islamic Union");
  });

  it("does not throw if confirmation delivery fails after a saved submission", async () => {
    process.env.AZURE_COMMUNICATION_SERVICES_ENDPOINT = "https://ciu-acs-dev.canada.communication.azure.com";
    process.env.AZURE_EMAIL_SENDER = "donotreply@ciucanada.ca";
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);

    setEmailTransportForTests({
      async send(message) {
        if (message.purpose === "form-confirmation") throw new Error("ACS down");
        return { messageId: "ok", status: "Succeeded" };
      },
    });

    await expect(
      sendFormSubmissionEmails({
        form: "membership",
        submitterName: "Omar",
        submitterEmail: "omar@example.com",
        internalDetails: "Type: individual",
      })
    ).resolves.toBeUndefined();
    expect(logged).toHaveBeenCalled();
  });
});
