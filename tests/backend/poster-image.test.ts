import { describe, expect, it } from "vitest";
import { parsePosterImage } from "@shared/poster-image";

describe("parsePosterImage", () => {
  it("accepts a small JPEG and rejects missing or oversized files", () => {
    expect(parsePosterImage(undefined)).toBeUndefined();
    expect(
      parsePosterImage({
        name: "picnic.jpg",
        contentType: "image/jpeg",
        contentInBase64: "eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eA==",
      })
    ).toEqual({
      name: "picnic.jpg",
      contentType: "image/jpeg",
      contentInBase64: "eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eA==",
    });
    expect(parsePosterImage({ name: "notes.pdf", contentType: "application/pdf", contentInBase64: "aaaa" })).toBe(
      "Choose a JPEG, PNG, WebP, or GIF poster."
    );
    expect(
      parsePosterImage({
        name: "huge.jpg",
        contentType: "image/jpeg",
        contentInBase64: "A".repeat(2_100_000),
      })
    ).toBe("The poster must be 1.5 MB or smaller.");
  });
});
