import { kidsRegistrationHref, quranRegistrationHref } from "@frontend/content/RegistrationLinks";

export type EventCategory =
  | "education"
  | "youth"
  | "family"
  | "community"
  | "spiritual"
  | "volunteer";

export type EventItem = {
  id: string;
  title: string;
  category: EventCategory;
  dateLabel: string;
  date?: string;
  time: string;
  location: string;
  description: string;
  tags: string[];
  href: string;
  buttonLabel: string;
  image?: string;
  recurring?: boolean;
  featured?: boolean;
};

export type RecurringProgram = {
  id: string;
  title: string;
  frequency: string;
  time: string;
  audience: string;
  href: string;
  buttonLabel: string;
};

export type PastEventItem = {
  id: string;
  title: string;
  dateLabel: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
};

export type EventCategoryCard = {
  id: EventCategory | "community-initiatives";
  title: string;
  description: string;
  filterCategory: EventCategory | "all";
  href: string;
};

export type CalendarDemoEvent = {
  date: string;
  title: string;
  time: string;
};

// TODO: Replace placeholder dates, times, and locations with confirmed event data before publishing.

export const eventsImages = {
  hero: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785024108/Islamic_geometric_pattern_xws7o5.jpg",
  featured:
    "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785030702/WhatsApp_Image_2026-07-25_at_08.02.11_o9kgwz.jpg",
  quranClass:
    "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785118836/CIU_Quran_otnkdt.png",
  partnership:
    "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785021386/about-community_peqwp7.jpg",
  pastEvents: {
    communityWelcome:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020442/home_hero1_xnh8ra.png",
    youthLeadership:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785028168/kids-01_oldgl7.jpg",
    familyLearningDay:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020761/IMG_4982_ate0hm.jpg",
    educationWorkshop:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020773/IMG_5023_qukbdo.jpg",
    volunteerOutreach:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020581/home_hero4_j6vzhr.png",
    communityHalaqah:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020764/IMG_7460_doasia.jpg",
  },
} as const;

export const eventsHeroContent = {
  label: "EVENTS & GATHERINGS",
  heading: "Learn, Connect and Grow Together",
  intro:
    "Explore upcoming classes, family gatherings, youth programs, workshops, community initiatives, and special events hosted by the Canadian Islamic Union.",
  supportLine: "Welcoming opportunities for individuals, youth, and families.",
  primaryButton: { label: "View Upcoming Events", href: "#upcoming-events" },
  secondaryButton: { label: "Contact the Events Team", href: "/Contact" },
  imageSrc: eventsImages.hero,
  imageAlt: "Muslim families and community members gathered for fellowship",
};

export const eventAnnouncementContent = {
  message: "One Big Family Picnic — Sunday, August 23 at Chinguacousy Park. Join us for potluck & BBQ!",
  buttonLabel: "View Event",
  buttonHref: "/Events/family-picnic",
};

export const featuredEventContent = {
  label: "FEATURED EVENT",
  title: "One Big Family Picnic",
  dateLabel: "Sunday, August 23, 2026",
  time: "11:00 AM",
  location: "Chinguacousy Park — Brampton",
  description:
    "Join the Canadian Islamic Union for our One Big Family Picnic — a potluck and BBQ for families and community members to connect, share a meal, and enjoy a day outdoors together.",
  chips: ["Family Friendly", "Potluck & BBQ", "In Person"],
  primaryButton: { label: "Contact Us to Register", href: "/Contact" },
  secondaryButton: { label: "View Details", href: "/Events/family-picnic" },
  note: "Bring a dish to share for the potluck. More details will be shared closer to the event date.",
  imageSrc: eventsImages.featured,
  imageAlt: "One Big Family Picnic event poster for August 23 at Chinguacousy Park",
};

export const eventFilterCategories = [
  { id: "all", label: "All Events" },
  { id: "education", label: "Education" },
  { id: "family", label: "Family" },
] as const;

export type EventFilterCategoryId = (typeof eventFilterCategories)[number]["id"];

export const eventDateFilters = [
  { id: "upcoming", label: "Upcoming" },
  { id: "recurring", label: "Recurring" },
] as const;

export type EventDateFilterId = (typeof eventDateFilters)[number]["id"];

