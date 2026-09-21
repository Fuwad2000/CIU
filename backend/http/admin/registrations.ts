import { getPortalBackend } from "@backend/stores/backend";
import { jsonOk, requireAdmin } from "@backend/http/respond";


export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  return jsonOk(await getPortalBackend().listRegistrations());
}
