import { getPortalBackend } from "@/lib/portal/backend";
import { jsonOk, requireAdmin } from "@/lib/portal/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  return jsonOk(await getPortalBackend().listContacts());
}
