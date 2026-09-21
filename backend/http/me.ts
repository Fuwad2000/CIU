import { authenticateAdminRequest, toAdminMe } from "@backend/auth/entra-auth";
import { isStaffSessionTableMissing, readStaffSessionId, touchStaffSession } from "@backend/auth/staff-session";
import { isSqlConfigured } from "@backend/env";
import { jsonError, jsonOk } from "@backend/http/respond";


export async function GET(request: Request) {
  const auth = await authenticateAdminRequest(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);

  if (isSqlConfigured()) {
    const sessionId = readStaffSessionId(request);
    if (sessionId) {
      try {
        await touchStaffSession(sessionId);
      } catch (error) {
        if (!isStaffSessionTableMissing(error)) {
          return jsonError("Could not refresh the staff session.", 500);
        }
      }
    }
  }

  return jsonOk(toAdminMe(auth.actor));
}
