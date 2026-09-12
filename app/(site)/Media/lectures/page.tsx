import type { Metadata } from "next";
import MediaLecturesPage from "@/components/media/MediaLecturesPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `CIU Lectures | ${siteContent.shortName}`,
  description:
    "Sample lecture library layout for CIU recorded talks, reminders, and educational sessions.",
};

export default function Page() {
  return <MediaLecturesPage />;
}
