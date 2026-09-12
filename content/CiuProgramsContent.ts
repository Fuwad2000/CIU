import { kidsRegistrationHref, programRegistrationFormUrl, quranRegistrationHref } from "@/content/RegistrationLinks";

export const ciuProgramPosterImages = {
  quran:
    "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785118836/CIU_Quran_otnkdt.png",
  weekendClass:
    "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785118836/CIU_Weekend_Class_kody05.png",
} as const;

export const ciuProgramKidsImages = {
  kids01: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785028168/kids-01_oldgl7.jpg",
  kids02: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785028172/kids-02_j3nuxm.jpg",
  kids03: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785028176/kids-03_vjaaof.jpg",
  kids04: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785028180/kids-04_oulpfn.jpg",
  kidsClassroom: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785024103/Islamic_Arabic_calligraphy_ed7v65.webp",
  /** Community classroom session — program location section */
  classroom:
    "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020769/AA684D23-C680-4CF2-9EC4-6EE9C152005C_vhdyyd.jpg",
} as const;

export type CiuProgramPoster = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  registrationHref: string;
  buttonLabel: string;
};

export const ciuProgramsContent = {
  hero: {
    label: "CIU EDUCATION",
    heading: "CIU Programs",
    intro:
      "Weekend Quran classes and kids programs at the Canadian Islamic Centre — practical Islamic learning for children and families in a welcoming community setting.",
    imageSrc: ciuProgramKidsImages.kidsClassroom,
    imageAlt: "Islamic Arabic calligraphy stencils for Muhammad and Allah on a wooden surface",
  },
  overview: {
    label: "About CIU Programs",
    heading: "Weekend Quran & Kids Classes",
    paragraphs: [
      "While Azhar Canada College delivers Al-Azhar accredited diploma and course offerings, CIU directly hosts evening Quran classes and weekend children's programs at the Canadian Islamic Centre in Mississauga.",
      "These programs give learners of all ages a chance to connect with Islam, build Quranic literacy, and grow alongside peers in a modern, nurturing environment rooted in community.",
    ],
    highlights: [
      "Evening Quran classes on Tuesday and Thursday",
      "Weekend school for grades 1 through 12",
      "Programs hosted at the Canadian Islamic Centre",
      "Welcoming environment for families across the GTA",
    ],
    imageSrc: ciuProgramKidsImages.kids01,
    imageAlt: "Students studying at tables during a CIU kids program classroom session",
  },
  postersHeading: "Registration & Program Details",
  postersSubheading:
    "View the program posters below and register using the shared registration form.",
  posters: [
    {
      id: "ciu-quran-class",
      title: "CIU Quran Class",
      imageSrc: ciuProgramPosterImages.quran,
      imageAlt: "CIU Quran Class poster — Tuesday and Thursday evenings",
      registrationHref: quranRegistrationHref,
      buttonLabel: "Register Now",
    },
    {
      id: "ciu-weekend-kids-class",
      title: "Weekend School Registration",
      imageSrc: ciuProgramPosterImages.weekendClass,
      imageAlt: "CIU weekend school registration poster for grades 1 through 12",
      registrationHref: kidsRegistrationHref,
      buttonLabel: "Register Now",
    },
  ] satisfies CiuProgramPoster[],
  galleryHeading: "Kids Program in Action",
  gallerySubheading: "Photos from CIU kids classes and weekend learning sessions.",
  gallery: [
    {
      id: "kids-01",
      title: "Classroom Session",
      imageSrc: ciuProgramKidsImages.kids01,
      imageAlt: "Students studying at tables during a CIU kids program classroom session",
    },
    {
      id: "kids-02",
      title: "Learning Activity",
      imageSrc: ciuProgramKidsImages.kids02,
      imageAlt: "Children engaged in learning during a CIU kids program session",
    },
    {
      id: "kids-03",
      title: "Program Gathering",
      imageSrc: ciuProgramKidsImages.kids03,
      imageAlt: "Young students gathered during a CIU kids program at the centre",
    },
    {
      id: "kids-04",
      title: "Student Portrait",
      imageSrc: ciuProgramKidsImages.kids04,
      imageAlt: "Student portrait from the CIU kids program",
    },
  ],
  location: {
    title: "Program Location",
    body: "CIU Quran and weekend school classes are held at the Canadian Islamic Centre in Mississauga.",
    addressLines: ["6185 Tomken Rd #6", "Mississauga, ON L5T 1X6, Canada"],
    mapHref: "https://maps.google.com/?q=6185+Tomken+Rd+Mississauga+ON",
    imageSrc: ciuProgramKidsImages.classroom,
    imageAlt: "Families and students gathered for a CIU weekend program at the Canadian Islamic Centre",
  },
  cta: {
    label: "Get Started",
    heading: "Register for CIU Programs",
    subheading:
      "Use the registration form to sign up for evening Quran classes or weekend school for grades 1 through 12.",
    primary: {
      label: "Register Now",
      href: programRegistrationFormUrl,
    },
    secondary: {
      label: "Browse Azhar Canada College",
      href: "/Education/azhar",
    },
    media: {
      label: "View Photos & Videos",
      href: "/Media/images",
    },
  },
};
