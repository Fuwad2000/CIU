import { afterEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/admin/email/test/route";
import { denyEmailTest, handleEmailTest } from "@/lib/email/email-test";
import { setEmailTransportForTests } from "@/lib/email/send-mail";

const envKeys = ["AZURE_COMMUNICATION_SERVICES_ENDPOINT", "AZURE_EMAIL_SENDER"] as const;
const previous = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));

function setEmailEnv() {
  process.env.AZURE_COMMUNICATION_SERVICES_ENDPOINT = "https://ciu-acs-dev.canada.communication.azure.com";
  process.env.AZURE_EMAIL_SENDER = "donotreply@ciucanada.ca";
}

afterEach(() => {
  setEmailTransportForTests(undefined);
  for (const key of envKeys) {
    if (previous[key] === undefined) delete process.env[key];
    else process.env[key] = previous[key];
  }
});

describe("email test authorization", () => {
  it("rejects an unauthenticated request", async () => {
    const response = await POST(
      new Request("http://localhost/api/admin/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: "person@example.com", subject: "Test", html: "<p>Hi</p>" }),
      })
    );
    expect(response.status).toBe(401);
  });

  it("rejects regularadmin", () => {
    expect(denyEmailTest("regularadmin")).toMatch(/do not have permission/i);
  });

  it("rejects intermediateadmin", () => {
    expect(denyEmailTest("intermediateadmin")).toMatch(/do not have permission/i);
  });

  it("allows superadmin", () => {
    expect(denyEmailTest("superadmin")).toBeNull();
  });
});

describe("email test handler", () => {
  it("returns a safe response when ACS fails", async () => {
    setEmailEnv();
    setEmailTransportForTests({
      async send() {
        throw new Error("ACS token xyz");
      },
    });

    const result = await handleEmailTest("superadmin", {
      to: "person@example.com",
      subject: "Test",
      html: "<p>Hello</p>",
    });
    expect(result).toEqual({ status: 502, error: "The test email could not be sent." });
  });

  it("returns success details when ACS accepts the message", async () => {
    setEmailEnv();
    setEmailTransportForTests({
      async send(message) {
        expect(message.senderAddress).toBe("donotreply@ciucanada.ca");
        expect(message.to).toEqual(["person@example.com"]);
        return { messageId: "msg-99", status: "Succeeded" };
      },
    });

    const result = await handleEmailTest("superadmin", {
      to: "person@example.com",
      subject: "CIU test",
      html: "<p>Hello from CIU</p>",
    });
    expect(result).toEqual({
      status: 200,
      data: { sent: true, messageId: "msg-99", status: "Succeeded" },
    });
  });

  it("does not accept a client-supplied sender", async () => {
    const result = await handleEmailTest("superadmin", {
      to: "person@example.com",
      subject: "CIU test",
      html: "<p>Hello</p>",
      senderAddress: "attacker@example.com",
    });
    expect(result.status).toBe(400);
  });
});
