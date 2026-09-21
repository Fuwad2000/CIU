import { imagePlaceholder } from "./imagePlaceholder";
import { kidsRegistrationHref, quranRegistrationHref } from "./RegistrationLinks";

/** @deprecated Use imagePlaceholder from ./imagePlaceholder */
export function homeImagePlaceholder(slot: string, width = 1200, height = 800): string {
  return imagePlaceholder(slot, width, height);
}

export type HeroSlide = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  label?: string;
  heading: string;
  text: string;
  primaryButton: { label: string; href: string; variant: "primary" | "gold" };
  secondaryButton?: { label: string; href: string; variant: "primary" | "gold" };
};

export type Pillar = {
  title: string;
  description: string;
  icon: "book" | "users" | "heart" | "hand";
};

export type Program = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export type Event = {
  name: string;
  dateLabel: string;
  time: string;
  description: string;
  location: string;
  href: string;
  buttonLabel?: string;
};

export type ImpactStat = {
  value: number;
  suffix?: string;
  label: string;
  icon: "users" | "graduation-cap" | "hand-heart" | "sparkles";
};

export type GalleryItem = {
  imageSrc: string;
  imageAlt: string;
  /** Shown in gold uppercase above the image name — defaults to "Community Moment". */
  label?: string;
  title: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "welcome",
    imageSrc:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020442/home_hero1_xnh8ra.png",
    imageAlt: "Community members gathered at tables in the CIU hall for an educational event",
    label: "السلام عليكم",
    heading: "Canadian Islamic Union",
    text: "A registered charity organization dedicated to faith, family, and community across Canada.",
    primaryButton: {
      label: "Explore Our Programs",
      href: "/Services",
      variant: "primary",
    },
    secondaryButton: {
      label: "Support Our Mission",
      href: "/Donate",
      variant: "gold",
    },
  },
  {
    id: "education",
    imageSrc:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020530/home_hero2_mgconp.png",
    imageAlt: "Collage of CIU students and teachers engaged in Islamic education",
    label: "EDUCATION",
    heading: "Education Rooted in Faith",
    text: "Providing meaningful Islamic education that nurtures knowledge, character, confidence, and spiritual growth.",
    primaryButton: {
      label: "Discover Our Programs",
      href: "/Services",
      variant: "primary",
    },
  },
  {
    id: "families",
    imageSrc:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020567/home_hero3_p38cwf.png",
    imageAlt: "Muslim families and community members gathered outdoors for prayer and fellowship",
    label: "COMMUNITY",
    heading: "Stronger Families. Stronger Communities.",
    text: "Creating opportunities for Muslim families to learn, connect, grow, and support one another.",
    primaryButton: {
      label: "Learn About CIU",
      href: "/About",
      variant: "primary",
    },
  },
  {
    id: "volunteers",
    imageSrc:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020581/home_hero4_j6vzhr.png",
    imageAlt: "CIU volunteers serving the community through donations, education, and outreach",
    label: "VOLUNTEER",
    heading: "Serve. Connect. Make an Impact.",
    text: "Join our volunteers and community partners as we work together to create lasting positive change.",
    primaryButton: {
      label: "Get Involved",
      href: "/Services/volunteer",
      variant: "primary",
    },
  },
];

export const aboutPreviewContent = {
  imageSrc:
    "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785021386/about-community_peqwp7.jpg",
  imageAlt: "Diverse community members attending a learning workshop at CIU",
  label: "WHO WE ARE",
  heading: "Faith, Knowledge and Community",
  paragraphs: [
    "The Canadian Islamic Union is a registered charity organization dedicated to strengthening Muslim individuals and families through education, mentorship, spiritual development, charitable initiatives, and community service.",
    "We aim to create a welcoming environment where people of all ages can deepen their understanding of Islam, build meaningful relationships, and contribute positively to Canadian society.",
  ],
  button: { label: "Learn More About CIU", href: "/About" },
};

export const missionPillarsContent = {
  heading: "Guided by Purpose",
  subheading:
    "Our work is centred around four areas that support individuals, families, and the wider community.",
  pillars: [
    {
      title: "Islamic Education",
      description:
        "Providing accessible and authentic Islamic learning for children, youth, adults, and families.",
      icon: "book",
    },
    {
      title: "Mentorship",
      description:
        "Supporting personal, spiritual, and leadership development through qualified teachers and mentors.",
      icon: "users",
    },
    {
      title: "Family and Community",
      description:
        "Creating welcoming spaces where families can connect, grow, and support one another.",
      icon: "heart",
    },
    {
      title: "Service and Charity",
      description:
        "Organizing charitable initiatives, outreach projects, and volunteer opportunities that benefit the community.",
      icon: "hand",
    },
  ] satisfies Pillar[],
};

export const featuredProgramsContent = {
  heading: "Explore Our Programs",
  subheading:
    "Programs designed to support learning, spiritual growth, family development, and community engagement.",
  programs: [
    {
      title: "Azhar Canada College",
      description:
        "Al-Azhar accredited Islamic education for children, youth, adults, and families — online and in person.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785025487/azharposter_ytmxei.png",
      imageAlt: "Teacher instructing students in an Arabic language and Islamic studies session",
      href: "/Education",
    },
    {
      title: "CIU Kids Program",
      description:
        "Weekend Quran classes and kids programs hosted by CIU at the Canadian Islamic Centre.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785021564/Children_learning_Qur_an_x8eosu.webp",
      imageAlt: "Students studying during a CIU kids program classroom session",
      href: "/Education/ciu",
    },
    {
      title: "Family Services",
      description:
        "Supporting families through education, religious consultation, marriage guidance, and community resources.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020442/home_hero1_xnh8ra.png",
      imageAlt: "Families and children gathered in the CIU community centre",
      href: "/Services/family-counseling",
    },
    {
      title: "Outreach & Service",
      description:
        "Bringing people together through charitable activities, outreach, volunteering, and collaborative initiatives.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020581/home_hero4_j6vzhr.png",
      imageAlt: "Guest speaker addressing the community at a CIU lecture event",
      href: "/Projects",
    },
  ] satisfies Program[],
  viewAllLabel: "View All Programs",
  viewAllHref: "/Services",
};

