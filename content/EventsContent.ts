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

// TODO: Replace all placeholder dates, times, locations, and images with confirmed event data before publishing.
export const eventsImages = {
  hero: "/images/events/events-hero.svg",
  featured: "/images/events/featured-event.svg",
  partnership: "/images/events/community-partnership.svg",
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
  imageAlt: "Placeholder — CIU community events and gatherings",
};

export const eventAnnouncementContent = {
  message: "Registration is now open for selected upcoming programs.",
  buttonLabel: "View Registrations",
  buttonHref: "#upcoming-events",
};

export const featuredEventContent = {
  label: "FEATURED EVENT",
  title: "CIU Family Community Gathering",
  dateLabel: "Saturday, August 24",
  time: "1:00 PM – 5:00 PM",
  location: "Location to be confirmed",
  description:
    "Join CIU families and community members for an afternoon of learning, connection, activities, and meaningful conversation in a welcoming family environment.",
  chips: ["Family Friendly", "Registration Required", "In Person"],
  primaryButton: { label: "Register Now", href: "/Contact" },
  secondaryButton: { label: "View Details", href: "/Events/family-picnic" },
  note: "Date, location, and registration information are placeholders until confirmed.",
  imageSrc: eventsImages.featured,
  imageAlt: "Placeholder — CIU family community gathering",
};

export const eventFilterCategories = [
  { id: "all", label: "All Events" },
  { id: "education", label: "Education" },
  { id: "youth", label: "Youth" },
  { id: "family", label: "Family" },
  { id: "community", label: "Community" },
  { id: "spiritual", label: "Spiritual" },
  { id: "volunteer", label: "Volunteer" },
] as const;

export type EventFilterCategoryId = (typeof eventFilterCategories)[number]["id"];

export const eventDateFilters = [
  { id: "upcoming", label: "Upcoming" },
  { id: "this-month", label: "This Month" },
  { id: "recurring", label: "Recurring" },
] as const;

export type EventDateFilterId = (typeof eventDateFilters)[number]["id"];

export const upcomingEventsSection = {
  id: "upcoming-events",
  heading: "Upcoming Events",
  subheading:
    "Discover upcoming learning opportunities, gatherings, and community programs.",
  loadMoreLabel: "Load More Events",
  loadMoreNote:
    "Additional events will be published here once dates and details are confirmed.",
};

export const upcomingEvents: EventItem[] = [
  {
    id: "weekly-halaqah",
    title: "Weekly Community Halaqah",
    category: "spiritual",
    dateLabel: "Every Friday",
    time: "7:00 PM",
    location: "CIU Community Space",
    description:
      "A weekly gathering focused on Islamic reminders, reflection, discussion, and community connection.",
    tags: ["Recurring", "All Adults"],
    href: "/Events",
    buttonLabel: "View Event",
    image: "/images/events/card-halaqah.svg",
    recurring: true,
  },
  {
    id: "youth-development-night",
    title: "Youth Development Night",
    category: "youth",
    dateLabel: "Friday, August 15",
    date: "2026-08-15",
    time: "6:30 PM",
    location: "Location to be confirmed",
    description:
      "An engaging evening focused on faith, confidence, leadership, discussion, and connection for Muslim youth.",
    tags: ["Youth", "Registration Required"],
    href: "/Events/youth-gathering",
    buttonLabel: "Register",
    image: "/images/events/card-youth.svg",
  },
  {
    id: "family-community-gathering",
    title: "Family Community Gathering",
    category: "family",
    dateLabel: "Sunday, August 24",
    date: "2026-08-24",
    time: "1:00 PM",
    location: "Location to be confirmed",
    description:
      "A welcoming event for families to learn, connect, and participate in community activities.",
    tags: ["Family Friendly", "In Person"],
    href: "/Events/family-picnic",
    buttonLabel: "View Details",
    image: "/images/events/card-family.svg",
  },
  {
    id: "parenting-workshop",
    title: "Islamic Parenting Workshop",
    category: "education",
    dateLabel: "Saturday, September 6",
    date: "2026-09-06",
    time: "11:00 AM",
    location: "Online",
    description:
      "A practical workshop exploring faith-centred parenting, communication, character development, and family routines.",
    tags: ["Online", "Parents"],
    href: "/Contact",
    buttonLabel: "Register",
  },
  {
    id: "volunteer-day",
    title: "Community Volunteer Day",
    category: "volunteer",
    dateLabel: "Saturday, September 13",
    date: "2026-09-13",
    time: "10:00 AM",
    location: "Meeting point to be confirmed",
    description:
      "Join CIU volunteers in supporting a local community initiative through service and teamwork.",
    tags: ["Volunteer", "Community Service"],
    href: "/Services/volunteer",
    buttonLabel: "Volunteer",
  },
  {
    id: "academy-open-house",
    title: "Al-Azhar Academy Open House",
    category: "education",
    dateLabel: "Sunday, September 21",
    date: "2026-09-21",
    time: "2:00 PM",
    location: "Online",
    description:
      "Learn about Al-Azhar Academy, its educational approach, available classes, and registration process.",
    tags: ["Online", "Education"],
    href: "/Education",
    buttonLabel: "Learn More",
  },
  {
    id: "community-iftar-preview",
    title: "Community Information Session",
    category: "community",
    dateLabel: "Saturday, October 4",
    date: "2026-10-04",
    time: "3:00 PM",
    location: "Location to be confirmed",
    description:
      "An informational session about upcoming community programs, volunteer opportunities, and seasonal planning.",
    tags: ["Community", "In Person"],
    href: "/Contact",
    buttonLabel: "View Event",
  },
  {
    id: "sisters-study-circle",
    title: "Sisters Study Circle",
    category: "spiritual",
    dateLabel: "Every second Wednesday",
    time: "7:30 PM",
    location: "Online",
    description:
      "A recurring online study circle focused on reflection, discussion, and spiritual growth.",
    tags: ["Recurring", "Online"],
    href: "/Events",
    buttonLabel: "View Schedule",
    recurring: true,
  },
];

