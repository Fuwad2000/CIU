import { socialLinks } from "./socialLinks";
import type { ContentLink } from "./types";
import { siteContent } from "./SiteContent";

export const exploreLinks: ContentLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/About" },
  { label: "Services", href: "/Services" },
  { label: "Events", href: "/Events" },
  { label: "Projects", href: "/Projects" },
  { label: "Membership", href: "/Membership" },
];

export const affiliateLinks: ContentLink[] = [
  { label: "Azhar Canada College", href: "https://azharcanada.ca/" },
  { label: "Free Quran Canada", href: "https://www.freequran.ca/" },
];

export const footerContent = {
  brand: {
    name: "CIU",
    tagline: "The One Big Family",
    logoSrc: siteContent.logoSrc,
    logoAlt: "Canadian Islamic Union logo",
  },
  sections: {
    explore: { heading: "Explore" },
    ourNetwork: {
      heading: "Our Network",
    },
    visitUs: {
      heading: "Visit Us",
      addressLines: ["6185 Tomken Rd #6", "Mississauga, ON L5T 1X6, Canada"],
      phone: "905-266-4135",
      phoneHref: "tel:9052664135",
      email: "info@ciucanada.ca",
      emailHref: "mailto:info@ciucanada.ca",
      messageLink: { href: "/Contact", label: "Send a message" },
    },
    followUs: { heading: "Follow Us" },
  },
  actions: [
    { href: "/Donate", label: "Donate", kind: "donate" as const },
    { href: "/Contact", label: "Contact", kind: "contact" as const },
    { href: "/Membership", label: "Membership", kind: "member" as const },
  ],
  network: affiliateLinks,
  copyright: {
    organization: "Canadian Islamic Union",
    developerCredit: {
      prefix: "Website by",
      name: "Eagles Development Team",
    },
  },
  staffLogin: {
    href: "/admin",
    label: "Staff login",
  },
  backToTopLabel: "Back to top",
  socialLinks,
};
