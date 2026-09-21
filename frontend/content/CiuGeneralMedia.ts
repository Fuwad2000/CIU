import { imagePlaceholder } from "./imagePlaceholder";
import { azharCanadaPosterImage } from "@frontend/content/EducationContent";
import {
  ciuProgramKidsImages,
  ciuProgramPosterImages,
} from "@frontend/content/CiuProgramsContent";

type PhotoSeed = {
  id: string;
  title: string;
  album: string;
  category:
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
  dateLabel: string;
  imageSrc: string;
  imageAlt: string;
  variant?: "photo" | "poster";
};

type VideoSeed = {
  id: string;
  title: string;
  album: string;
  category:
    | "events"
    | "education"
    | "community"
    | "ramadan"
    | "ciu-programs"
    | "kids"
    | "volunteer"
    | "general"
    | "azhar";
  dateLabel: string;
  videoSrc: string;
  posterSrc?: string;
};

import manifest from "./ciu-general-manifest.json";

const azharCollegePhotos: PhotoSeed[] = [
  {
    id: "azhar-hadith-sciences",
    title: "Uloom Al-Hadith (Hadith Sciences)",
    album: "Azhar Canada College",
    category: "azhar",
    dateLabel: "UH101 · Azhar Canada College",
    imageSrc: azharCanadaPosterImage,
    imageAlt: "Azhar Canada College poster for Uloom Al-Hadith Hadith Sciences course UH101",
    variant: "poster",
  },
  {
    id: "azhar-aqeedah-foundations",
    title: "Aqeedah 101 – Foundations",
    album: "Azhar Canada College",
    category: "azhar",
    dateLabel: "Azhar Canada College",
    imageSrc: azharCanadaPosterImage,
    imageAlt: "Azhar Canada College poster for Aqeedah 101 Foundations introductory course",
    variant: "poster",
  },
  {
    id: "azhar-course-poster-03",
    title: "Azhar Canada College Course Offering",
    album: "Azhar Canada College",
    category: "azhar",
    dateLabel: "Azhar Canada College",
    imageSrc: azharCanadaPosterImage,
    imageAlt: "Azhar Canada College program registration poster",
    variant: "poster",
  },
  {
    id: "azhar-course-poster-04",
    title: "Azhar Canada College Course Offering",
    album: "Azhar Canada College",
    category: "azhar",
    dateLabel: "Azhar Canada College",
    imageSrc: azharCanadaPosterImage,
    imageAlt: "Azhar Canada College educational program poster",
    variant: "poster",
  },
  {
    id: "azhar-course-poster-05",
    title: "Azhar Canada College Course Offering",
    album: "Azhar Canada College",
    category: "azhar",
    dateLabel: "Azhar Canada College",
    imageSrc: azharCanadaPosterImage,
    imageAlt: "Azhar Canada College course registration poster",
    variant: "poster",
  },
];

const ciuProgramPhotos: PhotoSeed[] = [
  {
    id: "kids-classroom-session",
    title: "Kids Program Classroom",
    album: "CIU Kids Program",
    category: "kids",
    dateLabel: "2024–2025",
    imageSrc: ciuProgramKidsImages.kids01,
    imageAlt: "Students studying at tables during a CIU kids program classroom session",
  },
  {
    id: "kids-learning-activity",
    title: "Kids Learning Activity",
    album: "CIU Kids Program",
    category: "kids",
    dateLabel: "2024–2025",
    imageSrc: ciuProgramKidsImages.kids02,
    imageAlt: "Children engaged in learning during a CIU kids program session",
  },
  {
    id: "kids-program-gathering",
    title: "Kids Program Gathering",
    album: "CIU Kids Program",
    category: "kids",
    dateLabel: "2024–2025",
    imageSrc: ciuProgramKidsImages.kids03,
    imageAlt: "Young students gathered during a CIU kids program at the centre",
  },
  {
    id: "kids-program-portrait",
    title: "Kids Program Portrait",
    album: "CIU Kids Program",
    category: "kids",
    dateLabel: "2024–2025",
    imageSrc: ciuProgramKidsImages.kids04,
    imageAlt: "Student portrait from the CIU kids program",
  },
  {
    id: "ciu-weekend-school-registration",
    title: "Weekend School Registration",
    album: "CIU Weekend Programs",
    category: "ciu-programs",
    dateLabel: "September 2024",
    imageSrc: ciuProgramPosterImages.weekendClass,
    imageAlt: "CIU weekend school registration poster for grades 1 through 12",
    variant: "poster",
  },
  {
    id: "ciu-quran-class-poster",
    title: "CIU Quran Class",
    album: "CIU Weekend Programs",
    category: "ciu-programs",
    dateLabel: "Tuesday & Thursday",
    imageSrc: ciuProgramPosterImages.quran,
    imageAlt: "CIU Quran Class poster — Tuesday and Thursday evenings",
    variant: "poster",
  },
];

