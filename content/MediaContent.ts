export type MediaGalleryCategory =
  | "all"
  | "events"
  | "education"
  | "community"
  | "ramadan"
  | "posters"
  | "ciu-programs"
  | "kids"
  | "volunteer"
  | "general"
  | "azhar";

export type MediaVideoCategory = Exclude<MediaGalleryCategory, "all" | "posters">;

export type MediaVideoItem = {
  id: string;
  title: string;
  album: string;
  category: MediaVideoCategory;
  dateLabel: string;
  videoSrc: string;
  posterSrc?: string;
};

import {
  ciuGeneralGalleryItems,
  ciuGeneralVideoItems,
} from "./CiuGeneralMedia";

export type MediaGalleryItem = {
  id: string;
  title: string;
  album: string;
  category: Exclude<MediaGalleryCategory, "all">;
  dateLabel: string;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
  variant?: "photo" | "poster";
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
  hero: "/media/pictures/azhar_canada_06.jpg",
  lecturesHero: "/media/pictures/azhar_canada_04.jpg",
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
      title: "CIU Images & Videos",
      description:
        "Photo and video galleries from CIU programs, Azhar Canada, community events, kids classes, and volunteer initiatives.",
      href: "/Media/images",
      buttonLabel: "Browse Photos & Videos",
      imageSrc: "/media/pictures/azhar_canada_01.jpg",
      imageAlt: "Students learning in an Islamic education classroom",
    },
    {
      id: "lectures",
      title: "CIU Lectures",
      description:
        "Recorded talks, reminders, and educational sessions shared by CIU speakers and guests.",
      href: "/Media/lectures",
      buttonLabel: "Watch Lectures",
      imageSrc: "/media/pictures/azhar_canada_04.jpg",
      imageAlt: "Guest speaker delivering a lecture at the Islamic centre",
    },
  ],
  featuredHeading: "Recent Highlights",
  featuredSubheading:
    "Photos from CIU education programs, community events, and gatherings at the centre.",
};

export const mediaImagesPageContent = {
  hero: {
    label: "CIU IMAGES",
    heading: "Community Photos & Videos",
    intro:
      "Explore community photos and videos from CIU programs, Azhar Canada, volunteer initiatives, kids classes, and life at the centre.",
    imageSrc: "/media/pictures/azhar_canada_11.jpg",
    imageAlt: "Community members attending a learning workshop",
  },
  viewTabs: [
    { id: "photos", label: "Photos" },
    { id: "videos", label: "Videos" },
  ] as const,
  note:
    "Use All Photos or All Videos to browse everything at once, or filter by category to explore albums grouped by program or event.",
};

const photoFilterLabels: Record<Exclude<MediaGalleryCategory, "all">, string> = {
  "ciu-programs": "CIU Programs",
  kids: "Kids Program",
  azhar: "Azhar Canada",
  events: "Events",
  education: "Education",
  posters: "Posters",
  community: "Community",
  volunteer: "Volunteer",
  general: "General",
  ramadan: "Ramadan",
};

const videoFilterLabels: Record<MediaVideoCategory, string> = {
  "ciu-programs": "CIU Programs",
  kids: "Kids Program",
  azhar: "Azhar Canada",
  events: "Events",
  education: "Education",
  community: "Community",
  volunteer: "Volunteer",
  general: "General",
  ramadan: "Ramadan",
};

const photoFilterOrder: Exclude<MediaGalleryCategory, "all">[] = [
  "ciu-programs",
  "kids",
  "azhar",
  "events",
  "education",
  "posters",
  "community",
  "volunteer",
  "general",
  "ramadan",
];

const videoFilterOrder: MediaVideoCategory[] = [
  "kids",
  "ciu-programs",
  "events",
  "community",
  "general",
  "azhar",
  "volunteer",
  "education",
  "ramadan",
];

function buildMediaFilters<C extends string>(
  order: C[],
  labels: Record<C, string>,
  items: { category: C }[],
  allLabel: string,
) {
  const usedCategories = new Set(items.map((item) => item.category));

  return [
    { id: "all" as const, label: allLabel },
    ...order
      .filter((category) => usedCategories.has(category))
      .map((category) => ({ id: category, label: labels[category] })),
  ];
}

export const mediaVideoItems: MediaVideoItem[] = [...ciuGeneralVideoItems];

