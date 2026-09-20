import { isSqlConfigured } from "@/lib/portal/env";
import { jsonError, jsonOk, requireAdmin } from "@/lib/portal/http";
import { listVolunteers } from "@/lib/portal/sql-store";

export const dynamic = "force-dynamic";

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
