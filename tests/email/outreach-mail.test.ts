import { describe, expect, it, vi } from "vitest";
import { outreachEmailHtml, outreachEmailText, outreachGreetingName } from "@email/outreach-mail";

vi.mock("@email/send-mail", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@email/send-mail")>();
  return {
    ...actual,
    sendMail: vi.fn(),
  };
});

describe("outreach email copy", () => {
  it("uses the first name and keeps the campaign body", () => {
    expect(outreachGreetingName("Fatima Hassan")).toBe("Fatima");
    expect(outreachGreetingName("")).toBe("there");
    expect(outreachEmailText({ displayName: "Omar Ali", content: "Jummah is at 1:15 PM.\nBring a friend." })).toContain(
      "Assalamu Alaikum Omar,"
    );
    expect(outreachEmailText({ displayName: "Omar Ali", content: "Jummah is at 1:15 PM.\nBring a friend." })).toContain(
      "Bring a friend."
    );
  });

  it("renders the CIU template and escapes campaign HTML", () => {
    const html = outreachEmailHtml({
      displayName: "Amina",
      subject: "Community picnic",
      content: "Join us Saturday.\n<script>alert(1)</script>",
      type: "event",
    });
    expect(html).toContain("Community picnic");
    expect(html).toContain("Assalamu Alaikum Amina,");
    expect(html).toContain("Event");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).not.toContain("<script>alert(1)</script>");
  });

  it("embeds an optional poster when one is attached for this send", () => {
    const html = outreachEmailHtml({
      displayName: "Amina",
      subject: "Community picnic",
      content: "Join us Saturday.",
      type: "event",
      poster: {
        name: "picnic.jpg",
        contentType: "image/jpeg",
        contentInBase64: "aGVsbG8=",
      },
    });
    expect(html).toContain("cid:ciu-poster");
    expect(html).toContain("picnic.jpg");
  });
});
