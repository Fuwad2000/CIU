import type { Metadata } from "next";
import DonatePage from "@/components/donate/DonatePage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Donate | ${siteContent.shortName}`,
  description:
    "Support the Canadian Islamic Union through Interac e-Transfer, PayPal, cheque, or in-person giving.",
};

export default function Page() {
  return <DonatePage />;
}
