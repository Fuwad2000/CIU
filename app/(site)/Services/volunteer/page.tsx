import type { Metadata } from "next";
import VolunteerPage from "@frontend/components/services/VolunteerPage";
import { siteContent } from "@frontend/content/SiteContent";

export const metadata: Metadata = {
  title: `Volunteer | ${siteContent.shortName}`,
  description:
    "Volunteer with CIU — support community events, education programs, outreach, and service initiatives across the GTA.",
};

export default function Page() {
  return <VolunteerPage />;
}
