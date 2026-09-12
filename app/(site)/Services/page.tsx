import type { Metadata } from "next";
import ServicesPage from "@/components/services/ServicesPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Services | ${siteContent.shortName}`,
  description:
    "Explore CIU services including spiritual guidance, family support, youth programs, Islamic education, community gatherings, and charitable initiatives.",
};

export default function Page() {
  return <ServicesPage />;
}
