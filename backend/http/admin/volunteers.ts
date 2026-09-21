import { isSqlConfigured } from "@backend/env";
import { jsonError, jsonOk, requireAdmin } from "@backend/http/respond";
import { listVolunteers } from "@backend/sql/sql-store";


export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isSqlConfigured()) {
    return jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503);
  }

  try {
    return jsonOk(await listVolunteers());
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not load volunteers.", 500);
  }
}
