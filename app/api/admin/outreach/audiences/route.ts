import { requireAdminActor } from "@/lib/portal/admin-auth";
import { canSelectStaffAudience } from "@/lib/portal/admin-roles";
import { isSqlConfigured } from "@/lib/portal/env";
import { jsonError, jsonOk } from "@/lib/portal/http";
import {
  OUTREACH_AUDIENCE_DESCRIPTIONS,
  OUTREACH_AUDIENCE_HREFS,
  OUTREACH_AUDIENCE_LABELS,
  OUTREACH_AUDIENCES,
  type OutreachAudienceId,
} from "@/lib/portal/outreach";
import { audienceEligibleCounts } from "@/lib/portal/outreach-audience";
import { outreachSqlMessage } from "@/lib/portal/outreach-sql";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const allowStaff = canSelectStaffAudience(auth.actor.adminRole);
  const ids = OUTREACH_AUDIENCES.filter((id) => id !== "admins" || allowStaff);

  try {
    const counts = await audienceEligibleCounts(ids);
    return jsonOk({
      audiences: ids.map((id: OutreachAudienceId) => ({
        id,
        label: OUTREACH_AUDIENCE_LABELS[id],
        description: OUTREACH_AUDIENCE_DESCRIPTIONS[id],
        href: OUTREACH_AUDIENCE_HREFS[id],
        eligibleCount: counts[id],
      })),
    });
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not load audiences."), 500);
  }
}
