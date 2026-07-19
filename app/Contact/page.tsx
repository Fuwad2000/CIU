import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";
import { siteContent } from "@/content/SiteContent";

export const metadata: Metadata = {
  title: `Contact | ${siteContent.shortName}`,
  description:
    "Contact the Canadian Islamic Union by phone, email, or message. Visit us in Mississauga or connect with us on social media.",
};

export default function Page() {
  return <ContactPage />;
}
