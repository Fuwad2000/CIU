export type ServiceIconName =
  | "compass"
  | "users-round"
  | "graduation-cap"
  | "book-open-check"
  | "calendar-heart"
  | "hand-heart";

export type CoreService = {
  id: string;
  title: string;
  description: string;
  details: string[];
  buttonLabel: string;
  href: string;
  icon: ServiceIconName;
  disclaimer?: string;
};

export type FeatureBlock = {
  title: string;
  description: string;
};

export type MembershipBenefit = {
  title: string;
  description: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type YouthPillar = {
  title: string;
};

// TODO: Replace placeholder image paths with approved CIU community photography (.jpg) when available.
export const servicesImages = {
  hero: "/images/services/services-hero.svg",
  communitySupport: "/images/services/community-support.svg",
  familyServices: "/images/services/family-services.svg",
  youthProgram: "/images/services/youth-program.svg",
  alAzharAcademy: "/images/services/al-azhar-academy.svg",
} as const;

export const servicesHeroContent = {
  label: "OUR SERVICES",
  heading: "Supporting Faith, Families and Community",
  intro:
    "The Canadian Islamic Union provides educational, spiritual, family, youth, and community services designed to help Muslim individuals and families grow with confidence, knowledge, and meaningful support.",
  primaryButton: { label: "Explore Our Services", href: "#core-services" },
  secondaryButton: { label: "Contact Us", href: "/Contact" },
  imageSrc: servicesImages.hero,
  imageAlt: "Placeholder — CIU community services and programs",
};

export const servicesIntroContent = {
  label: "HOW WE SERVE",
  heading: "Practical Support for Every Stage of Life",
  paragraphs: [
    "CIU aims to support individuals and families through a balanced combination of Islamic education, spiritual mentorship, family services, youth development, community engagement, and charitable initiatives.",
    "Our goal is to create a trusted environment where members can seek guidance, develop meaningful relationships, strengthen their faith, and participate in programs that benefit both their families and the wider community.",
  ],
  highlight:
    "Our services are designed to strengthen the individual, support the family, and uplift the community.",
  imageSrc: servicesImages.communitySupport,
  imageAlt: "Placeholder — CIU community support and outreach",
};

export const coreServicesContent = {
  id: "core-services",
  heading: "Our Core Services",
  subheading:
    "Explore the main ways CIU supports individuals, families, youth, and the wider community.",
  services: [
    {
      id: "spiritual-guidance",
      title: "Spiritual Guidance and Mentorship",
      description:
        "Access spiritual guidance and personal development support from qualified scholars, teachers, and experienced mentors.",
      details: [
        "Personal spiritual development",
        "Islamic mentorship",
        "Religious guidance",
        "Support with questions related to faith and practice",
        "Ongoing learning and accountability",
      ],
      buttonLabel: "Request Guidance",
      href: "/Contact",
      icon: "compass",
      disclaimer:
        "Availability of religious guidance depends on the qualifications, schedules, and approved scope of CIU's scholars and mentors.",
    },
    {
      id: "family-services",
      title: "Family Services",
      description:
        "Supporting Muslim families through education, guidance, counselling referrals, and community-based resources.",
      details: [
        "Marriage guidance",
        "Family support",
        "Parenting resources",
        "Religious consultation",
        "Family-oriented workshops",
        "Referrals to qualified professionals when required",
      ],
      buttonLabel: "Explore Family Services",
      href: "/Services/family-counseling",
      icon: "users-round",
      disclaimer:
        "CIU family support is not a replacement for licensed medical, psychological, legal, or emergency services. Professional referrals should be used where appropriate.",
    },
    {
      id: "youth-empowerment",
      title: "Youth Empowerment",
      description:
        "Helping young Muslims build confidence, leadership, knowledge, strong character, and a healthy Islamic identity.",
      details: [
        "Youth mentorship",
        "Leadership development",
        "Educational programs",
        "Community participation",
        "Faith-based discussions",
        "Volunteer opportunities",
        "Social and recreational activities",
      ],
      buttonLabel: "View Youth Programs",
      href: "/Events/youth-gathering",
      icon: "graduation-cap",
    },
    {
      id: "islamic-education",
      title: "Islamic Education",
      description:
        "Providing accessible Islamic learning opportunities for children, youth, adults, and families.",
      details: [
        "Qur'an education",
        "Islamic studies",
        "Character development",
        "Online and in-person learning",
        "Family learning programs",
        "Critical thinking and open discussion",
        "Al-Azhar Academy — a CIU educational initiative",
      ],
      buttonLabel: "Explore Education",
      href: "/Education",
      icon: "book-open-check",
    },
    {
      id: "community-gatherings",
      title: "Community Gatherings",
      description:
        "Creating welcoming opportunities for men, women, children, and families to learn, connect, and build lasting relationships.",
      details: [
        "Family gatherings",
        "Community dinners",
        "Workshops",
        "Educational seminars",
        "Youth nights",
        "Volunteer events",
        "Seasonal and special programs",
      ],
      buttonLabel: "View Upcoming Events",
      href: "/Events",
      icon: "calendar-heart",
    },
    {
      id: "charitable-initiatives",
      title: "Charitable and Community Initiatives",
      description:
        "Bringing people together to support meaningful charitable, educational, and community-focused projects.",
      details: [
        "Community fundraising",
        "Volunteer initiatives",
        "Outreach projects",
        "Support for families in need",
        "Educational sponsorships",
        "Collaborative nonprofit programs",
      ],
      buttonLabel: "Support an Initiative",
      href: "/Projects",
      icon: "hand-heart",
      disclaimer:
        "Donation and tax-receipt information will be published only after CIU confirms its legal nonprofit and registered charity status.",
    },
  ] satisfies CoreService[],
};


export const familyServicesContent = {
  id: "family-support",
  label: "FAMILY SUPPORT",
  heading: "Strengthening Muslim Families",
  body: "Strong families are at the heart of strong communities. CIU aims to support families through faith-based education, guidance, family programming, marriage resources, parenting support, and access to trusted community connections.",
  features: [
    {
      title: "Marriage and Family Guidance",
      description: "Faith-based support for families and couples seeking general guidance.",
    },
    {
      title: "Parenting Support",
      description:
        "Resources and workshops to help parents nurture faith, character, and confidence in their children.",
    },
    {
      title: "Religious Consultation",
      description: "Access to approved scholars or qualified teachers for general Islamic questions.",
    },
    {
      title: "Family Gatherings",
      description: "Inclusive events that bring together men, women, children, and families.",
    },
  ] satisfies FeatureBlock[],
  button: { label: "Contact Family Services", href: "/Contact" },
  imageSrc: servicesImages.familyServices,
  imageAlt: "Placeholder — CIU family services and support",
};

export const youthServicesContent = {
  id: "youth-programs",
  label: "OUR YOUTH",
  heading: "Preparing Tomorrow's Leaders",
  body: "CIU seeks to help young Muslims become confident, knowledgeable, responsible, and proud of their faith. Through education, mentorship, leadership opportunities, and community engagement, youth are encouraged to develop their potential while contributing positively to society.",
  pillars: [
    { title: "Faith and Identity" },
    { title: "Leadership and Confidence" },
    { title: "Education and Mentorship" },
    { title: "Community Participation" },
  ] satisfies YouthPillar[],
  button: { label: "Explore Youth Programs", href: "/Events/youth-gathering" },
  imageSrc: servicesImages.youthProgram,
  imageAlt: "Placeholder — CIU youth programs and mentorship",
};

export const educationServicesContent = {
  heading: "Education Rooted in Knowledge and Character",
  intro:
    "CIU's educational services aim to make Islamic knowledge practical, engaging, and accessible for learners of different ages.",
  academy: {
    title: "Al-Azhar Academy",
    body: "Al-Azhar Academy is a CIU educational initiative providing quality Islamic education in an online environment for children, youth, adults, and families.",
    description:
      "Inspired by the rich educational legacy of Al-Azhar, the academy combines traditional Islamic learning, mentorship, spiritual development, modern teaching methods, and technology.",
    goals: [
      "Instill Islamic values across all age groups",
      "Nurture hearts and minds",
      "Develop future community leaders",
      "Build confidence in Muslim identity",
      "Encourage critical thinking and understanding",
      "Create an environment where students feel comfortable asking questions",
    ],
    strategy: [
      "Begin with love for Allah and His Messenger",
      "Focus on understanding, not memorization alone",
      "Promote open and respectful dialogue",
      "Use modern tools to keep students engaged",
      "Connect knowledge with practical application",
    ],
    primaryButton: { label: "Learn About Al-Azhar Academy", href: "/Education" },
    secondaryButton: { label: "View Educational Programs", href: "/Education" },
  },
  imageSrc: servicesImages.alAzharAcademy,
  imageAlt: "Placeholder — Al-Azhar Academy learning environment",
};

export const membershipPreviewContent = {
  heading: "Membership Services and Benefits",
  intro:
    "CIU membership is intended to help families access community services, educational opportunities, guidance, and meaningful connections within the Union.",
  benefits: [
    {
      title: "Spiritual Support",
      description: "Access to mentorship and spiritual development opportunities.",
    },
    {
      title: "Family Programs",
      description: "Participation in family-oriented programs, gatherings, and support services.",
    },
    {
      title: "Youth Opportunities",
      description: "Educational, leadership, volunteer, and community activities for youth.",
    },
    {
      title: "Community Network",
      description:
        "Opportunities to connect with families, professionals, teachers, volunteers, and community leaders.",
    },
    {
      title: "Group Opportunities",
      description:
        "Members may receive access to approved group opportunities, partnerships, or service discounts when available.",
    },
  ] satisfies MembershipBenefit[],
  note: "Membership terms, eligibility, fees, benefits, and approval requirements are subject to CIU's official membership policies.",
  // Confirm the current membership fee before displaying it publicly.
  button: { label: "Learn About Membership", href: "/Membership" },
};

export const servicesProcessContent = {
  heading: "How to Get Started",
  steps: [
    {
      step: 1,
      title: "Choose a Service",
      description: "Review the available programs and support options.",
    },
    {
      step: 2,
      title: "Submit an Inquiry",
      description: "Complete the relevant contact, membership, or registration form.",
    },
    {
      step: 3,
      title: "Speak With the Team",
      description: "A CIU representative will review your request and provide next steps.",
    },
    {
      step: 4,
      title: "Join the Program",
      description:
        "Complete any required registration, payment, consent, or membership documents.",
    },
  ] satisfies ProcessStep[],
};

export const servicesNoticeContent = {
  heading: "Important Information",
  paragraphs: [
    "Some CIU services may depend on volunteer availability, qualified staff, program schedules, membership status, registration requirements, or external professional referrals.",
    "CIU does not replace emergency, medical, psychological, legal, financial, or licensed professional services.",
    "In an emergency, visitors should contact the appropriate local emergency or professional service provider.",
  ],
};

export const servicesCtaContent = {
  label: "NEED SUPPORT?",
  heading: "Let Us Help You Find the Right Service",
  intro:
    "Whether you are looking for Islamic education, family support, youth programming, spiritual guidance, membership information, or a way to serve the community, our team is ready to help direct you.",
  buttons: [
    { label: "Contact CIU", href: "/Contact", variant: "primary" as const },
    { label: "View Programs", href: "#core-services", variant: "outline" as const },
    { label: "Become a Member", href: "/Membership", variant: "gold" as const },
  ],
};
