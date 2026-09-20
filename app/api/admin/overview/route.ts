import { getPortalBackend } from "@/lib/portal/backend";
import { isAzureConfigured, isSqlConfigured, portalBackendName } from "@/lib/portal/env";
import { jsonOk, requireAdmin } from "@/lib/portal/http";
import { listOutreachCampaigns } from "@/lib/portal/outreach-store";
import { listMembers, listNewsletter, listVolunteers } from "@/lib/portal/sql-store";

export const dynamic = "force-dynamic";

async function countOrZero(load: () => Promise<unknown[]>) {
  try {
    return (await load()).length;
  } catch {
    return 0;
  }
}

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const backend = getPortalBackend();
  const [announcements, events, contacts, registrations, history, members, volunteers, newsletter, outreach] =
    await Promise.all([
      backend.listAnnouncements(),
      backend.listEvents(),
      backend.listContacts(),
      backend.listRegistrations(),
      backend.listHistory(),
      countOrZero(() => listMembers("membership")),
      countOrZero(listVolunteers),
      countOrZero(listNewsletter),
      countOrZero(listOutreachCampaigns),
    ]);

  return jsonOk({
    backend: portalBackendName(),
    sqlConnected: isSqlConfigured(),
    azureConnected: isAzureConfigured(),
    counts: {
      announcements: announcements.length,
      events: events.length,
      contacts: contacts.length,
      members,
      volunteers,
      newsletter,
      outreach,
      quranRegistrations: registrations.filter((item) => item.program === "quran").length,
      kidsRegistrations: registrations.filter((item) => item.program === "kids").length,
      history: history.length,
    },
  });
}