export const mediaGalleryItems: MediaGalleryItem[] = [
  {
    id: "hero-welcome",
    title: "Welcome to CIU",
    album: "Featured Highlights",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/home_hero_welcome.png",
    imageAlt: "Community members gathered at tables in the CIU hall for an educational event",
    featured: true,
  },
  {
    id: "hero-education",
    title: "Education Rooted in Faith",
    album: "Featured Highlights",
    category: "education",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/home_hero_education.png",
    imageAlt: "Collage of CIU students and teachers engaged in Islamic education",
  },
  {
    id: "hero-community",
    title: "Stronger Families, Stronger Communities",
    album: "Featured Highlights",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/home_hero_community.png",
    imageAlt: "Muslim families and community members gathered outdoors for prayer and fellowship",
  },
  {
    id: "hero-volunteer",
    title: "Serve, Connect, Make an Impact",
    album: "Featured Highlights",
    category: "events",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/home_hero_volunteer.png",
    imageAlt: "CIU volunteers serving the community through donations, education, and outreach",
  },
  {
    id: "classroom-session",
    title: "Classroom Learning Session",
    album: "Islamic Education & Classes",
    category: "education",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_01.jpg",
    imageAlt: "Teacher leading students in an Islamic education classroom with a world map on the wall",
  },
  {
    id: "extracurricular-flyer",
    title: "Extracurricular Programs",
    album: "Islamic Education & Classes",
    category: "education",
    dateLabel: "September 2024",
    imageSrc: "/media/pictures/azhar_canada_07.jpg",
    imageAlt: "Flyer for CIU extracurricular Islamic education including Hifz, Arabic, and Islamic studies",
  },
  {
    id: "learning-workshop",
    title: "Community Learning Workshop",
    album: "Islamic Education & Classes",
    category: "education",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_11.jpg",
    imageAlt: "Diverse group of students taking notes during a community learning workshop",
  },
  {
    id: "arabic-language-class",
    title: "Arabic Language Session",
    album: "Islamic Education & Classes",
    category: "education",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_12.jpg",
    imageAlt: "Teacher instructing students in an Arabic language and Islamic studies class",
  },
  {
    id: "guest-speaker-lecture",
    title: "Guest Speaker Lecture",
    album: "Community Events & Lectures",
    category: "events",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_04.jpg",
    imageAlt: "Guest speaker addressing the community with a microphone at the Islamic centre",
  },
  {
    id: "community-seminar",
    title: "Community Seminar",
    album: "Community Events & Lectures",
    category: "events",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_06.jpg",
    imageAlt: "Community members seated at tables during an indoor seminar at the centre",
  },
  {
    id: "community-presentation",
    title: "Community Presentation",
    album: "Community Events & Lectures",
    category: "events",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_15.jpg",
    imageAlt: "Speaker presenting from a podium during a community event at the Islamic centre",
  },
  {
    id: "youth-celebration",
    title: "Youth Celebration",
    album: "Youth & Community Life",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_02.jpg",
    imageAlt: "Young student smiling with colourful balloon stickers at a community event",
  },
  {
    id: "centre-gathering",
    title: "Community Centre Gathering",
    album: "Youth & Community Life",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_03.jpg",
    imageAlt: "Families and children gathered in the community centre multipurpose hall",
  },
  {
    id: "festive-student-portrait",
    title: "Festive Student Portrait",
    album: "Youth & Community Life",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_08.jpg",
    imageAlt: "Young student in a hijab holding a candy cane at the Canadian Islamic Centre",
  },
  {
    id: "academy-student-portrait",
    title: "Academy Student Portrait",
    album: "Youth & Community Life",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_16.jpg",
    imageAlt: "Smiling young student beside an Al-Azhar University banner at the academy",
  },
  {
    id: "sisters-gathering",
    title: "Sisters Gathering",
    album: "Sisters & Community Portraits",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_05.jpg",
    imageAlt: "Group of women sitting together in front of a world map at the community centre",
  },
  {
    id: "al-azhar-banner",
    title: "Al-Azhar University Close to Home",
    album: "Sisters & Community Portraits",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_09.jpg",
    imageAlt: "Community member beside the Al-Azhar University close to home promotional banner",
  },
  {
    id: "womens-gathering",
    title: "Women's Community Gathering",
    album: "Sisters & Community Portraits",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_17.jpg",
    imageAlt: "Group portrait of women from the community seated in front of a world map",
  },
  {
    id: "prayer-in-musalla",
    title: "Prayer in the Musalla",
    album: "Prayer Hall & Facilities",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_10.jpg",
    imageAlt: "Community member performing prayer in the musalla with ornate mihrab behind",
  },
  {
    id: "main-prayer-hall",
    title: "Main Prayer Hall",
    album: "Prayer Hall & Facilities",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_13.jpg",
    imageAlt: "Interior view of the main prayer hall with mihrab, microphone stand, and prayer carpet",
  },
  {
    id: "mihrab-and-minbar",
    title: "Mihrab and Minbar",
    album: "Prayer Hall & Facilities",
    category: "community",
    dateLabel: "2024–2025",
    imageSrc: "/media/pictures/azhar_canada_14.jpg",
    imageAlt: "Ornate mihrab and minbar with Arabic calligraphy in the prayer hall",
  },
  {
    id: "poster-programs-overview",
    title: "Our Programs Overview",
    album: "Program Overviews",
    category: "posters",
    dateLabel: "Azhar Canada",
    imageSrc: "/media/pictures/posters/azhar-programs-overview.jpg",
    imageAlt: "Azhar Canada programs overview for children, youth, and adults",
    variant: "poster",
  },
  {
    id: "poster-courses",
    title: "Azhar Canada Courses",
    album: "Program Overviews",
    category: "posters",
    dateLabel: "Azhar Canada",
    imageSrc: "/media/pictures/posters/azhar-canada-courses.jpg",
    imageAlt: "Overview of Azhar Canada course offerings",
    variant: "poster",
  },
  {
    id: "poster-arabic-language",
    title: "Arabic Language Course",
    album: "Courses & Diplomas",
    category: "posters",
    dateLabel: "Azhar Canada",
    imageSrc: "/media/pictures/posters/arabic-language-course.jpg",
    imageAlt: "Arabic language course registration poster",
    variant: "poster",
  },
  {
    id: "poster-islamic-sciences-diploma",
    title: "Intro to Islamic Sciences Diploma",
    album: "Courses & Diplomas",
    category: "posters",
    dateLabel: "Azhar Canada",
    imageSrc: "/media/pictures/posters/intro-islamic-sciences-diploma.jpg",
    imageAlt: "Introduction to Islamic sciences diploma program poster",
    variant: "poster",
  },
  {
    id: "poster-sisters-diploma-2026",
    title: "Sisters Islamic Diploma 2026",
    album: "Courses & Diplomas",
    category: "posters",
    dateLabel: "Azhar Canada",
    imageSrc: "/media/pictures/posters/sisters-islamic-diploma-2026.jpg",
    imageAlt: "Sisters Islamic diploma 2026 registration poster",
    variant: "poster",
  },
  {
    id: "poster-weekend-school",
    title: "Weekend School Registration",
    album: "Weekend School",
    category: "posters",
    dateLabel: "Azhar Canada",
    imageSrc: "/media/pictures/posters/weekend-school-registration-2024.jpg",
    imageAlt: "Weekend school registration poster for Azhar Canada",
    variant: "poster",
  },
  {
    id: "poster-weekend-school-details",
    title: "Weekend School Details",
    album: "Weekend School",
    category: "posters",
    dateLabel: "Azhar Canada",
    imageSrc: "/media/pictures/posters/weekend-school-registration-details-2024.jpg",
    imageAlt: "Weekend school registration details and schedule",
    variant: "poster",
  },
  {
    id: "poster-volunteers-needed",
    title: "Volunteers Needed",
    album: "Volunteer Opportunities",
    category: "posters",
    dateLabel: "Azhar Canada",
    imageSrc: "/media/pictures/posters/volunteers-needed.jpg",
    imageAlt: "Volunteer opportunities at Azhar Canada",
    variant: "poster",
  },
  {
    id: "poster-senior-volunteers",
    title: "Senior Volunteers",
    album: "Volunteer Opportunities",
    category: "posters",
    dateLabel: "Azhar Canada",
    imageSrc: "/media/pictures/posters/senior-volunteers.jpg",
    imageAlt: "Senior volunteer program poster",
    variant: "poster",
  },
  {
    id: "poster-high-school-volunteer-hours",
    title: "High School Volunteer Hours",
    album: "Volunteer Opportunities",
    category: "posters",
    dateLabel: "Azhar Canada",
    imageSrc: "/media/pictures/posters/high-school-volunteer-hours.jpg",
    imageAlt: "High school volunteer hours opportunity poster",
    variant: "poster",
  },
  ...ciuGeneralGalleryItems,
];

