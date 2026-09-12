import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `About | ${siteContent.shortName}`,
  description:
    "Learn about the Canadian Islamic Union — a registered charity organization serving Muslim families through education, mentorship, and community support across Canada.",
};

export default function Page() {
  return <AboutPage />;
}
