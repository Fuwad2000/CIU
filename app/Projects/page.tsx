import type { Metadata } from "next";
import ProjectsPage from "@/components/projects/ProjectsPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Projects | ${siteContent.shortName}`,
  description:
    "Explore CIU community projects in outreach, education, youth development, and charitable service across the GTA.",
};

export default function Page() {
  return <ProjectsPage />;
}
