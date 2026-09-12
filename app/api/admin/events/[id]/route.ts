import { getPortalBackend } from "@/lib/portal/backend";
import { jsonError, jsonOk, recordHistory, requireAdmin } from "@/lib/portal/http";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const current = (await getPortalBackend().listEvents()).find((item) => item.id === id);
  if (!current) return jsonError("Event not found.", 404);

  const updated = await getPortalBackend().updateEvent(id, {
    title: typeof body.title === "string" ? body.title : current.title,
    category: typeof body.category === "string" ? (body.category as typeof current.category) : current.category,
    dateLabel: typeof body.dateLabel === "string" ? body.dateLabel : current.dateLabel,
    date: typeof body.date === "string" ? body.date : current.date,
    time: typeof body.time === "string" ? body.time : current.time,
    location: typeof body.location === "string" ? body.location : current.location,
    description: typeof body.description === "string" ? body.description : current.description,
    tags: Array.isArray(body.tags)
      ? body.tags.map(String)
      : typeof body.tags === "string"
        ? body.tags.split(",").map((tag) => tag.trim())
        : current.tags,
    href: typeof body.href === "string" ? body.href : current.href,
    buttonLabel: typeof body.buttonLabel === "string" ? body.buttonLabel : current.buttonLabel,
    image: typeof body.image === "string" ? body.image : current.image,
    recurring: typeof body.recurring === "boolean" ? body.recurring : current.recurring,
    featured: typeof body.featured === "boolean" ? body.featured : current.featured,
  });
  if (!updated) return jsonError("Event not found.", 404);
  await recordHistory(request, {
    action: "updated",
    area: "events",
    summary: `Updated event: ${updated.title}`,
    entityId: updated.id,
  });
  return jsonOk(updated);
}

export async function DELETE(request: Request, { params }: Params) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const current = (await getPortalBackend().listEvents()).find((item) => item.id === id);
  const deleted = await getPortalBackend().deleteEvent(id);
  if (!deleted) return jsonError("Event not found.", 404);
  await recordHistory(request, {
    action: "deleted",
    area: "events",
    summary: `Deleted event: ${current?.title ?? id}`,
    entityId: id,
  });
  return jsonOk({ ok: true });
}
