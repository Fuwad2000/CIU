import type { Metadata } from "next";
import PrayerTimesPage from "@frontend/components/prayer/PrayerTimesPage";
import { siteContent } from "@frontend/content/SiteContent";

export const metadata: Metadata = {
  title: `Prayer Times | ${siteContent.shortName}`,
  description:
    "View daily salah and Jumu'ah prayer times for the Canadian Islamic Union in Mississauga, Ontario.",
};

export default function Page() {
  return <PrayerTimesPage />;
}
