import { NextResponse } from "next/server";
import { requireAdminActor } from "@/lib/portal/admin-auth";
import { isSqlConfigured } from "@/lib/portal/env";
import { jsonError } from "@/lib/portal/http";
import { resolveAudiences } from "@/lib/portal/outreach-audience";
import { isEmailDeliveryConfigured } from "@/lib/portal/outreach";
import { denyOutreachSend, denyStaffAudience } from "@/lib/portal/outreach-policy";
import { outreachSqlMessage } from "@/lib/portal/outreach-sql";
import { getOutreachCampaign } from "@/lib/portal/outreach-store";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);

  const denied = denyOutreachSend(auth.actor.adminRole);
  if (denied) return jsonError(denied, 403);

  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const { id } = await context.params;
  try {
    const campaign = await getOutreachCampaign(id);
    if (!campaign) return jsonError("Campaign not found.", 404);
    if (campaign.status !== "draft") {
      return jsonError("Only draft campaigns can be sent.", 409);
    }
    if (!campaign.subject.trim() || !campaign.content.trim()) {
      return jsonError("Subject and email content are required before sending.");
    }
    if (campaign.audiences.length === 0) {
      return jsonError("Choose at least one audience before sending.");
    }

    const deniedStaff = denyStaffAudience(auth.actor.adminRole, campaign.audiences);
    if (deniedStaff) return jsonError(deniedStaff, 403);

    const { preview } = await resolveAudiences(campaign.audiences);
    if (preview.uniqueCount === 0) {
      return jsonError("There are no eligible recipients for the selected audiences.");
    }

    if (!isEmailDeliveryConfigured()) {
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured yet. This campaign was not sent. Recipient lists were resolved on the server and nobody was emailed.",
          uniqueCount: preview.uniqueCount,
          audiences: preview.audiences,
        },
        { status: 503 }
      );
    }

    return jsonError("Email delivery is not configured yet. This campaign was not sent.", 503);
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not send campaign."), 500);
  }
}
