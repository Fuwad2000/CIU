import { getPortalBackend } from "@/lib/portal/backend";
import { jsonError, jsonOk, readString, recordHistory, requireAdmin } from "@/lib/portal/http";
import type { PortalEventCategory, PortalEventInput } from "@/lib/portal/types";

export const dynamic = "force-dynamic";

const categories = new Set<PortalEventCategory>([
  "education",
  "youth",
  "family",
  "community",
  "spiritual",
  "volunteer",
]);

function parseEventInput(body: Record<string, unknown>): PortalEventInput | string {
  const title = readString(body.title);
  const category = readString(body.category) as PortalEventCategory;
  const dateLabel = readString(body.dateLabel);
  const time = readString(body.time);
  const location = readString(body.location);
  const description = readString(body.description);
  const href = readString(body.href);
  if (!title || !dateLabel || !time || !location || !description || !href) {
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
    dateLabel,
    date: readString(body.date) || undefined,
    time,
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

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  return jsonOk(await getPortalBackend().listEvents());
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const parsed = parseEventInput(body);
  if (typeof parsed === "string") return jsonError(parsed);
  const record = await getPortalBackend().createEvent(parsed);
  await recordHistory(request, {
    action: "created",
    area: "events",
    summary: `Added event: ${record.title}`,
    entityId: record.id,
  });
  return jsonOk(record, 201);
}
