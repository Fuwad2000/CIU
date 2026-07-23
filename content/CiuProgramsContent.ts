export type CiuProgramPoster = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
};

export const ciuProgramsContent = {
  hero: {
    label: "CIU EDUCATION",
    heading: "CIU Programs",
    intro:
      "Weekend Quran classes and kids programs at the Canadian Islamic Centre — practical Islamic learning for children and families in a welcoming community setting.",
    imageSrc: "/media/ciu-general/ciu-programs/posters/poster-01.jpeg",
    imageAlt: "CIU weekend school registration poster for grades 1 through 12",
  },
  overview: {
    label: "About CIU Programs",
    heading: "Weekend Quran & Kids Classes",
    paragraphs: [
      "While Azhar Canada delivers Al-Azhar accredited diploma and course offerings, CIU directly hosts weekend Quran classes and children's programs at the Canadian Islamic Centre in Mississauga.",
      "These programs give young learners a chance to connect with Islam, build Quranic literacy, and grow alongside peers in a modern, nurturing environment rooted in community.",
    ],
    highlights: [
      "Weekend Quran classes for children and youth",
      "Kids program sessions with hands-on learning",
      "Programs hosted at the Canadian Islamic Centre",
      "Welcoming environment for families across the GTA",
    ],
  },
  programs: [
    {
      id: "weekend-quran",
      title: "Weekend Quran Class",
      description:
        "Structured weekend sessions focused on Quranic reading, memorization support, and building a love for the Quran in a community classroom setting.",
      schedule: "Saturday or Sunday · 11:00 AM – 2:00 PM",
      imageSrc: "/media/ciu-general/general/photos/general-03.jpg",
      imageAlt: "Families and students seated for a CIU weekend classroom session",
    },
    {
      id: "kids-program",
      title: "Kids Program",
      description:
        "Interactive classes for children that combine Islamic learning, classroom activities, and community connection in age-appropriate sessions.",
      schedule: "Weekend program sessions at the centre",
      imageSrc: "/media/ciu-general/ciu-programs/kids/kids-01.jpeg",
      imageAlt: "Students studying at tables during a CIU kids program classroom session",
    },
  ],
  postersHeading: "Registration & Program Details",
  postersSubheading:
    "Browse CIU weekend school registration posters and program information for grades 1 through 12.",
  posters: [
    {
      id: "weekend-school-registration",
      title: "Weekend School Registration",
      imageSrc: "/media/ciu-general/ciu-programs/posters/poster-01.jpeg",
      imageAlt: "CIU weekend school registration poster for grades 1 through 12",
    },
    {
      id: "weekend-school-details",
      title: "Weekend School Details",
      imageSrc: "/media/ciu-general/ciu-programs/posters/poster-02.jpeg",
      imageAlt: "CIU weekend school program details and schedule poster",
    },
  ] satisfies CiuProgramPoster[],
  galleryHeading: "Kids Program in Action",
  gallerySubheading: "Photos from CIU kids classes and weekend learning sessions.",
  gallery: [
    {
      id: "kids-01",
      title: "Classroom Session",
      imageSrc: "/media/ciu-general/ciu-programs/kids/kids-01.jpeg",
      imageAlt: "Students studying at tables during a CIU kids program classroom session",
    },
    {
      id: "kids-02",
      title: "Learning Activity",
      imageSrc: "/media/ciu-general/ciu-programs/kids/kids-02.jpeg",
      imageAlt: "Children engaged in learning during a CIU kids program session",
    },
    {
      id: "kids-03",
      title: "Program Gathering",
      imageSrc: "/media/ciu-general/ciu-programs/kids/kids-03.jpeg",
      imageAlt: "Young students gathered during a CIU kids program at the centre",
    },
    {
      id: "kids-04",
      title: "Student Portrait",
      imageSrc: "/media/ciu-general/ciu-programs/kids/kids-04.jpeg",
      imageAlt: "Student portrait from the CIU kids program",
    },
  ],
  location: {
    title: "Program Location",
    body: "CIU weekend Quran and kids classes are held at the Canadian Islamic Centre in Mississauga.",
    addressLines: ["6185 Tomken Rd #6", "Mississauga, ON L5T 1X6, Canada"],
    mapHref: "https://maps.google.com/?q=6185+Tomken+Rd+Mississauga+ON",
  },
  cta: {
    label: "Get Started",
    heading: "Register for CIU Weekend Programs",
    subheading:
      "Contact CIU to learn about weekend Quran classes, kids program registration, and upcoming session dates.",
    primary: {
      label: "Contact CIU",
      href: "/Contact",
    },
    secondary: {
      label: "Browse Azhar Programs",
      href: "/Education/azhar",
    },
    media: {
      label: "View Photos & Videos",
      href: "/Media/images",
    },
  },
};
