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
    text: "A nonprofit dedicated to faith, family, and community across Canada.",
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
    imageSrc: "/images/home/home_hero3.png",
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
    imageSrc: "/images/home/home_hero4.png",
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
  imageSrc: "/images/home/about-community.jpg",
  imageAlt: "Diverse community members attending a learning workshop at CIU",
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
      title: "Azhar Canada",
      description:
        "Al-Azhar accredited Islamic education for children, youth, adults, and families — online and in person.",
      imageSrc: "/images/home/program-academy.jpg",
      imageAlt: "Teacher instructing students in an Arabic language and Islamic studies session",
      href: "/Education",
    },
    {
      title: "CIU Kids Program",
      description:
        "Weekend Quran classes and kids programs hosted by CIU at the Canadian Islamic Centre.",
      imageSrc: "/media/ciu-general/ciu-programs/kids/kids-01.jpeg",
      imageAlt: "Students studying during a CIU kids program classroom session",
      href: "/Education/ciu",
    },
    {
      title: "Family Services",
      description:
        "Supporting families through education, religious consultation, marriage guidance, and community resources.",
      imageSrc: "/images/home/program-family.jpg",
      imageAlt: "Families and children gathered in the CIU community centre",
      href: "/Services/family-counseling",
    },
    {
      title: "Community Projects",
      description:
        "Bringing people together through charitable activities, outreach, volunteering, and collaborative initiatives.",
      imageSrc: "/images/home/program-community.jpg",
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
      name: "Weekly Community Halaqah",
      dateLabel: "Every Friday",
      time: "7:00 PM",
      description:
        "Join us for weekly learning, reflection, and community connection.",
      location: "CIU Community Centre — Mississauga",
      href: "/Events",
    },
    {
      name: "CIU Kids Program",
      dateLabel: "Weekends",
      time: "11:00 AM – 2:00 PM",
      description:
        "Weekend Quran classes and kids learning sessions at the Canadian Islamic Centre.",
      location: "CIU Community Centre — Mississauga",
      href: "/Education/ciu",
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
    "Nonprofit Organization",
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
  heading: "Our Community in Action",
  subheading:
    "A glimpse into our classes, programs, gatherings, volunteer initiatives, and community events.",
  items: [
    {
      imageSrc: "/images/home/gallery-featured.jpg",
      imageAlt: "Ornate mihrab and minbar with Arabic calligraphy in the CIU prayer hall",
    },
    {
      imageSrc: "/images/home/gallery-1.jpg",
      imageAlt: "Islamic education classroom with students learning at CIU",
    },
    {
      imageSrc: "/images/home/gallery-2.jpg",
      imageAlt: "Guest speaker delivering a lecture at the Islamic centre",
    },
    {
      imageSrc: "/images/home/gallery-3.jpg",
      imageAlt: "Sisters from the community gathered at the CIU centre",
    },
    {
      imageSrc: "/images/home/gallery-4.jpg",
      imageAlt: "Interior view of the main prayer hall at CIU",
    },
    {
      imageSrc: "/images/home/gallery-5.jpg",
      imageAlt: "Young student at a festive community event at the Islamic centre",
    },
  ] satisfies GalleryItem[],
  viewAllLabel: "View Full Gallery",
  viewAllHref: "/Media/images",
};
