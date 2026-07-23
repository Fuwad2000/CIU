import type { Metadata } from "next";
import MembershipPage from "@/components/membership/MembershipPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Membership | ${siteContent.shortName}`,
  description:
    "Apply for Canadian Islamic Union membership to access community programs, family services, education, and events across the GTA.",
};

export default function Page() {
  return <MembershipPage />;
}
