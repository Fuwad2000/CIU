import { getPortalBackend } from "@backend/stores/backend";
import { jsonOk } from "@backend/http/respond";


export async function GET() {
  const items = await getPortalBackend().listAnnouncements();
  return jsonOk(items.filter((item) => item.active));
}
