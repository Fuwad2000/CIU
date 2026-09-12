import type { Metadata } from "next";
import MediaImagesPage from "@/components/media/MediaImagesPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `CIU Images | ${siteContent.shortName}`,
  description:
    "Sample photo gallery layout for CIU events, education programs, community gatherings, and seasonal activities.",
};

export default function Page() {
  return <MediaImagesPage />;
}
