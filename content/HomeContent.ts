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

export type PrayerTime = {
  name: string;
  time: string;
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
  /** Placeholder value — replace with confirmed statistics before publishing. */
  value: string;
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
    imageSrc: "/images/home/hero-community.svg",
    imageAlt: "Placeholder — welcoming CIU community gathering",
    label: "WELCOME TO",
    heading: "Canadian Islamic Union",
    text: "Building faith, strengthening families, and inspiring future generations through Islamic education, spiritual development, community service, and meaningful connection.",
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
    imageSrc: "/images/home/hero-students.svg",
    imageAlt: "Placeholder — students engaged in Islamic education",
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
    imageSrc: "/images/home/hero-family.svg",
    imageAlt: "Placeholder — Muslim families connecting in community",
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
    imageSrc: "/images/home/hero-volunteers.svg",
    imageAlt: "Placeholder — volunteers serving the community",
    heading: "Serve. Connect. Make an Impact.",
    text: "Join our volunteers and community partners as we work together to create lasting positive change.",
    primaryButton: {
      label: "Get Involved",
      href: "/Services/volunteer",
      variant: "primary",
    },
  },
];

export const prayerTimesContent = {
  heading: "Today's Prayer Times",
  location: "Mississauga, Ontario",
  note: "Placeholder schedule — accurate prayer times will be connected later.",
  times: [
    { name: "Fajr", time: "5:15 AM" },
    { name: "Sunrise", time: "6:42 AM" },
    { name: "Dhuhr", time: "1:20 PM" },
    { name: "Asr", time: "5:05 PM" },
    { name: "Maghrib", time: "8:18 PM" },
    { name: "Isha", time: "9:45 PM" },
  ] satisfies PrayerTime[],
  scheduleHref: "#",
  scheduleLabel: "View Monthly Schedule",
};

export const aboutPreviewContent = {
  imageSrc: "/images/home/about-community.svg",
  imageAlt: "Placeholder — CIU community and educational gathering",
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
    { value: "[XX]+", label: "Families Supported", icon: "users" },
    { value: "[XX]+", label: "Students", icon: "graduation-cap" },
    { value: "[XX]+", label: "Volunteers", icon: "hand-heart" },
    { value: "[XX]+", label: "Community Initiatives", icon: "sparkles" },
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