export const recurringProgramsContent = {
  id: "recurring-programs",
  label: "EVERY WEEK",
  heading: "Recurring Programs",
  subheading:
    "Stay connected through ongoing educational, spiritual, youth, and family programming.",
  note: "Recurring schedules may change during holidays, Ramadan, or special community periods.",
  programs: [
    {
      id: "weekly-halaqah",
      title: "Weekly Halaqah",
      frequency: "Every Friday",
      time: "7:00 PM",
      audience: "All adults",
      href: "/Events#upcoming-events",
    },
    {
      id: "sunday-school",
      title: "Sunday School",
      frequency: "Every Sunday",
      time: "11:00 AM",
      audience: "Children and youth",
      href: "/Education",
    },
    {
      id: "youth-circle",
      title: "Youth Circle",
      frequency: "Every second Saturday",
      time: "6:30 PM",
      audience: "Youth",
      href: "/Events/youth-gathering",
    },
    {
      id: "family-learning",
      title: "Family Learning Session",
      frequency: "Last Sunday of each month",
      time: "1:00 PM",
      audience: "Families",
      href: "/Events/family-picnic",
    },
  ] satisfies RecurringProgram[],
};

export const eventCalendarContent = {
  id: "event-calendar",
  heading: "Monthly Calendar",
  viewFullLabel: "View Full Calendar",
  viewFullHref: "#event-calendar",
  demoEvents: [
    { date: "2026-08-15", title: "Youth Development Night", time: "6:30 PM" },
    { date: "2026-08-24", title: "Family Community Gathering", time: "1:00 PM" },
    { date: "2026-09-06", title: "Islamic Parenting Workshop", time: "11:00 AM" },
    { date: "2026-09-13", title: "Community Volunteer Day", time: "10:00 AM" },
    { date: "2026-09-21", title: "Al-Azhar Academy Open House", time: "2:00 PM" },
  ] satisfies CalendarDemoEvent[],
};

export const eventCategoriesContent = {
  heading: "Events for Every Stage of Life",
  categories: [
    {
      id: "education",
      title: "Islamic Education",
      description: "Classes, workshops, seminars, and learning opportunities.",
      filterCategory: "education",
      href: "/Events?category=education",
    },
    {
      id: "youth",
      title: "Youth Programs",
      description: "Faith, identity, mentorship, leadership, and social activities.",
      filterCategory: "youth",
      href: "/Events?category=youth",
    },
    {
      id: "family",
      title: "Family Events",
      description: "Gatherings, parenting workshops, and family-focused programs.",
      filterCategory: "family",
      href: "/Events?category=family",
    },
    {
      id: "spiritual",
      title: "Spiritual Gatherings",
      description: "Halaqahs, reminders, lectures, and opportunities for reflection.",
      filterCategory: "spiritual",
      href: "/Events?category=spiritual",
    },
    {
      id: "community-initiatives",
      title: "Community Initiatives",
      description: "Outreach activities, charitable programs, and community partnerships.",
      filterCategory: "community",
      href: "/Events?category=community",
    },
    {
      id: "volunteer",
      title: "Volunteer Opportunities",
      description: "Meaningful ways to serve and contribute your skills.",
      filterCategory: "volunteer",
      href: "/Events?category=volunteer",
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
      imageSrc: "/images/events/past-event-1.svg",
      imageAlt: "Placeholder — past CIU community gathering",
    },
    {
      id: "past-2",
      title: "Youth Leadership Session",
      dateLabel: "Summer 2026",
      category: "Youth",
      imageSrc: "/images/events/past-event-2.svg",
      imageAlt: "Placeholder — past CIU youth program",
    },
    {
      id: "past-3",
      title: "Family Learning Day",
      dateLabel: "Summer 2026",
      category: "Family",
      imageSrc: "/images/events/past-event-3.svg",
      imageAlt: "Placeholder — past CIU family event",
    },
    {
      id: "past-4",
      title: "Islamic Education Workshop",
      dateLabel: "2026",
      category: "Education",
      imageSrc: "/images/events/past-event-4.svg",
      imageAlt: "Placeholder — past CIU educational workshop",
    },
    {
      id: "past-5",
      title: "Volunteer Outreach Initiative",
      dateLabel: "2026",
      category: "Volunteer",
      imageSrc: "/images/events/past-event-5.svg",
      imageAlt: "Placeholder — past CIU volunteer initiative",
    },
    {
      id: "past-6",
      title: "Community Halaqah Series",
      dateLabel: "2026",
      category: "Spiritual",
      imageSrc: "/images/events/past-event-6.svg",
      imageAlt: "Placeholder — past CIU halaqah gathering",
    },
  ] satisfies PastEventItem[],
};

export const hostEventContent = {
  id: "host-event",
  label: "COLLABORATE WITH US",
  heading: "Host or Support a Community Event",
  body: "CIU welcomes opportunities to collaborate with educators, scholars, volunteers, nonprofit organizations, community groups, and service providers on initiatives that align with its mission and values.",
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
  imageAlt: "Placeholder — CIU community partnership event",
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
