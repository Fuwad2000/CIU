import { requireAdminActor } from "@backend/auth/admin-auth";
import { canSelectStaffAudience } from "@shared/admin-roles";
import { isSqlConfigured } from "@backend/env";
import { jsonError, jsonOk } from "@backend/http/respond";
import {
  OUTREACH_AUDIENCE_DESCRIPTIONS,
  OUTREACH_AUDIENCE_HREFS,
  OUTREACH_AUDIENCE_LABELS,
  OUTREACH_SELECTABLE_AUDIENCES,
  type OutreachAudienceId,
} from "@shared/outreach";
import { audienceEligibleCounts } from "@backend/outreach/audience";
import { outreachSqlMessage } from "@backend/outreach/sql";


export async function GET(request: Request) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const allowStaff = canSelectStaffAudience(auth.actor.adminRole);
  const ids = OUTREACH_SELECTABLE_AUDIENCES.filter((id) => id !== "admins" || allowStaff);

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
