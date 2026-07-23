import type { Metadata } from "next";
import EducationPage from "@/components/education/EducationPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Azhar Programs | ${siteContent.shortName}`,
  description:
    "Azhar Canada — CIU's Al-Azhar accredited Islamic education programs for children, youth, and adults across Canada.",
};

export default function Page() {
  return <EducationPage />;
}
