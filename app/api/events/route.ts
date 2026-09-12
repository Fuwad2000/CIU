import { getPortalBackend } from "@/lib/portal/backend";
import { jsonOk } from "@/lib/portal/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getPortalBackend().listEvents();
  return jsonOk(items);
}
