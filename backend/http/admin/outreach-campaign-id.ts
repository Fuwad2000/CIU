import { requireAdminActor } from "@backend/auth/admin-auth";
import { isSqlConfigured } from "@backend/env";
import { jsonError, jsonOk, recordHistory } from "@backend/http/respond";
import { parseOutreachCampaignInput } from "@backend/outreach/input";
import { denyStaffAudience } from "@backend/outreach/policy";
import { outreachSqlMessage } from "@backend/outreach/sql";
import { getOutreachCampaign, updateOutreachCampaign } from "@backend/outreach/store";


type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Context) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const { id } = await context.params;
  try {
    const record = await getOutreachCampaign(id);
    if (!record) return jsonError("Campaign not found.", 404);
    return jsonOk(record);
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not load campaign."), 500);
  }
}

export async function PATCH(request: Request, context: Context) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const { id } = await context.params;
  const existing = await getOutreachCampaign(id).catch(() => null);
  if (!existing) return jsonError("Campaign not found.", 404);
  if (existing.status !== "draft") {
    return jsonError("Only draft campaigns can be edited.", 409);
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const parsed = parseOutreachCampaignInput(body);
  if (typeof parsed === "string") return jsonError(parsed);

  const deniedStaff = denyStaffAudience(auth.actor.adminRole, parsed.audiences, existing.audiences);
  if (deniedStaff) return jsonError(deniedStaff, 403);

  try {
    const record = await updateOutreachCampaign(id, parsed);
    if (!record) return jsonError("Only draft campaigns can be edited.", 409);
    await recordHistory(request, {
      action: "updated",
      area: "outreach",
      summary: `Updated outreach draft: ${record.subject}`,
      entityId: record.id,
    });
    return jsonOk(record);
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not update campaign."), 500);
  }
}
