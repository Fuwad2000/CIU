import type { Metadata } from "next";
import CiuProgramsPage from "@/components/education/CiuProgramsPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `CIU Programs | ${siteContent.shortName}`,
  description:
    "CIU weekend Quran classes and kids programs hosted at the Canadian Islamic Centre in Mississauga.",
};

export default function Page() {
  return <CiuProgramsPage />;
}
