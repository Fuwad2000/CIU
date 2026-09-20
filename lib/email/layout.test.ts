import { describe, expect, it } from "vitest";
import { detailsFromText, escapeHtml, renderCiuEmail } from "@/lib/email/layout";

describe("email layout", () => {
  it("renders a webpage-style CIU message with the hosted logo", () => {
    const html = renderCiuEmail({
      eyebrow: "Contact",
      title: "We received your message",
      greeting: "Assalamu Alaikum Amina,",
      paragraphs: ["Thank you for contacting the Canadian Islamic Union."],
      details: [{ label: "Subject", value: "Hall booking" }],
      cta: { href: "https://example.com/", label: "Visit the CIU website" },
    });

    expect(html).toContain("Canadian Islamic Union");
    expect(html).toContain("The One Big Family");
    expect(html).toContain("logo_voqavb.png");
    expect(html).toContain("Assalamu Alaikum Amina,");
    expect(html).toContain("Hall booking");
    expect(html).toContain("Visit the CIU website");
    expect(html).toContain("info@ciucanada.ca");
  });

  it("escapes user-provided HTML", () => {
    expect(escapeHtml(`Amina <img src=x onerror=alert(1)>`)).toBe(
      "Amina &lt;img src=x onerror=alert(1)&gt;"
    );
    expect(detailsFromText("Subject: Hall booking\n\nPlease call")).toEqual([
      { label: "Subject", value: "Hall booking" },
      { label: "Note", value: "Please call" },
    ]);
  });
});
