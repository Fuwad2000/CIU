import { requireAdminActor } from "@/lib/portal/admin-auth";
import { isSqlConfigured } from "@/lib/portal/env";
import { jsonError, jsonOk } from "@/lib/portal/http";
import { parseAudienceIds } from "@/lib/portal/outreach";
import { resolveAudiences } from "@/lib/portal/outreach-audience";
import { outreachSqlMessage } from "@/lib/portal/outreach-sql";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const audiences = parseAudienceIds(body.audiences);
  if (audiences === "invalid") return jsonError("Choose only supported audiences.");
  if (audiences.length === 0) return jsonError("Choose at least one audience.");

  try {
    const { preview } = await resolveAudiences(audiences);
    return jsonOk(preview);
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not preview recipients."), 500);
  }
}
