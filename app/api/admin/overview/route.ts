import { getPortalBackend } from "@/lib/portal/backend";
import { isAzureConfigured } from "@/lib/portal/env";
import { jsonOk, requireAdmin } from "@/lib/portal/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const backend = getPortalBackend();
  const [announcements, events, contacts, registrations, history] = await Promise.all([
    backend.listAnnouncements(),
    backend.listEvents(),
    backend.listContacts(),
    backend.listRegistrations(),
    backend.listHistory(),
  ]);

  return jsonOk({
    azureConnected: isAzureConfigured(),
    counts: {
      announcements: announcements.length,
      events: events.length,
      contacts: contacts.length,
      quranRegistrations: registrations.filter((item) => item.program === "quran").length,
      kidsRegistrations: registrations.filter((item) => item.program === "kids").length,
      history: history.length,
    },
  });
}
