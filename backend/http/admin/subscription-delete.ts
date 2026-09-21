import { requireAdminActor } from "@backend/auth/admin-auth";
import type { AdminActor } from "@backend/auth/entra-auth";
import { isSqlConfigured } from "@backend/env";
import { jsonError } from "@backend/http/respond";
import { canDeleteSubscriptions } from "@shared/admin-roles";

type Result = { actor: AdminActor; error?: undefined } | { actor?: undefined; error: Response };

export async function requireSubscriptionDelete(request: Request): Promise<Result> {
  const auth = await requireAdminActor(request);
  if (auth.error) return { error: auth.error };
  if (!auth.actor) return { error: jsonError("You do not have access to the CIU admin portal.", 403) };
  if (!canDeleteSubscriptions(auth.actor.adminRole)) {
    return { error: jsonError("You do not have permission to remove people from subscription lists.", 403) };
  }
  if (!isSqlConfigured()) {
    return { error: jsonError("Azure SQL is not configured. Set SQL_SERVER and SQL_DATABASE.", 503) };
  }
  return { actor: auth.actor };
}