const volunteerPhotos: PhotoSeed[] = [
  {
    id: "volunteer-senior-program",
    title: "Senior Volunteers Program",
    album: "CIU Volunteer Initiatives",
    category: "volunteer",
    dateLabel: "CIU",
    imageSrc: imagePlaceholder("/media/ciu-general/volunteer/volunteer-01.jpeg"),
    imageAlt: "CIU senior volunteers program poster — serving seniors in unity",
    variant: "poster",
  },
  {
    id: "volunteer-community-service",
    title: "Community Volunteer Service",
    album: "CIU Volunteer Initiatives",
    category: "volunteer",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/volunteer/volunteer-02.jpeg"),
    imageAlt: "CIU volunteers serving the community",
  },
  {
    id: "volunteer-outreach",
    title: "Volunteer Outreach",
    album: "CIU Volunteer Initiatives",
    category: "volunteer",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/volunteer/volunteer-03.jpeg"),
    imageAlt: "CIU volunteer outreach and community engagement",
  },
];

const generalCommunityPhotos: PhotoSeed[] = [
  {
    id: "ciu-logo",
    title: "Canadian Islamic Union",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "CIU",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-01.jpg"),
    imageAlt: "Canadian Islamic Union and Canadian Islamic Centre logo",
  },
  {
    id: "ciu-planning-meeting",
    title: "Facility Planning Session",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-02.jpg"),
    imageAlt: "CIU leadership meeting to discuss facility and community planning",
  },
  {
    id: "ciu-weekend-classroom",
    title: "Weekend Classroom Session",
    album: "CIU Community Life",
    category: "ciu-programs",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-03.jpg"),
    imageAlt: "Families and students seated for a CIU weekend classroom session",
  },
  {
    id: "ciu-community-moment-04",
    title: "Community Gathering",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-04.jpg"),
    imageAlt: "Community members gathered at the Canadian Islamic Centre",
  },
  {
    id: "ciu-marriage-101-seminar",
    title: "Marriage 101 — Financial Independence",
    album: "CIU Seminars & Events",
    category: "events",
    dateLabel: "June 2024",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-05.jpg"),
    imageAlt: "Imam Ashraf presenting Marriage 101 Financial Independence at CIU",
  },
  {
    id: "ciu-community-moment-06",
    title: "Centre Community Life",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-06.jpg"),
    imageAlt: "Community life at the Canadian Islamic Centre",
  },
  {
    id: "ciu-community-moment-07",
    title: "Community Learning Space",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-07.jpg"),
    imageAlt: "Learning and gathering space at the Canadian Islamic Centre",
  },
  {
    id: "ciu-marriage-101-group",
    title: "Marriage 101 — The Wealth of Wisdom",
    album: "CIU Seminars & Events",
    category: "events",
    dateLabel: "June 2024",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-08.jpg"),
    imageAlt: "Group photo from CIU Marriage 101 seminar with Imam Ashraf and community members",
  },
  {
    id: "ciu-community-moment-09",
    title: "Community Program Moment",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-09.jpg"),
    imageAlt: "Community program moment at CIU",
  },
  {
    id: "ciu-community-moment-10",
    title: "Community Program Moment",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-10.jpg"),
    imageAlt: "Community members at a CIU program",
  },
  {
    id: "ciu-community-moment-11",
    title: "Community Program Moment",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-11.jpg"),
    imageAlt: "Community gathering at the Canadian Islamic Centre",
  },
  {
    id: "ciu-community-moment-12",
    title: "Community Program Moment",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-12.jpg"),
    imageAlt: "Community life and programs at CIU",
  },
  {
    id: "ciu-community-moment-13",
    title: "CIU Community Graphic",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "CIU",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-13.png"),
    imageAlt: "Canadian Islamic Union community graphic",
  },
  {
    id: "ciu-community-moment-14",
    title: "Community Program Moment",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-14.jpg"),
    imageAlt: "Community members at the Canadian Islamic Centre",
  },
  {
    id: "ciu-community-moment-15",
    title: "Community Program Moment",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-15.jpg"),
    imageAlt: "Community program at CIU",
  },
  {
    id: "ciu-community-moment-16",
    title: "Community Program Moment",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-16.jpg"),
    imageAlt: "Community gathering and fellowship at CIU",
  },
  {
    id: "ciu-community-moment-17",
    title: "Community Program Moment",
    album: "CIU Community Life",
    category: "general",
    dateLabel: "2024–2025",
    imageSrc: imagePlaceholder("/media/ciu-general/general/photos/general-17.jpg"),
    imageAlt: "Community life at the Canadian Islamic Centre",
  },
];

