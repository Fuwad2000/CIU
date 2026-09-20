import { requireAdminActor } from "@/lib/portal/admin-auth";
import { isSqlConfigured } from "@/lib/portal/env";
import { jsonError, jsonOk, recordHistory } from "@/lib/portal/http";
import { parseOutreachCampaignInput } from "@/lib/portal/outreach-input";
import { denyStaffAudience } from "@/lib/portal/outreach-policy";
import { outreachSqlMessage } from "@/lib/portal/outreach-sql";
import { createOutreachCampaign, listOutreachCampaigns } from "@/lib/portal/outreach-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  try {
    return jsonOk(await listOutreachCampaigns());
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not load campaigns."), 500);
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const parsed = parseOutreachCampaignInput(body);
  if (typeof parsed === "string") return jsonError(parsed);

  const deniedStaff = denyStaffAudience(auth.actor.adminRole, parsed.audiences);
  if (deniedStaff) return jsonError(deniedStaff, 403);

  try {
    const record = await createOutreachCampaign({
      ...parsed,
      createdBy: auth.actor.id,
    });
    await recordHistory(request, {
      action: "created",
      area: "outreach",
      summary: `Created outreach draft: ${record.subject}`,
      entityId: record.id,
    });
    return jsonOk(record, 201);
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not save campaign."), 500);
  }
}
