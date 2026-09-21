import { ciuCommunityImages, islamicThemeImages } from "@frontend/content/SiteMediaImages";
import {
  youtubeLectures,
  youtubeShortItems,
} from "@frontend/content/MediaVideosContent";

export type MediaGalleryCategory = "all" | "ciu-community" | "islamic-themes";

export type MediaGalleryItem = {
  id: string;
  title: string;
  category: Exclude<MediaGalleryCategory, "all">;
  imageSrc: string;
  imageAlt: string;
  variant?: "photo" | "poster";
};

export type MediaVideoItem = {
  id: string;
  title: string;
  embedSrc: string;
  watchHref: string;
};

export type MediaLectureItem = {
  id: string;
  title: string;
  embedSrc: string;
  watchHref: string;
};

export const mediaImages = {
  hero: ciuCommunityImages[0].imageSrc,
  lecturesHero: ciuCommunityImages[9].imageSrc,
} as const;

export const mediaHubContent = {
  hero: {
    label: "CIU MEDIA",
    heading: "Stories, Photos, and Learning",
    intro:
      "Browse community photos from CIU programs and events, Islamic reminders, and recorded lectures.",
    imageSrc: mediaImages.hero,
    imageAlt: "CIU community event photography",
  },
  cards: [
    {
      id: "images",
      title: "CIU Images",
      description:
        "Photos from CIU programs, events, kids classes, and volunteer initiatives — plus Islamic reminder graphics.",
      href: "/Media/images",
      buttonLabel: "Browse Photos",
      imageSrc: ciuCommunityImages[4].imageSrc,
      imageAlt: "Community members gathered at the Canadian Islamic Centre",
    },
    {
      id: "lectures",
      title: "CIU Lectures",
      description: "Recorded talks, shorts, and educational sessions from CIU speakers.",
      href: "/Media/lectures",
      buttonLabel: "Watch Lectures",
      imageSrc: ciuCommunityImages[9].imageSrc,
      imageAlt: "Sheikh Ashraf presenting at a CIU workshop",
    },
  ],
  featuredHeading: "Recent Highlights",
  featuredSubheading: "Photos from CIU education programs, community events, and gatherings at the centre.",
};

export const mediaImagesPageContent = {
  hero: {
    label: "CIU IMAGES",
    heading: "Community Photos & Shorts",
    intro:
      "Explore CIU centre photos alongside Islamic reminder graphics. Filter by CIU & masjid community images or Islamic gallery themes.",
    imageSrc: ciuCommunityImages[16].imageSrc,
    imageAlt: "Prayer hall at the Canadian Islamic Centre",
  },
  viewTabs: [
    { id: "photos", label: "Photos" },
    { id: "videos", label: "Shorts" },
  ] as const,
  note: "Filter photos by CIU & masjid community images or Islamic gallery themes.",
};

const photoFilterLabels: Record<Exclude<MediaGalleryCategory, "all">, string> = {
  "ciu-community": "CIU & Masjid",
  "islamic-themes": "Islamic Themes",
};

const photoFilterOrder: Exclude<MediaGalleryCategory, "all">[] = [
  "ciu-community",
  "islamic-themes",
];

function toGalleryItem(
  item: (typeof ciuCommunityImages)[number] | (typeof islamicThemeImages)[number],
  category: Exclude<MediaGalleryCategory, "all">,
): MediaGalleryItem {
  return {
    id: item.id,
    title: item.title,
    category,
    imageSrc: item.imageSrc,
    imageAlt: item.imageAlt,
    ...("variant" in item && item.variant ? { variant: item.variant } : {}),
  };
}

export const mediaGalleryItems: MediaGalleryItem[] = [
  ...ciuCommunityImages.map((item) => toGalleryItem(item, "ciu-community")),
  ...islamicThemeImages.map((item) => toGalleryItem(item, "islamic-themes")),
];

export const mediaPhotoFilters = [
  { id: "all" as const, label: "All Photos" },
  ...photoFilterOrder.map((category) => ({
    id: category,
    label: photoFilterLabels[category],
  })),
];

export const mediaVideoItems: MediaVideoItem[] = [...youtubeShortItems];

export const mediaLecturesPageContent = {
  hero: {
    label: "CIU LECTURES",
    heading: "Recorded Talks & Sessions",
    intro: "Watch CIU lecture recordings from our YouTube playlist.",
    imageSrc: mediaImages.lecturesHero,
    imageAlt: "Sheikh Ashraf presenting at a CIU workshop",
  },
  note: "28 recorded lectures from the CIU YouTube playlist.",
};

export const mediaLectureItems: MediaLectureItem[] = [...youtubeLectures];
