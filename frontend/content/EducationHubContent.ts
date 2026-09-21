import { azharCanadaPosterImage } from "@frontend/content/EducationContent";
import { ciuProgramPosterImages } from "@frontend/content/CiuProgramsContent";

export const educationHubContent = {
  hero: {
    label: "EDUCATION",
    heading: "Islamic Learning at CIU",
    intro:
      "CIU supports two complementary education paths — Azhar Canada College programs and CIU-hosted weekend Quran and kids classes at the Canadian Islamic Centre.",
    imageSrc: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785024108/Islamic_geometric_pattern_xws7o5.jpg",
    imageAlt: "Students learning during a CIU education program at the centre",
  },
  cards: [
    {
      id: "azhar",
      title: "Azhar Canada College",
      description:
        "Al-Azhar accredited diplomas, courses, and Islamic sciences programs delivered through Azhar Canada College — a CIU educational initiative.",
      href: "/Education/azhar",
      buttonLabel: "Explore Azhar Canada College",
      imageSrc: azharCanadaPosterImage,
      imageAlt: "Azhar Canada College Aqeedah 101 Foundations course poster",
    },
    {
      id: "ciu",
      title: "CIU Programs",
      description:
        "Weekend Quran classes and kids programs hosted directly by CIU at the Canadian Islamic Centre for children and families.",
      href: "/Education/ciu",
      buttonLabel: "Explore CIU Programs",
      imageSrc: ciuProgramPosterImages.weekendClass,
      imageAlt: "CIU weekend school registration poster",
    },
  ],
};
