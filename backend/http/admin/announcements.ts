import { getPortalBackend } from "@backend/stores/backend";
import { jsonError, jsonOk, readString, recordHistory, requireAdmin } from "@backend/http/respond";


export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  return jsonOk(await getPortalBackend().listAnnouncements());
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const message = readString(body.message);
  if (!message) return jsonError("Announcement message is required.");

  const record = await getPortalBackend().createAnnouncement({
    message,
    href: readString(body.href),
    active: body.active !== false,
  });
  await recordHistory(request, {
    action: "created",
    area: "announcements",
    summary: `Added announcement: “${record.message}”`,
    entityId: record.id,
  });
  return jsonOk(record, 201);
}
