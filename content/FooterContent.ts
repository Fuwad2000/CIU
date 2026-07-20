import { socialLinks } from "./socialLinks";
import type { ContentLink } from "./types";

export const exploreLinks: ContentLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/About" },
  { label: "Services", href: "/Services" },
  { label: "Events", href: "/Events" },
  { label: "Projects", href: "/Projects" },
  { label: "Membership", href: "/Membership" },
];

export const affiliateLinks: ContentLink[] = [
  { label: "Al Azhar Islamic Centre", href: "#" },
  { label: "Free Quran Canada", href: "#" },
  { label: "Future Islamic Cultural Centre", href: "#" },
];

export const footerContent = {
  cta: {
    eyebrow: "Get Involved",
    headline: "Support the community. Stay connected.",
    description:
      "Your donation helps fund programs, services, and outreach. Reach out anytime — we would love to hear from you.",
    buttons: [
      { href: "/Donate", label: "Donate", icon: "donate" as const },
      { href: "/Contact", label: "Contact", icon: "contact" as const },
      {
        href: "/Membership",
        label: "Membership",
        icon: "member" as const,
      },
    ],
  },
  brand: {
    name: "CIU",
    tagline: "The One Big Family",
    description:
      "Canadian Islamic Union is a nonprofit organization serving families across the GTA through faith, education, and community support.",
    logoSrc: "/images/logo.png",
    logoAlt: "Canadian Islamic Union logo",
  },
  sections: {
    explore: { heading: "Explore" },
    ourNetwork: {
      heading: "Our Network",
      quote:
        "Volunteering is not only beneficial for others but also a way to earn reward.",
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
  copyright: {
    organization: "Canadian Islamic Union",
    quickLinks: [
      { href: "/Donate", label: "Donate" },
      { href: "/Contact", label: "Contact" },
      { href: "/Membership", label: "Membership" },
    ],
  },
  backToTopLabel: "Back to top",
  socialLinks,
};