export const ciuGeneralGalleryItems: PhotoSeed[] = [
  ...azharCollegePhotos,
  ...ciuProgramPhotos,
  ...volunteerPhotos,
  ...generalCommunityPhotos,
];

const kidsPosterPaths = [
  ciuProgramKidsImages.kids01,
  ciuProgramKidsImages.kids02,
  ciuProgramKidsImages.kids03,
  ciuProgramKidsImages.kids04,
];

function titleCase(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildVideoTitle(entry: (typeof manifest.videos)[number], kidsIndex: number) {
  if (entry.category === "kids") {
    const labels = [
      "Kids Program Session",
      "Kids Program Activity",
      "Kids Classroom Moment",
      "Kids Program Gathering",
      "Weekend Kids Class",
      "Kids Learning Session",
      "Kids Program Highlights",
      "Kids Class Footage",
      "Kids Program Recording",
    ];
    return labels[kidsIndex % labels.length];
  }

  return titleCase(entry.title);
}

let kidsVideoIndex = 0;

export const ciuGeneralVideoItems: VideoSeed[] = manifest.videos
  .filter((entry) => !entry.excludedFromGallery && entry.videoSrc)
  .map((entry) => {
    const kidsIndex = entry.category === "kids" ? kidsVideoIndex : -1;
    const posterSrc =
      entry.category === "kids"
        ? kidsPosterPaths[kidsVideoIndex++ % kidsPosterPaths.length]
        : undefined;

    return {
      id: entry.id,
      title: buildVideoTitle(entry, kidsIndex),
      album: entry.album,
      category: entry.category as VideoSeed["category"],
      dateLabel: entry.dateLabel,
      videoSrc: entry.videoSrc,
      ...(posterSrc ? { posterSrc } : {}),
    };
  });

export const ciuGeneralMediaImages = {
  azharHero: azharCanadaPosterImage,
  ciuProgramsHero: ciuProgramPosterImages.weekendClass,
  volunteerHero: imagePlaceholder("/media/ciu-general/volunteer/volunteer-01.jpeg"),
  kidsClassroom: ciuProgramKidsImages.kids01,
  communitySeminar: imagePlaceholder("/media/ciu-general/general/photos/general-08.jpg"),
} as const;
