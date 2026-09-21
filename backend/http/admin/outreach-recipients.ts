import { requireAdminActor } from "@backend/auth/admin-auth";
import { isSqlConfigured } from "@backend/env";
import { jsonError, jsonOk } from "@backend/http/respond";
import { denyOutreachRecipients } from "@backend/outreach/policy";
import { outreachSqlMessage } from "@backend/outreach/sql";
import { getOutreachCampaign, listOutreachRecipients } from "@backend/outreach/store";


type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Context) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);

  const denied = denyOutreachRecipients(auth.actor.adminRole);
  if (denied) return jsonError(denied, 403);

  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const { id } = await context.params;
  try {
    const campaign = await getOutreachCampaign(id);
    if (!campaign) return jsonError("Campaign not found.", 404);
    return jsonOk(await listOutreachRecipients(id));
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not load recipients."), 500);
  }
}
