import type { Metadata } from "next";
import EventsPage from "@/components/events/EventsPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Events | ${siteContent.shortName}`,
  description:
    "Explore upcoming CIU classes, family gatherings, youth programs, workshops, recurring programs, and community events.",
};

export default function Page() {
  return <EventsPage />;
}
