import { authenticateAdminRequest } from "@/lib/portal/entra-auth";
import { jsonError, jsonOk, requireAdmin } from "@/lib/portal/http";
import { listHistoryForAdmin } from "@/lib/portal/sql-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const auth = await authenticateAdminRequest(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);

  try {
    const history = await listHistoryForAdmin(auth.actor.email);
    return jsonOk({ email: auth.actor.email, user: auth.actor, history });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not load profile.", 500);
  }
}
