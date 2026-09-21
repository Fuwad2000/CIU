import { canViewAllHistory } from "@shared/admin-roles";
import { getPortalBackend } from "@backend/stores/backend";
import { authenticateAdminRequest } from "@backend/auth/entra-auth";
import { jsonError, jsonOk } from "@backend/http/respond";


export async function GET(request: Request) {
  const auth = await authenticateAdminRequest(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);
  if (!canViewAllHistory(auth.actor.adminRole)) {
    return jsonError("You can only view your own activity.", 403);
  }
  return jsonOk(await getPortalBackend().listHistory());
}