export const upcomingEventsSection = {
  id: "upcoming-events",
  heading: "Upcoming Events",
  subheading:
    "Our featured gathering, recurring Quran classes, and weekend kids program.",
  loadMoreLabel: "Load More Events",
  loadMoreNote: "Additional events will be published here as they are announced.",
};

export const upcomingEvents: EventItem[] = [
  {
    id: "one-big-family-picnic",
    title: "One Big Family Picnic",
    category: "family",
    dateLabel: "Sunday, August 23, 2026",
    date: "2026-08-23",
    time: "11:00 AM",
    location: "Chinguacousy Park — Brampton",
    description:
      "Join CIU families and community members for a potluck and BBQ — connect, share a meal, and enjoy fellowship outdoors.",
    tags: ["Family Friendly", "Potluck & BBQ", "In Person"],
    href: "/Events/family-picnic",
    buttonLabel: "View Details",
    image: eventsImages.featured,
    featured: true,
  },
  {
    id: "quran-class",
    title: "Quran Class",
    category: "education",
    dateLabel: "Every Tuesday & Thursday",
    time: "7:00 PM",
    location: "CIU Community Centre — Mississauga",
    description:
      "Recurring evening Quran classes focused on recitation, tajweed, and guided study for learners of all levels.",
    tags: ["Recurring", "Education", "Evenings"],
    href: quranRegistrationHref,
    buttonLabel: "Register Now",
    image: eventsImages.quranClass,
    recurring: true,
  },
  {
    id: "ciu-kids-weekend",
    title: "CIU Kids Program",
    category: "education",
    dateLabel: "Every Weekend",
    time: "10:00 AM – 2:00 PM",
    location: "Canadian Islamic Centre — Mississauga",
    description:
      "Recurring weekend Quran classes and kids learning sessions hosted by CIU for grades 1 through 12.",
    tags: ["Recurring", "Kids", "Weekends"],
    href: kidsRegistrationHref,
    buttonLabel: "Register Now",
    image: eventsImages.pastEvents.youthLeadership,
    recurring: true,
  },
];

export const recurringProgramsContent = {
  id: "recurring-programs",
  label: "EVERY WEEK",
  heading: "Recurring Programs",
  subheading: "Join us for ongoing Quran classes and weekend kids programming.",
  note: "Schedules may change during holidays, Ramadan, or special community periods.",
  programs: [
    {
      id: "quran-class",
      title: "Quran Class",
      frequency: "Every Tuesday & Thursday",
      time: "7:00 PM",
      audience: "All learners",
      href: quranRegistrationHref,
      buttonLabel: "Register Now",
    },
    {
      id: "ciu-kids-weekend",
      title: "CIU Kids Program",
      frequency: "Every weekend",
      time: "10:00 AM – 2:00 PM",
      audience: "Grades 1 – 12",
      href: kidsRegistrationHref,
      buttonLabel: "Register Now",
    },
  ] satisfies RecurringProgram[],
};

export const eventCalendarContent = {
  id: "event-calendar",
  heading: "Monthly Calendar",
  viewFullLabel: "View Full Calendar",
  viewFullHref: "#event-calendar",
  demoEvents: [
    { date: "2026-08-23", title: "One Big Family Picnic", time: "11:00 AM" },
    { date: "2026-08-25", title: "Quran Class", time: "7:00 PM" },
    { date: "2026-08-27", title: "Quran Class", time: "7:00 PM" },
    { date: "2026-08-29", title: "CIU Kids Program", time: "10:00 AM" },
    { date: "2026-08-30", title: "CIU Kids Program", time: "10:00 AM" },
  ] satisfies CalendarDemoEvent[],
};

export const eventCategoriesContent = {
  heading: "Browse by Category",
  categories: [
    {
      id: "education",
      title: "Islamic Education",
      description: "Quran classes, kids programs, and learning opportunities at CIU.",
      filterCategory: "education",
      href: "/Events?category=education",
    },
    {
      id: "family",
      title: "Family Events",
      description: "Gatherings and family-focused programs for the community.",
      filterCategory: "family",
      href: "/Events?category=family",
    },
  ] satisfies EventCategoryCard[],
};

