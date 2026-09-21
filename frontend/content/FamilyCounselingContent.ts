import { servicesImages } from "@frontend/content/ServicesContent";

export type FamilyCounselingService = {
  id: string;
  title: string;
  description: string;
  topics: string[];
};

export const familyCounselingContent = {
  hero: {
    label: "FAMILY SERVICES",
    heading: "Faith-Based Family Guidance & Counseling",
    intro:
      "CIU offers confidential, compassionate support for marriage, family disputes, inheritance questions, and other personal matters — guided by Sheikh Ashraf and qualified scholars.",
    imageSrc: servicesImages.familyServices,
    imageAlt: "Families gathered for a community program at the Canadian Islamic Centre",
  },
  intro: {
    label: "How We Help",
    heading: "Support Rooted in Knowledge and Compassion",
    paragraphs: [
      "Family life brings joy, responsibility, and challenges. CIU provides a trusted space where community members can seek faith-based guidance on marriage, parenting, family conflict, inheritance, and other matters that affect the home.",
      "Sheikh Ashraf, CIU's Islamic scholar, works alongside our leadership team to offer religious consultation, mediation support, and practical direction — always with discretion, respect, and sensitivity to each family's situation.",
    ],
    highlights: [
      "Confidential, faith-based guidance for individuals and families",
      "Marriage preparation, counseling, and reconciliation support",
      "Help navigating family disputes and inheritance questions",
      "Referrals to licensed professionals when specialized care is needed",
    ],
  },
  imam: {
    label: "YOUR GUIDE",
    name: "Sheikh Ashraf",
    role: "Islamic Scholar · CIU Family Services",
    bio: "Sheikh Ashraf serves the community through education, spiritual guidance, and family counseling. He has led programs such as Marriage 101 workshops and regularly supports families seeking clarity on marital matters, parenting, disputes, and Islamic rulings related to the home.",
    imageSrc:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020763/IMG_4183_cbaw7s.jpg",
    imageAlt: "Sheikh Ashraf leading a Marriage 101 seminar for families at CIU",
  },
  services: {
    label: "AREAS OF SUPPORT",
    heading: "Family Services We Offer",
    subheading:
      "Guidance is provided from an Islamic perspective. Complex legal, medical, or psychological matters may require additional professional support.",
    items: [
      {
        id: "marriage-counseling",
        title: "Marriage Counseling",
        description:
          "Support for couples facing communication challenges, conflict, or strain in their marriage — with guidance grounded in Islamic ethics and compassion.",
        topics: [
          "Marital conflict and reconciliation",
          "Communication and trust",
          "Strengthening the husband–wife relationship",
          "When to seek further professional help",
        ],
      },
      {
        id: "pre-marital",
        title: "Pre-Marital Guidance",
        description:
          "Preparation for nikah and married life, covering expectations, responsibilities, and building a home upon faith and mutual respect.",
        topics: [
          "Pre-marital consultations",
          "Understanding rights and responsibilities",
          "Financial and family planning basics",
          "Building a shared vision for marriage",
        ],
      },
      {
        id: "family-disputes",
        title: "Family Dispute Resolution",
        description:
          "Mediation-style support for disagreements between spouses, parents and children, siblings, or extended family members.",
        topics: [
          "Conflict between spouses or relatives",
          "Parenting disagreements",
          "Extended family tensions",
          "Restoring communication with dignity",
        ],
      },
      {
        id: "inheritance",
        title: "Inheritance Guidance",
        description:
          "Religious guidance on Islamic inheritance (farāʾiḍ) principles, estate planning considerations, and family questions about shares and distribution.",
        topics: [
          "Overview of Islamic inheritance rules",
          "Family questions about shares and heirs",
          "Coordination with legal estate planning",
          "Clarity before major family decisions",
        ],
      },
      {
        id: "parenting",
        title: "Parenting & Family Life",
        description:
          "Advice for raising children with strong faith, navigating adolescence, and maintaining harmony in the household.",
        topics: [
          "Raising children upon Islamic values",
          "Balancing discipline and mercy",
          "Youth and family challenges",
          "Family routines and spiritual growth",
        ],
      },
      {
        id: "religious-consultation",
        title: "Religious Consultation",
        description:
          "General Islamic guidance on personal and family matters — from daily practice to sensitive questions requiring scholarly input.",
        topics: [
          "Questions related to faith and family life",
          "Personal matters requiring discretion",
          "Community and social concerns",
          "Direction toward qualified specialists when needed",
        ],
      },
    ] satisfies FamilyCounselingService[],
  },
  process: {
    label: "GETTING STARTED",
    heading: "How to Request Support",
    steps: [
      {
        step: 1,
        title: "Reach Out",
        description:
          "Contact CIU by phone, email, or the contact form. Briefly describe your request so we can direct you appropriately.",
      },
      {
        step: 2,
        title: "Initial Review",
        description:
          "A CIU representative will review your inquiry and confirm whether family services guidance is the right fit.",
      },
      {
        step: 3,
        title: "Schedule a Session",
        description:
          "If appropriate, a private meeting or consultation with Sheikh Ashraf or a qualified scholar will be arranged.",
      },
      {
        step: 4,
        title: "Follow-Up & Referrals",
        description:
          "Ongoing support or referrals to licensed legal, medical, or counseling professionals may be recommended when needed.",
      },
    ],
  },
  workshops: {
    label: "COMMUNITY PROGRAMS",
    heading: "Marriage & Family Workshops",
    subheading:
      "CIU hosts educational gatherings such as Marriage 101 — open sessions that strengthen families through learning, discussion, and community connection.",
    items: [
      {
        id: "marriage-101-workshop",
        title: "Marriage 101 Workshop",
        imageSrc:
          "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020768/IMG_4181_sneyrn.jpg",
        imageAlt: "Sheikh Ashraf presenting the Marriage 101 Financial Independence workshop at CIU",
      },
      {
        id: "marriage-101-celebration",
        title: "Marriage 101 Celebration",
        imageSrc:
          "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020767/IMG_4221_mskggk.jpg",
        imageAlt: "Guests and speakers at a Marriage 101 workshop at the Canadian Islamic Centre",
      },
      {
        id: "family-seminar",
        title: "Family Seminar",
        imageSrc:
          "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020763/IMG_4183_cbaw7s.jpg",
        imageAlt: "Sheikh Ashraf leading a Marriage 101 seminar for families at CIU",
      },
    ],
  },
  notice: {
    heading: "Important Information",
    paragraphs: [
      "CIU family services provide faith-based guidance and community support. They are not a substitute for licensed medical, psychological, legal, financial, or emergency services.",
      "Matters involving domestic violence, immediate safety, or mental health crises should be directed to appropriate emergency or professional services without delay.",
      "Inheritance and estate questions may require coordination with qualified legal professionals in addition to religious guidance.",
      "All inquiries are handled with discretion. Availability depends on scheduling and the nature of each request.",
    ],
  },
  cta: {
    label: "REQUEST SUPPORT",
    heading: "Speak With CIU Family Services",
    subheading:
      "Whether you need marriage guidance, help with a family dispute, or clarity on inheritance matters, reach out and our team will guide you to the next step.",
    primary: { label: "Contact CIU", href: "/Contact" },
    secondary: { label: "View Upcoming Events", href: "/Events?category=family" },
  },
} as const;
