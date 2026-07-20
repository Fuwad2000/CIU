import type { Metadata } from "next";
import MediaPage from "@/components/media/MediaPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Media | ${siteContent.shortName}`,
  description:
    "Browse CIU photo galleries and recorded lectures from community programs, events, and learning sessions.",
};

export default function Page() {
  return <MediaPage />;
}
