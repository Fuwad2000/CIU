export type MediaGalleryCategory = "all" | "events" | "education" | "community" | "ramadan";

export type MediaGalleryItem = {
  id: string;
  title: string;
  category: Exclude<MediaGalleryCategory, "all">;
  dateLabel: string;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
};

export type MediaLectureItem = {
  id: string;
  title: string;
  speaker: string;
  dateLabel: string;
  duration: string;
  category: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export const mediaImages = {
  hero: "/images/home/home_hero1.png",
  lecturesHero: "/images/home/home_hero2.png",
} as const;

export const mediaHubContent = {
  hero: {
    label: "CIU MEDIA",
    heading: "Stories, Photos, and Learning",
    intro:
      "Browse community photos and recorded lectures from CIU programs, events, and gatherings.",
    imageSrc: mediaImages.hero,
    imageAlt: "CIU community event photography",
  },
  cards: [
    {
      id: "images",
      title: "CIU Images",
      description:
        "Photo galleries from events, education programs, community gatherings, and volunteer initiatives.",
      href: "/Media/images",
      buttonLabel: "Browse Galleries",
      imageSrc: "/images/home/gallery-1.svg",
      imageAlt: "Sample community photo gallery",
    },
    {
      id: "lectures",
      title: "CIU Lectures",
      description:
        "Recorded talks, reminders, and educational sessions shared by CIU speakers and guests.",
      href: "/Media/lectures",
      buttonLabel: "Watch Lectures",
      imageSrc: "/images/home/program-academy.svg",
      imageAlt: "Sample lecture media layout",
    },
  ],
  featuredHeading: "Recent Highlights",
  featuredSubheading: "Sample media items showing how galleries and lectures will appear on the site.",
};

export const mediaImagesPageContent = {
  hero: {
    label: "CIU IMAGES",
    heading: "Community Photo Galleries",
    intro:
      "Explore moments from CIU life. Galleries can be grouped by event, program, or season.",
    imageSrc: "/images/home/home_hero3.png",
    imageAlt: "Community photography from CIU events",
  },
  filters: [
    { id: "all", label: "All Photos" },
    { id: "events", label: "Events" },
    { id: "education", label: "Education" },
    { id: "community", label: "Community" },
    { id: "ramadan", label: "Ramadan" },
  ] as const,
  note:
    "Sample layout only. Replace images and album details with approved CIU media before publishing.",
};

export const mediaGalleryItems: MediaGalleryItem[] = [
  {
    id: "family-gathering",
    title: "Family Community Gathering",
    category: "events",
    dateLabel: "Summer 2026",
    imageSrc: "/images/home/home_hero3.png",
    imageAlt: "Families gathered at a CIU community event",
    featured: true,
  },
  {
    id: "education-day",
    title: "Islamic Education Day",
    category: "education",
    dateLabel: "Spring 2026",
    imageSrc: "/images/home/home_hero2.png",
    imageAlt: "Students and teachers in an educational session",
  },
  {
    id: "volunteer-drive",
    title: "Volunteer Outreach",
    category: "community",
    dateLabel: "Winter 2026",
    imageSrc: "/images/home/home_hero4.png",
    imageAlt: "CIU volunteers serving the community",
  },
  {
    id: "community-iftar",
    title: "Community Iftar",
    category: "ramadan",
    dateLabel: "Ramadan 2026",
    imageSrc: "/images/home/gallery-5.svg",
    imageAlt: "Community iftar gathering",
  },
  {
    id: "youth-program",
    title: "Youth Program Night",
    category: "education",
    dateLabel: "Fall 2026",
    imageSrc: "/images/home/gallery-2.svg",
    imageAlt: "Youth program activity",
  },
  {
    id: "open-house",
    title: "Community Open House",
    category: "events",
    dateLabel: "Summer 2026",
    imageSrc: "/images/home/gallery-3.svg",
    imageAlt: "Community open house event",
  },
  {
    id: "halaqah",
    title: "Weekly Halaqah",
    category: "community",
    dateLabel: "Ongoing",
    imageSrc: "/images/events/card-halaqah.svg",
    imageAlt: "Weekly learning circle",
  },
  {
    id: "ramadan-program",
    title: "Ramadan Program Series",
    category: "ramadan",
    dateLabel: "Ramadan 2026",
    imageSrc: "/images/home/gallery-6.svg",
    imageAlt: "Ramadan program gathering",
  },
];

export const mediaLecturesPageContent = {
  hero: {
    label: "CIU LECTURES",
    heading: "Recorded Talks and Reminders",
    intro:
      "A sample lecture library layout for CIU audio and video content. Replace placeholders with approved recordings.",
    imageSrc: mediaImages.lecturesHero,
    imageAlt: "Islamic lecture and learning session",
  },
  filters: ["All", "Faith", "Family", "Community", "Youth"] as const,
  note:
    "Video links and recordings are placeholders until CIU media files are uploaded and approved.",
};

export const mediaLectureItems: MediaLectureItem[] = [
  {
    id: "faith-and-family",
    title: "Faith and Family in Daily Life",
    speaker: "CIU Guest Speaker",
    dateLabel: "January 2026",
    duration: "42 min",
    category: "Family",
    description:
      "A reminder on building strong families through faith, patience, and intentional connection.",
    imageSrc: "/images/home/program-family.svg",
    imageAlt: "Family-focused lecture placeholder",
    href: "#",
  },
  {
    id: "community-responsibility",
    title: "Our Responsibility to the Community",
    speaker: "CIU Community Talk",
    dateLabel: "December 2025",
    duration: "35 min",
    category: "Community",
    description:
      "Reflections on service, volunteerism, and supporting one another as a community.",
    imageSrc: "/images/home/program-community.svg",
    imageAlt: "Community lecture placeholder",
    href: "#",
  },
  {
    id: "youth-character",
    title: "Character and Confidence for Youth",
    speaker: "CIU Youth Program",
    dateLabel: "November 2025",
    duration: "28 min",
    category: "Youth",
    description:
      "Guidance for youth on identity, character, and staying grounded in faith.",
    imageSrc: "/images/home/program-youth.svg",
    imageAlt: "Youth lecture placeholder",
    href: "#",
  },
  {
    id: "mercy-and-service",
    title: "Mercy, Service, and Sincerity",
    speaker: "CIU Friday Reminder",
    dateLabel: "October 2025",
    duration: "31 min",
    category: "Faith",
    description:
      "A short reminder on sincerity in worship and service to others.",
    imageSrc: "/images/events/card-halaqah.svg",
    imageAlt: "Faith reminder lecture placeholder",
    href: "#",
  },
];
