import { getPortalBackend } from "@/lib/portal/backend";
import { parseEventInput } from "@/lib/portal/event-input";
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

  const parsed = parseEventInput({
    title: body.title ?? current.title,
    category: body.category ?? current.category,
    date: body.date ?? current.date ?? "",
    startTime: body.startTime,
    time: body.time ?? current.time,
    location: body.location ?? current.location,
    description: body.description ?? current.description,
    tags: body.tags ?? current.tags,
    href: body.href ?? current.href,
    buttonLabel: body.buttonLabel ?? current.buttonLabel,
    image: body.image ?? current.image,
    recurring: body.recurring ?? current.recurring,
    featured: body.featured ?? current.featured,
  });
  if (typeof parsed === "string") return jsonError(parsed);
  const updated = await getPortalBackend().updateEvent(id, parsed);
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
