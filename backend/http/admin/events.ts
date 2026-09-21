import { getPortalBackend } from "@backend/stores/backend";
import { parseEventInput } from "@backend/http/event-input";
import { jsonError, jsonOk, recordHistory, requireAdmin } from "@backend/http/respond";


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
