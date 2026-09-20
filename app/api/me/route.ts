import { authenticateAdminRequest, toAdminMe } from "@/lib/portal/entra-auth";
import { jsonError, jsonOk } from "@/lib/portal/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await authenticateAdminRequest(request);
  if (auth.error) return auth.error;
  if (!auth.actor) return jsonError("You do not have access to the CIU admin portal.", 403);
  return jsonOk(toAdminMe(auth.actor));
}