export const mediaPhotoFilters = buildMediaFilters(
  photoFilterOrder,
  photoFilterLabels,
  mediaGalleryItems,
  "All Photos",
);

export const mediaVideoFilters = buildMediaFilters(
  videoFilterOrder,
  videoFilterLabels,
  mediaVideoItems,
  "All Videos",
);

export const mediaLecturesPageContent = {
  hero: {
    label: "CIU LECTURES",
    heading: "Recorded Talks and Reminders",
    intro:
      "Browse recorded talks, reminders, and educational sessions from CIU speakers and community programs.",
    imageSrc: "/media/pictures/azhar_canada_04.jpg",
    imageAlt: "Guest speaker addressing the community at a CIU lecture",
  },
  filters: ["All", "Faith", "Family", "Community", "Youth"] as const,
  note:
    "Recorded talks and reminders from CIU speakers and community programs.",
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
    imageSrc: "/media/pictures/azhar_canada_17.jpg",
    imageAlt: "Women from the CIU community gathered together",
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
    imageSrc: "/media/pictures/azhar_canada_06.jpg",
    imageAlt: "Community members seated during a seminar at the centre",
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
    imageSrc: "/media/pictures/azhar_canada_16.jpg",
    imageAlt: "Smiling young student beside an Al-Azhar University banner",
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
    imageSrc: "/media/pictures/azhar_canada_04.jpg",
    imageAlt: "Guest speaker delivering a lecture at the Islamic centre",
    href: "#",
  },
];
