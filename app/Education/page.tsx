import type { Metadata } from "next";
import EducationHubPage from "@/components/education/EducationHubPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Education | ${siteContent.shortName}`,
  description:
    "Islamic education at CIU — Azhar Canada college programs and CIU-hosted weekend Quran and kids classes.",
};

export default function Page() {
  return <EducationHubPage />;
}
