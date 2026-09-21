import { requireAdminActor } from "@backend/auth/admin-auth";
import { jsonError, jsonOk, recordHistory } from "@backend/http/respond";
import { handleOutreachSend } from "@backend/outreach/send-campaign";
import { outreachSqlMessage } from "@backend/outreach/sql";
import { parsePosterImage } from "@shared/poster-image";


type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const poster = parsePosterImage(body.poster);
  if (typeof poster === "string") return jsonError(poster);

  const { id } = await context.params;
  try {
    const result = await handleOutreachSend({
      campaignId: id,
      actorId: auth.actor.id,
      actorRole: auth.actor.adminRole,
      poster,
    });
    if (!result.ok) {
      return jsonError(result.error, result.status);
    }

    const campaign = result.data;
    await recordHistory(request, {
      action: "updated",
      area: "outreach",
      summary: `Sent outreach campaign: ${campaign.subject} (${campaign.delivery.sent} delivered)`,
      entityId: campaign.id,
    });
    return jsonOk(campaign);
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not send campaign."), 500);
  }
}
