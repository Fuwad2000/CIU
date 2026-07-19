import type { NavItem } from "./types";

export const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/About", label: "About" },
  {
    href: "/Services",
    label: "Services",
    children: [
      { href: "/Services/prayer-time", label: "Prayer Time" },
      { href: "/Services/matrimonial", label: "Matrimonial Services" },
      { href: "/Services/funeral", label: "Funeral Services" },
      { href: "/Services/family-counseling", label: "Family Counseling" },
      { href: "/Services/volunteer", label: "Volunteer" },
    ],
  },
  {
    href: "/Events",
    label: "Event",
    children: [
      { href: "/Events/family-picnic", label: "Family Picnic" },
      { href: "/Events/sport-event", label: "Sport Event" },
      { href: "/Events/youth-gathering", label: "Youth Gathering" },
    ],
  },
  { href: "/Projects", label: "Project" },
  { href: "/Membership", label: "Membership" },
  { href: "/Contact", label: "Contact" },
];

export const donateLink = { href: "/Donate", label: "Donate" };

export const navBarContent = {
  brand: {
    name: "CIU",
    logoSrc: "/images/logo.png",
    logoAlt: "CIU logo",
  },
  mobile: {
    allItemsPrefix: "All",
  },
  aria: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
