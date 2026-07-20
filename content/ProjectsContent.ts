export type ProjectStatus = "active" | "upcoming" | "completed";

export type ProjectItem = {
  id: string;
  title: string;
  status: ProjectStatus;
  category: string;
  summary: string;
  goalLabel?: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export const projectsImages = {
  hero: "/images/home/home_hero4.png",
  featured: "/images/home/home_hero3.png",
} as const;

export const projectsHeroContent = {
  label: "COMMUNITY PROJECTS",
  heading: "Building Impact Together",
  intro:
    "CIU projects turn community generosity into meaningful action through education, outreach, family support, and charitable service across the GTA.",
  primaryButton: { label: "Support a Project", href: "/Donate" },
  secondaryButton: { label: "Partner With Us", href: "/Contact" },
  imageSrc: projectsImages.hero,
  imageAlt: "CIU volunteers serving the community",
};

export const featuredProjectContent = {
  label: "FEATURED PROJECT",
  title: "Community Outreach & Family Support Fund",
  status: "active" as const,
  summary:
    "This initiative helps CIU respond to urgent community needs, support families, and expand outreach programs with dignity and care.",
  highlights: [
    "Emergency family assistance",
    "Community meal and outreach support",
    "Program supplies and operational needs",
  ],
  raisedLabel: "Community support to date",
  raisedValue: "Growing with your help",
  primaryButton: { label: "Donate to This Project", href: "/Donate" },
  secondaryButton: { label: "Learn How It Works", href: "#active-projects" },
  imageSrc: projectsImages.featured,
  imageAlt: "Families and community members gathered together",
};

export const projectsGridContent = {
  id: "active-projects",
  heading: "Current & Upcoming Projects",
  subheading:
    "Explore the initiatives CIU is leading or preparing. Details and timelines will be updated as programs are confirmed.",
};

export const projects: ProjectItem[] = [
  {
    id: "outreach-fund",
    title: "Community Outreach & Family Support Fund",
    status: "active",
    category: "Charitable Outreach",
    summary:
      "Supports families facing hardship and helps CIU deliver timely community assistance.",
    goalLabel: "Ongoing community need",
    imageSrc: "/images/home/home_hero3.png",
    imageAlt: "Community gathering and family support",
    href: "/Donate",
  },
  {
    id: "youth-mentorship",
    title: "Youth Mentorship Expansion",
    status: "active",
    category: "Youth Development",
    summary:
      "Expanding mentorship, leadership, and character-building opportunities for youth.",
    goalLabel: "Program growth phase",
    imageSrc: "/images/home/home_hero2.png",
    imageAlt: "Youth education and mentorship",
    href: "/Contact",
  },
  {
    id: "food-support",
    title: "Food Support Initiative",
    status: "upcoming",
    category: "Community Service",
    summary:
      "A structured food support effort to assist families and community members in need.",
    goalLabel: "Launch preparation",
    imageSrc: "/images/events/community-partnership.svg",
    imageAlt: "Community partnership and support",
    href: "/Contact",
  },
  {
    id: "new-muslim",
    title: "New Muslim Welcome Program",
    status: "active",
    category: "Spiritual Support",
    summary:
      "Resources, guidance, and welcoming support for individuals new to the Muslim community.",
    goalLabel: "Welcoming newcomers",
    imageSrc: "/images/home/program-community.svg",
    imageAlt: "Community welcome program",
    href: "/Services",
  },
  {
    id: "education-resources",
    title: "Islamic Education Resource Fund",
    status: "upcoming",
    category: "Education",
    summary:
      "Books, learning materials, and classroom resources for CIU educational programs.",
    goalLabel: "Resource planning",
    imageSrc: "/images/home/program-academy.svg",
    imageAlt: "Islamic education resources",
    href: "/Education",
  },
  {
    id: "facility-care",
    title: "Masjid & Facility Care",
    status: "completed",
    category: "Operations",
    summary:
      "Maintenance and improvement work that keeps CIU's shared spaces welcoming and functional.",
    goalLabel: "Recently completed phase",
    imageSrc: "/images/home/home_hero1.png",
    imageAlt: "CIU community space",
    href: "/Contact",
  },
];

export const projectImpactContent = {
  heading: "Why These Projects Matter",
  subheading:
    "Every project reflects CIU's commitment to faith, family, and service in the community.",
  stats: [
    {
      value: "100+",
      label: "Families Supported",
      description: "Through outreach, guidance, and community assistance.",
    },
    {
      value: "50+",
      label: "Volunteers Engaged",
      description: "Community members giving time, skills, and care.",
    },
    {
      value: "10+",
      label: "Programs Supported",
      description: "Education, youth, family, and charitable initiatives.",
    },
  ],
};

export const projectsCtaContent = {
  label: "GET INVOLVED",
  heading: "Help Us Expand What Is Possible",
  intro:
    "Whether you donate, volunteer, or share an idea, your support helps CIU serve families with compassion and purpose.",
  buttons: [
    { label: "Donate Today", href: "/Donate", variant: "primary" as const },
    { label: "Volunteer With CIU", href: "/Services/volunteer", variant: "outline" as const },
    { label: "Contact the Team", href: "/Contact", variant: "gold" as const },
  ],
};
