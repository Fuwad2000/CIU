import { buildEventSchedule, toTimeInputValue } from "@/lib/portal/event-datetime";
import { readString } from "@/lib/portal/http";
import type { PortalEventCategory, PortalEventInput } from "@/lib/portal/types";

const categories = new Set<PortalEventCategory>([
  "education",
  "youth",
  "family",
  "community",
  "spiritual",
  "volunteer",
]);

export function parseEventInput(body: Record<string, unknown>): PortalEventInput | string {
  const title = readString(body.title);
  const category = readString(body.category) as PortalEventCategory;
  const date = readString(body.date);
  const startTime = readString(body.startTime) || toTimeInputValue(readString(body.time).split(/\s*[–-]\s*/)[0] ?? "");
  const location = readString(body.location);
  const description = readString(body.description);
  const href = readString(body.href);
  const schedule = buildEventSchedule(date, startTime);
  if ("error" in schedule) return schedule.error;
  if (!title || !location || !description || !href) {
    return "Title, date, time, location, description, and link are required.";
  }
  if (!categories.has(category)) {
    return "Choose a valid event category.";
  }
  const tags = Array.isArray(body.tags)
    ? body.tags.map((tag) => readString(tag)).filter(Boolean)
    : readString(body.tags)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

  return {
    title,
    category,
    dateLabel: schedule.dateLabel,
    date: schedule.date,
    time: schedule.time,
    location,
    description,
    tags,
    href,
    buttonLabel: readString(body.buttonLabel) || "View Details",
    image: readString(body.image) || undefined,
    recurring: Boolean(body.recurring),
    featured: Boolean(body.featured),
  };
}
