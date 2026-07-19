import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `About | ${siteContent.shortName}`,
  description:
    "Learn about the Canadian Islamic Union — our story, vision, mission, values, and community impact across Canada.",
};

export default function Page() {
  return <AboutPage />;
}
