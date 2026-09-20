import { afterEach, describe, expect, it } from "vitest";
import { EmailConfigError, EmailValidationError } from "@/lib/email/errors";
import { sendMail, setEmailTransportForTests } from "@/lib/email/send-mail";

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
      sendMail({ to: "person@example.com", subject: "Hello", html: "<p>Hello</p>", purpose: "admin-test" })
    ).resolves.toEqual({ messageId: "acs-message-1", status: "Succeeded" });
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