export const upcomingEventsContent = {
  heading: "Upcoming Events",
  label: "Community Calendar",
  subheading:
    "Join us for learning, fellowship, and meaningful gatherings throughout the year.",
  events: [
    {
      name: "One Big Family Picnic",
      dateLabel: "Sunday, August 23, 2026",
      time: "11:00 AM",
      description:
        "Join us for our potluck and BBQ at Chinguacousy Park — a welcoming day for families to connect and enjoy fellowship together.",
      location: "Chinguacousy Park — Brampton",
      href: "/Events/family-picnic",
    },
    {
      name: "Quran Class",
      dateLabel: "Every Tuesday & Thursday",
      time: "7:00 PM",
      description:
        "Evening Quran classes for learners of all levels — join us for recitation, tajweed, and guided study.",
      location: "CIU Community Centre — Mississauga",
      href: quranRegistrationHref,
      buttonLabel: "Register Now",
    },
    {
      name: "CIU Kids Program",
      dateLabel: "Every Weekend",
      time: "10:00 AM – 2:00 PM",
      description:
        "Weekend Quran classes and kids learning sessions at the Canadian Islamic Centre.",
      location: "CIU Community Centre — Mississauga",
      href: kidsRegistrationHref,
      buttonLabel: "Register Now",
    },
  ] satisfies Event[],
  viewAllLabel: "View All Events",
  viewAllHref: "/Events",
};

/** Placeholder statistics — replace with confirmed organizational data before publishing. */
export const impactContent = {
  heading: "Growing Together Through Faith and Service",
  subheading: "Numbers that reflect a community committed to learning, service, and connection.",
  stats: [
    { value: 850, label: "Families Supported", icon: "users" },
    { value: 420, label: "Students", icon: "graduation-cap" },
    { value: 175, label: "Volunteers", icon: "hand-heart" },
    { value: 38, label: "Community Initiatives", icon: "sparkles" },
  ] satisfies ImpactStat[],
};

export const homeTrustStripContent = {
  items: [
    "Registered Charity Organization",
    "Faith & Family",
    "Community Service",
    "Islamic Education",
  ],
};

export const homeCtaContent = {
  label: "GET INVOLVED",
  heading: "Help Us Build a Stronger Community",
  subheading:
    "Support our programs, volunteer your time, or stay connected with CIU.",
  primary: { label: "Donate Today", href: "/Donate" },
  secondary: { label: "Contact Us", href: "/Contact" },
};

export const galleryContent = {
  label: "COMMUNITY GALLERY",
  heading: "Our Community in Action",
  subheading:
    "A glimpse into our classes, programs, gatherings, volunteer initiatives, and community events.",
  items: [
    {
      title: "Outdoor Prayer & Fellowship",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020567/home_hero3_p38cwf.png",
      imageAlt: "Muslim families and community members gathered outdoors for prayer and fellowship",
    },
    {
      title: "Family Picnic",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020760/IMG_4997_plqf9s.jpg",
      imageAlt:
        "Families enjoying an outdoor picnic with food and fellowship at CIU",
    },
    {
      title: "Lakeside Gathering",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020760/IMG_4985_jkx33s.jpg",
      imageAlt:
        "Members gathered on the grass by the lake for prayer, conversation, and fellowship",
    },
    {
      title: "Centre Gathering",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020442/home_hero1_xnh8ra.png",
      imageAlt: "Members gathered at tables in the CIU hall for an educational event",
    },
    {
      title: "Marriage 101 Workshop",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020768/IMG_4181_sneyrn.jpg",
      imageAlt: "Imam Ashraf presenting the Marriage 101 Financial Independence workshop at CIU",
    },
    {
      title: "Marriage 101 Celebration",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020767/IMG_4221_mskggk.jpg",
      imageAlt:
        "Guests and speakers at a Marriage 101 workshop at the Canadian Islamic Centre",
    },
    {
      title: "Family Workshops",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020763/IMG_4183_cbaw7s.jpg",
      imageAlt: "Imam Ashraf leading a Marriage 101 seminar for families at CIU",
    },
    {
      title: "Brothers Halaqah",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020764/IMG_7460_doasia.jpg",
      imageAlt: "Members seated in a circle for an Islamic learning session",
    },
    {
      title: "Outdoor Programs",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020761/IMG_4982_ate0hm.jpg",
      imageAlt: "Members gathered outdoors in a park for a CIU program",
    },
    {
      title: "Leadership Planning",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020767/8307EB33-C56E-4C8C-9216-0AF04C185E50_no0njo.jpg",
      imageAlt: "CIU leadership reviewing centre planning documents and site maps",
    },
  ] satisfies GalleryItem[],
  viewAllLabel: "View Full Gallery",
  viewAllHref: "/Media/images",
};