export const pastEventsContent = {
  id: "past-events",
  heading: "Past Events",
  subheading:
    "A look back at previous classes, gatherings, workshops, and community initiatives.",
  viewGalleryLabel: "View Event Gallery",
  viewGalleryHref: "#past-events",
  items: [
    {
      id: "past-1",
      title: "Community Welcome Gathering",
      dateLabel: "Spring 2026",
      category: "Community",
      imageSrc: eventsImages.pastEvents.communityWelcome,
      imageAlt: "Community members seated during a seminar at CIU",
    },
    {
      id: "past-2",
      title: "Youth Leadership Session",
      dateLabel: "Summer 2026",
      category: "Youth",
      imageSrc: eventsImages.pastEvents.youthLeadership,
      imageAlt: "Young student at a CIU community celebration",
    },
    {
      id: "past-3",
      title: "Family Learning Day",
      dateLabel: "Summer 2026",
      category: "Family",
      imageSrc: eventsImages.pastEvents.familyLearningDay,
      imageAlt: "Families gathered in the community centre multipurpose hall",
    },
    {
      id: "past-4",
      title: "Islamic Education Workshop",
      dateLabel: "2026",
      category: "Education",
      imageSrc: eventsImages.pastEvents.educationWorkshop,
      imageAlt: "Community learning workshop with students taking notes",
    },
    {
      id: "past-5",
      title: "Volunteer Outreach Initiative",
      dateLabel: "2026",
      category: "Volunteer",
      imageSrc: eventsImages.pastEvents.volunteerOutreach,
      imageAlt: "Community members serving together at a CIU volunteer outreach event",
    },
    {
      id: "past-6",
      title: "Community Halaqah Series",
      dateLabel: "2026",
      category: "Spiritual",
      imageSrc: eventsImages.pastEvents.communityHalaqah,
      imageAlt: "Guest speaker addressing the community at a lecture event",
    },
  ] satisfies PastEventItem[],
};

export const hostEventContent = {
  id: "host-event",
  label: "COLLABORATE WITH US",
  heading: "Host or Support a Community Event",
  body: "CIU welcomes opportunities to collaborate with educators, scholars, volunteers, charity organizations, community groups, and service providers on initiatives that align with its mission and values.",
  areas: [
    "Educational workshops",
    "Family programming",
    "Youth activities",
    "Community outreach",
    "Volunteer projects",
    "Charitable initiatives",
  ],
  note: "All proposed events and partnerships are subject to review and approval.",
  primaryButton: { label: "Propose an Event", href: "/Contact" },
  secondaryButton: { label: "Contact CIU", href: "/Contact" },
  imageSrc: eventsImages.partnership,
  imageAlt: "Community members gathered during a CIU seminar",
};

export const eventRegistrationInfoContent = {
  heading: "Before You Register",
  points: [
    "Some events may require advance registration.",
    "Capacity may be limited.",
    "Children may require parent or guardian supervision.",
    "Fees, if applicable, will be clearly displayed on the event page.",
    "Photos or videos may only be taken and published according to CIU's approved consent and privacy practices.",
    "Event details may change due to venue availability, weather, speaker availability, or operational needs.",
  ],
  closing: "Please review the full event details before attending.",
};

export const eventNewsletterContent = {
  heading: "Never Miss an Event",
  intro:
    "Receive updates about upcoming classes, youth programs, family gatherings, volunteer opportunities, and important community announcements.",
  consent:
    "By subscribing, you agree to receive CIU event and community updates. You may unsubscribe at any time.",
  buttonLabel: "Subscribe for Updates",
};

export const eventsFinalCtaContent = {
  label: "JOIN THE COMMUNITY",
  heading: "Be Part of What's Happening at CIU",
  intro:
    "Attend an event, volunteer your time, support a community initiative, or connect with our team to learn how you can participate.",
  buttons: [
    { label: "Browse Events", href: "#upcoming-events", variant: "primary" as const },
    { label: "Become a Volunteer", href: "/Services/volunteer", variant: "outline" as const },
    { label: "Contact Us", href: "/Contact", variant: "gold" as const },
  ],
};

export const categoryLabels: Record<EventCategory, string> = {
  education: "Education",
  youth: "Youth",
  family: "Family",
  community: "Community",
  spiritual: "Spiritual",
  volunteer: "Volunteer",
};
