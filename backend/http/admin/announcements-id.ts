import { getPortalBackend } from "@backend/stores/backend";
import { jsonError, jsonOk, readString, recordHistory, requireAdmin } from "@backend/http/respond";


type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const before = (await getPortalBackend().listAnnouncements()).find((item) => item.id === id);

  const updated = await getPortalBackend().updateAnnouncement(id, {
    message: body.message === undefined ? undefined : readString(body.message),
    href: body.href === undefined ? undefined : readString(body.href),
    active: typeof body.active === "boolean" ? body.active : undefined,
  });
  if (!updated) return jsonError("Announcement not found.", 404);
  const change =
    typeof body.active === "boolean" && body.active !== before?.active
      ? `${updated.active ? "Showed" : "Hid"} announcement: “${updated.message}”`
      : `Updated announcement: “${updated.message}”`;
  await recordHistory(request, {
    action: "updated",
    area: "announcements",
    summary: change,
    entityId: updated.id,
  });
  return jsonOk(updated);
}

export async function DELETE(request: Request, { params }: Params) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  const current = (await getPortalBackend().listAnnouncements()).find((item) => item.id === id);
  const deleted = await getPortalBackend().deleteAnnouncement(id);
  if (!deleted) return jsonError("Announcement not found.", 404);
  await recordHistory(request, {
    action: "deleted",
    area: "announcements",
    summary: `Deleted announcement: “${current?.message ?? id}”`,
    entityId: id,
  });
  return jsonOk({ ok: true });
}
