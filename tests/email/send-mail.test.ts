import { afterEach, describe, expect, it } from "vitest";
import { EmailConfigError, EmailValidationError } from "@email/errors";
import { sendMail, setEmailTransportForTests } from "@email/send-mail";

const envKeys = ["AZURE_COMMUNICATION_SERVICES_ENDPOINT", "AZURE_EMAIL_SENDER"] as const;
const previous = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));

function setEmailEnv(values: { endpoint?: string; sender?: string }) {
  if (values.endpoint === undefined) delete process.env.AZURE_COMMUNICATION_SERVICES_ENDPOINT;
  else process.env.AZURE_COMMUNICATION_SERVICES_ENDPOINT = values.endpoint;
  if (values.sender === undefined) delete process.env.AZURE_EMAIL_SENDER;
  else process.env.AZURE_EMAIL_SENDER = values.sender;
}

afterEach(() => {
  setEmailTransportForTests(undefined);
  for (const key of envKeys) {
    if (previous[key] === undefined) delete process.env[key];
    else process.env[key] = previous[key];
  }
});

describe("sendMail configuration", () => {
  it("fails clearly when the ACS endpoint is missing", async () => {
    setEmailEnv({ sender: "donotreply@ciucanada.ca" });
    await expect(
      sendMail({ to: "person@example.com", subject: "Hello", text: "Body" })
    ).rejects.toBeInstanceOf(EmailConfigError);
    await expect(
      sendMail({ to: "person@example.com", subject: "Hello", text: "Body" })
    ).rejects.toThrow(/AZURE_COMMUNICATION_SERVICES_ENDPOINT/);
  });

  it("fails clearly when the sender is missing", async () => {
    setEmailEnv({ endpoint: "https://ciu-acs-dev.canada.communication.azure.com" });
    await expect(
      sendMail({ to: "person@example.com", subject: "Hello", text: "Body" })
    ).rejects.toBeInstanceOf(EmailConfigError);
    await expect(
      sendMail({ to: "person@example.com", subject: "Hello", text: "Body" })
    ).rejects.toThrow(/AZURE_EMAIL_SENDER/);
  });

  it("rejects an invalid recipient", async () => {
    setEmailEnv({
      endpoint: "https://ciu-acs-dev.canada.communication.azure.com",
      sender: "donotreply@ciucanada.ca",
    });
    await expect(
      sendMail({ to: "not-an-email", subject: "Hello", text: "Body" })
    ).rejects.toBeInstanceOf(EmailValidationError);
  });
});

describe("sendMail delivery", () => {
  it("returns ACS message information on success", async () => {
    setEmailEnv({
      endpoint: "https://ciu-acs-dev.canada.communication.azure.com",
      sender: "donotreply@ciucanada.ca",
    });
    setEmailTransportForTests({
      async send() {
        return { messageId: "acs-message-1", status: "Succeeded" };
      },
    });

    await expect(
      sendMail({ to: "person@example.com", subject: "Hello", html: "<p>Hello</p>", purpose: "form-internal" })
    ).resolves.toEqual({ messageId: "acs-message-1", status: "Succeeded" });
  });

  it("embeds the CIU logo as an inline attachment for Outlook inboxes", async () => {
    setEmailEnv({
      endpoint: "https://ciu-acs-dev.canada.communication.azure.com",
      sender: "donotreply@ciucanada.ca",
    });
    let captured:
      | {
          attachments?: Array<{ contentId?: string; name: string; contentType: string; contentInBase64: string }>;
        }
      | undefined;
    setEmailTransportForTests({
      async send(message) {
        captured = { attachments: message.attachments };
        return { messageId: "acs-message-2", status: "Succeeded" };
      },
    });

    await sendMail({
      to: "info@ciucanada.ca",
      subject: "New CIU volunteer registration",
      html: '<img src="cid:ciu-logo" alt="Canadian Islamic Union logo" />',
      purpose: "form-internal",
    });

    expect(captured?.attachments).toEqual([
      expect.objectContaining({ name: "ciu-logo.png", contentId: "ciu-logo", contentType: "image/png" }),
    ]);
    expect(captured?.attachments?.[0]?.contentInBase64?.length).toBeGreaterThan(100);
  });

  it("can attach an optional campaign poster next to the logo", async () => {
    setEmailEnv({
      endpoint: "https://ciu-acs-dev.canada.communication.azure.com",
      sender: "donotreply@ciucanada.ca",
    });
    let captured:
      | {
          attachments?: Array<{ contentId?: string; name: string }>;
        }
      | undefined;
    setEmailTransportForTests({
      async send(message) {
        captured = { attachments: message.attachments };
        return { messageId: "acs-message-3", status: "Succeeded" };
      },
    });

    await sendMail({
      to: "person@example.com",
      subject: "Picnic",
      html: '<img src="cid:ciu-logo" alt="logo" /><img src="cid:ciu-poster" alt="poster" />',
      attachments: [
        {
          name: "picnic.jpg",
          contentType: "image/jpeg",
          contentInBase64: "aGVsbG8=",
          contentId: "ciu-poster",
        },
      ],
    });

    expect(captured?.attachments?.map((item) => item.contentId)).toEqual(["ciu-logo", "ciu-poster"]);
  });

  it("hides ACS failure details from the caller", async () => {
    setEmailEnv({
      endpoint: "https://ciu-acs-dev.canada.communication.azure.com",
      sender: "donotreply@ciucanada.ca",
    });
    setEmailTransportForTests({
      async send() {
        throw new Error("Authorization header leaked");
      },
    });

    await expect(
      sendMail({ to: "person@example.com", subject: "Hello", text: "Body" })
    ).rejects.toThrow("The email could not be sent.");
  });
});
