import { aboutContent } from "@frontend/content/AboutContent";
import { ciuProgramKidsImages } from "@frontend/content/CiuProgramsContent";
import { contactContent } from "@frontend/content/ContactContent";
import { featuredProgramsContent, galleryContent } from "@frontend/content/HomeContent";
import { servicesImages } from "@frontend/content/ServicesContent";

const familyPicnicImage = galleryContent.items.find((item) => item.title === "Family Picnic")!;
const brothersHalaqahImage = galleryContent.items.find((item) => item.title === "Brothers Halaqah")!;
const ciuKidsProgramImage = featuredProgramsContent.programs.find(
  (program) => program.title === "CIU Kids Program"
)!;

export type ProjectStatus = "active" | "upcoming" | "completed";

export type ProjectDetails = {
  description: string;
  highlights: string[];
  timeline?: string;
  supportNote?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  status: ProjectStatus;
  category: string;
  summary: string;
  goalLabel?: string;
  imageSrc: string;
  imageAlt: string;
  details: ProjectDetails;
};

export const projectsImages = {
  hero: servicesImages.communitySupport,
  featured: servicesImages.familyServices,
  outreach: servicesImages.communitySupport,
  youth: brothersHalaqahImage.imageSrc,
  foodSupport: familyPicnicImage.imageSrc,
  newMuslim: contactContent.hero.imageSrc,
  education: ciuProgramKidsImages.kidsClassroom,
  facility: aboutContent.charityRegistration.backgroundImageSrc,
} as const;

export const projectsHeroContent = {
  label: "COMMUNITY PROJECTS",
  heading: "Building Impact Together",
  intro:
    "CIU projects turn community generosity into meaningful action through education, outreach, family support, and charitable service across the GTA.",
  primaryButton: { label: "Support a Project", href: "/Donate" },
  secondaryButton: { label: "Partner With Us", href: "/Contact" },
  imageSrc: projectsImages.hero,
  imageAlt: "Diverse community members attending a learning workshop at CIU",
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
  imageAlt: "Families and children gathered in the CIU community centre",
};

export const projectsGridContent = {
  id: "active-projects",
  heading: "Current & Upcoming Projects",
  subheading:
    "Tap a project to read more. Details and timelines will be updated as programs are confirmed.",
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
    imageSrc: projectsImages.outreach,
    imageAlt: "Diverse community members attending a learning workshop at CIU",
    details: {
      description:
        "This fund allows CIU to respond when families need practical help — from emergency assistance to support during difficult seasons. Contributions help the team act quickly while preserving dignity and confidentiality.",
      highlights: [
        "Emergency and short-term family assistance",
        "Community meal and outreach support",
        "Program supplies and operational needs for service initiatives",
        "Coordination with volunteers and community partners",
      ],
      timeline: "Active and accepting community support year-round.",
      supportNote:
        "To contribute or refer a family in need, contact the CIU team through our Donate or Contact pages.",
    },
  },
  {
    id: "youth-mentorship",
    title: "Youth Mentorship Expansion",
    status: "active",
    category: "Youth Development",
    summary:
      "Expanding mentorship, leadership, and character-building opportunities for youth.",
    goalLabel: "Program growth phase",
    imageSrc: projectsImages.youth,
    imageAlt: brothersHalaqahImage.imageAlt,
    details: {
      description:
        "CIU is growing structured mentorship for youth — pairing young people with trusted role models for guidance in faith, character, leadership, and community responsibility.",
      highlights: [
        "Mentorship circles and leadership development",
        "Faith-based character and identity support",
        "Volunteer and student engagement opportunities",
        "Integration with CIU education and community programs",
      ],
      timeline: "Currently active with ongoing recruitment of mentors and youth participants.",
      supportNote:
        "Volunteers with youth experience are especially welcome to reach out through the Contact page.",
    },
  },
  {
    id: "food-support",
    title: "Food Support Initiative",
    status: "upcoming",
    category: "Community Service",
    summary:
      "A structured food support effort to assist families and community members in need.",
    goalLabel: "Launch preparation",
    imageSrc: projectsImages.foodSupport,
    imageAlt: familyPicnicImage.imageAlt,
    details: {
      description:
        "CIU is preparing a coordinated food support initiative to help families access essentials with respect and consistency. Planning includes logistics, volunteer roles, and partnership with local suppliers.",
      highlights: [
        "Non-perishable and essential item distribution",
        "Volunteer packing and delivery coordination",
        "Family referral process through CIU channels",
        "Seasonal and emergency response capacity",
      ],
      timeline: "In planning — launch details will be announced once partnerships and logistics are confirmed.",
      supportNote:
        "Interested in volunteering or partnering? Contact CIU to learn how you can help when the program launches.",
    },
  },
  {
    id: "new-muslim",
    title: "New Muslim Welcome Program",
    status: "active",
    category: "Spiritual Support",
    summary:
      "Resources, guidance, and welcoming support for individuals new to the Muslim community.",
    goalLabel: "Welcoming newcomers",
    imageSrc: projectsImages.newMuslim,
    imageAlt: contactContent.hero.imageAlt,
    details: {
      description:
        "This program helps new Muslims feel welcomed, supported, and connected — offering introductory guidance, community introductions, and access to learning resources in a compassionate environment.",
      highlights: [
        "One-on-one and small-group orientation support",
        "Introductory Islamic learning resources",
        "Community introductions and social connection",
        "Referrals to scholars for personal questions",
      ],
      timeline: "Ongoing — newcomers may connect with CIU at any time.",
      supportNote:
        "Community members who wish to volunteer as welcome mentors are encouraged to contact the team.",
    },
  },
  {
    id: "education-resources",
    title: "Islamic Education Resource Fund",
    status: "upcoming",
    category: "Education",
    summary:
      "Books, learning materials, and classroom resources for CIU educational programs.",
    goalLabel: "Resource planning",
    imageSrc: projectsImages.education,
    imageAlt: ciuKidsProgramImage.imageAlt,
    details: {
      description:
        "This fund will supply books, workbooks, classroom materials, and learning tools for CIU and Azhar Canada College programs — helping teachers deliver high-quality education without cost barriers for students.",
      highlights: [
        "Qur'an and Arabic learning materials",
        "Classroom supplies for CIU kids programs",
        "Teacher resources and curriculum support",
        "Technology and learning aids where needed",
      ],
      timeline: "In planning — resource lists and priorities are being finalized with program leads.",
      supportNote:
        "Donors and partners interested in sponsoring educational materials may contact CIU directly.",
    },
  },
  {
    id: "facility-care",
    title: "Masjid & Facility Care",
    status: "completed",
    category: "Operations",
    summary:
      "Maintenance and improvement work that keeps CIU's shared spaces welcoming and functional.",
    goalLabel: "Recently completed phase",
    imageSrc: projectsImages.facility,
    imageAlt: aboutContent.charityRegistration.backgroundImageAlt,
    details: {
      description:
        "Recent maintenance and improvement work helped keep CIU's prayer spaces, halls, and shared areas clean, safe, and welcoming for daily use and community programs.",
      highlights: [
        "Prayer hall and common area upkeep",
        "Safety and accessibility improvements",
        "Equipment and fixture maintenance",
        "Preparation for community events and classes",
      ],
      timeline: "Recently completed — ongoing routine care continues as part of CIU operations.",
    },
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
