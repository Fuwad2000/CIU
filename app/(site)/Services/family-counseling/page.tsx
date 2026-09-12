import type { Metadata } from "next";
import FamilyCounselingPage from "@/components/services/FamilyCounselingPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Family Services | ${siteContent.shortName}`,
  description:
    "Faith-based family guidance from CIU — marriage counseling, family dispute support, inheritance guidance, and religious consultation with Sheikh Ashraf.",
};

export default function Page() {
  return <FamilyCounselingPage />;
}
