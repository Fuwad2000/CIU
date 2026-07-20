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
};

export const heroSlides: HeroSlide[] = [
  {
    id: "welcome",
    imageSrc: "/images/home/home_hero1.png",
    imageAlt: "Community members gathered at tables in the CIU hall for an educational event",
    label: "السلام عليكم",
    heading: "Canadian Islamic Union",
    text: "A nonprofit community organization building faith, strengthening families, and inspiring future generations through Islamic education, spiritual development, community service, and meaningful connection.",
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
    imageSrc: "/images/home/home_hero2.png",
    imageAlt: "Collage of CIU students and teachers engaged in Islamic education",
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
    imageSrc: "/images/home/home_hero3.png",
    imageAlt: "Muslim families and community members gathered outdoors for prayer and fellowship",
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
    imageSrc: "/images/home/home_hero4.png",
    imageAlt: "CIU volunteers serving the community through donations, education, and outreach",
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
  imageSrc: "/images/home/home_hero3.png",
  imageAlt: "Muslim families and community members gathered outdoors for prayer and fellowship",
  label: "WHO WE ARE",
  heading: "Faith, Knowledge and Community",
  paragraphs: [
    "The Canadian Islamic Union is a nonprofit community organization dedicated to strengthening Muslim individuals and families through education, mentorship, spiritual development, charitable initiatives, and community service.",
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
      title: "Al-Azhar Academy",
      description:
        "Quality Islamic education inspired by a rich tradition of scholarship and adapted for modern learners.",
      imageSrc: "/images/home/program-academy.svg",
      imageAlt: "Placeholder — Al-Azhar Academy learning environment",
      href: "/Education",
    },
    {
      title: "Youth Development",
      description:
        "Helping young Muslims develop confidence, leadership skills, knowledge, and a strong Islamic identity.",
      imageSrc: "/images/home/program-youth.svg",
      imageAlt: "Placeholder — youth development program",
      href: "/Events/youth-gathering",
    },
    {
      title: "Family Services",
      description:
        "Supporting families through education, religious consultation, marriage guidance, and community resources.",
      imageSrc: "/images/home/program-family.svg",
      imageAlt: "Placeholder — family services and support",
      href: "/Services/family-counseling",
    },
    {
      title: "Community Projects",
      description:
        "Bringing people together through charitable activities, outreach, volunteering, and collaborative initiatives.",
      imageSrc: "/images/home/program-community.svg",
      imageAlt: "Placeholder — community projects and outreach",
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
      name: "Weekly Community Halaqah",
      dateLabel: "Every Friday",
      time: "7:00 PM",
      description:
        "Join us for weekly learning, reflection, and community connection.",
      location: "CIU Community Centre — Mississauga",
      href: "/Events",
    },
    {
      name: "Youth Development Night",
      dateLabel: "August 15",
      time: "6:30 PM",
      description:
        "An evening of mentorship, activities, and spiritual growth for young Muslims.",
      location: "CIU Community Centre — Mississauga",
      href: "/Events/youth-gathering",
    },
    {
      name: "Family Community Gathering",
      dateLabel: "August 24",
      time: "1:00 PM",
      description:
        "A welcoming gathering for families to connect, learn, and enjoy community activities.",
      location: "CIU Community Centre — Mississauga",
      href: "/Events/family-picnic",
    },
  ] satisfies Event[],
  viewAllLabel: "View All Events",
  viewAllHref: "/Events",
};

/** Placeholder statistics — replace with confirmed organizational data before publishing. */
export const impactContent = {
  heading: "Growing Together Through Faith and Service",
  stats: [
    { value: 850, label: "Families Supported", icon: "users" },
    { value: 420, label: "Students", icon: "graduation-cap" },
    { value: 175, label: "Volunteers", icon: "hand-heart" },
    { value: 38, label: "Community Initiatives", icon: "sparkles" },
  ] satisfies ImpactStat[],
};

export const galleryContent = {
  heading: "Our Community in Action",
  subheading:
    "A glimpse into our classes, programs, gatherings, volunteer initiatives, and community events.",
  items: [
    {
      imageSrc: "/images/home/gallery-1.svg",
      imageAlt: "Placeholder — community educational program",
    },
    {
      imageSrc: "/images/home/gallery-2.svg",
      imageAlt: "Placeholder — volunteer outreach initiative",
    },
    {
      imageSrc: "/images/home/gallery-3.svg",
      imageAlt: "Placeholder — community gathering event",
    },
    {
      imageSrc: "/images/home/gallery-4.svg",
      imageAlt: "Placeholder — adult learning session",
    },
    {
      imageSrc: "/images/home/gallery-5.svg",
      imageAlt: "Placeholder — family community activity",
    },
    {
      imageSrc: "/images/home/gallery-6.svg",
      imageAlt: "Placeholder — charitable community project",
    },
  ] satisfies GalleryItem[],
  viewAllLabel: "View Full Gallery",
  viewAllHref: "#",
};
