import { describe, expect, it } from "vitest";
import { parseEventInput } from "@backend/http/event-input";
import {
  buildEventSchedule,
  formatEventDateLabel,
  fromTimeInputValue,
  toTimeInputValue,
} from "@shared/event-datetime";

const validBody = {
  title: "Community Iftar",
  category: "community",
  date: "2026-09-19",
  startTime: "19:00",
  location: "CIU",
  description: "Join us",
  href: "/Events",
  tags: ["family", ""],
};

describe("event datetime helpers", () => {
  it("formats a picker date into the public date label", () => {
    expect(formatEventDateLabel("2026-09-19")).toBe("Saturday, September 19, 2026");
    expect(formatEventDateLabel("not-a-date")).toBe("");
  });

  it("converts 12-hour labels to 24-hour inputs and back", () => {
    expect(toTimeInputValue("7:00 PM")).toBe("19:00");
    expect(toTimeInputValue("12:05 AM")).toBe("00:05");
    expect(fromTimeInputValue("19:00")).toBe("7:00 PM");
  });

  it("rejects an invalid date or start time", () => {
    expect(buildEventSchedule("bad", "19:00")).toEqual({ error: "Choose a valid date." });
    expect(buildEventSchedule("2026-09-19", "nope")).toEqual({ error: "Choose a valid start time." });
  });
});

describe("parseEventInput", () => {
  it("builds a stored event and derives the date label", () => {
    expect(parseEventInput(validBody)).toEqual({
      title: "Community Iftar",
      category: "community",
      dateLabel: "Saturday, September 19, 2026",
      date: "2026-09-19",
      time: "7:00 PM",
      location: "CIU",
      description: "Join us",
      tags: ["family"],
      href: "/Events",
      buttonLabel: "View Details",
      image: undefined,
      recurring: false,
      featured: false,
    });
  });

  it("accepts a comma-separated tag string and a 12-hour time field", () => {
    const parsed = parseEventInput({
      ...validBody,
      startTime: "",
      time: "7:30 PM",
      tags: "youth, education",
      featured: true,
    });
    expect(parsed).toMatchObject({
      time: "7:30 PM",
      tags: ["youth", "education"],
      featured: true,
    });
  });

  it("rejects missing fields and unknown categories", () => {
    expect(parseEventInput({ ...validBody, title: "" })).toBe(
      "Title, date, time, location, description, and link are required."
    );
    expect(parseEventInput({ ...validBody, category: "party" })).toBe("Choose a valid event category.");
  });

  it("keeps an existing image URL and drops a device data URL until blob storage is ready", () => {
    expect(parseEventInput({ ...validBody, image: "https://res.cloudinary.com/ciu/poster.jpg" })).toMatchObject({
      image: "https://res.cloudinary.com/ciu/poster.jpg",
    });
    expect(parseEventInput({ ...validBody, image: "data:image/png;base64,aaaa" })).toMatchObject({
      image: undefined,
    });
  });
});
