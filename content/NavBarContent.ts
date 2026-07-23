import type { NavItem } from "./types";

export const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/About", label: "About" },
  {
    href: "/Services",
    label: "Services",
    children: [
      { href: "/Services/prayer-times", label: "Prayer Times" },
      { href: "/Services#spiritual-guidance", label: "Spiritual Guidance" },
      { href: "/Services/family-counseling", label: "Family Services" },
      { href: "/Events/youth-gathering", label: "Youth Development" },
      { href: "/Education", label: "Azhar Canada" },
      { href: "/Events", label: "Community Programs" },
      { href: "/Projects", label: "Charitable Initiatives" },
    ],
  },
  {
    href: "/Events",
    label: "Events",
    children: [
      { href: "/Events#upcoming-events", label: "Upcoming Events" },
      { href: "/Events#recurring-programs", label: "Recurring Programs" },
      { href: "/Events#event-calendar", label: "Event Calendar" },
      { href: "/Events#past-events", label: "Past Events" },
      { href: "/Events#host-event", label: "Host an Event" },
    ],
  },
  {
    href: "/Media",
    label: "Media",
    children: [
      { href: "/Media/images", label: "CIU Images" },
      { href: "/Media/lectures", label: "CIU Lectures" },
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
