import { requireAdminActor } from "@backend/auth/admin-auth";
import { isSqlConfigured } from "@backend/env";
import { jsonError, jsonOk, recordHistory } from "@backend/http/respond";
import { parseOutreachAdditionalInput } from "@backend/outreach/input";
import { outreachSqlMessage } from "@backend/outreach/sql";
import { createOutreachAdditional, listOutreachAdditional } from "@backend/outreach/additional";
import { DuplicateEmailError } from "@backend/sql/sql-store";


export async function GET(request: Request) {
  const auth = await requireAdminActor(request);
  if (auth.error) return auth.error;
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  try {
    return jsonOk(await listOutreachAdditional());
  } catch (error) {
    return jsonError(outreachSqlMessage(error, "Could not load additional people."), 500);
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
  const parsed = parseOutreachAdditionalInput(body);
  if (typeof parsed === "string") return jsonError(parsed);

  try {
    const record = await createOutreachAdditional({
      ...parsed,
      createdBy: auth.actor.id,
    });
    await recordHistory(request, {
      action: "created",
      area: "outreach",
      summary: `Added additional audience: ${record.fullName} (${record.email})`,
      entityId: record.id,
    });
    return jsonOk(record, 201);
  } catch (error) {
    if (error instanceof DuplicateEmailError) return jsonError(error.message, 409);
    return jsonError(outreachSqlMessage(error, "Could not add this person."), 500);
  }
}
