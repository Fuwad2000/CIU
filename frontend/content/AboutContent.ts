import { imagePlaceholder } from "./imagePlaceholder";

/** @deprecated Use imagePlaceholder from ./imagePlaceholder */
export function aboutImagePlaceholder(slot: string, width = 1200, height = 800): string {
  return imagePlaceholder(slot, width, height);
}

export type ImagePlaceholderContent = {
  label: string;
  caption: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
};

export type ValueItem = {
  title: string;
  description: string;
  icon: "faith" | "knowledge" | "excellence" | "compassion" | "unity" | "integrity";
};

export type ServiceItem = {
  title: string;
  description: string;
  icon: "education" | "youth" | "family" | "community" | "spiritual";
};

export type StatItem = {
  value: string;
  label: string;
  description: string;
  icon: "families" | "students" | "programs" | "volunteers";
};

export const aboutContent = {
  hero: {
    label: "ABOUT CIU",
    organization: "Canadian Islamic Union (CIU)",
    headline: "Faith, Families, and Community",
    badge: "CRA Registered Charity",
    intro:
      "The Canadian Islamic Union is a registered charity organization serving Muslim families across Canada through education, mentorship, and community support. Our work is guided by faith and dedicated to the benefit of our community.",
    imageSrc:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785024097/10216818-Interior-view-of-domes-in-Blue-Mosque-Istanbul-Turkey_h0iswz.jpg",
    imageAlt: "Interior view of ornate mosque domes with Islamic architecture",
    image: {
      label: "CIU Community",
      caption: "A welcoming community gathering at the Canadian Islamic Union.",
    },
  },
  charityRegistration: {
    label: "CRA Registered Charity",
    title: "Officially Registered Charity Organization",
    registrationLabel: "Charity Registration Number",
    registrationNumber: "752892877RR0001",
    /** Cloudinary slot: about-charity-registration-bg */
    backgroundImageSrc:
      "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785026130/gallery-featured_x9katl.jpg",
    backgroundImageAlt: "Prayer hall mihrab and minbar at the Canadian Islamic Centre",
    description:
      "The Canadian Islamic Union is a registered charity organization. Your support helps us deliver education, family services, and community programs with transparency and accountability.",
    highlights: [
      "Registered charity organization",
      "Eligible donations may qualify for official tax receipts",
      "Committed to transparent, accountable charitable service",
    ],
  },
  story: {
    title: "Our Story",
    lead: "Every thriving community begins with a shared vision.",
    intro:
      "The Canadian Islamic Union was established as a registered charity organization to provide a welcoming environment where individuals and families can grow in faith, knowledge, and connection.",
    highlights: [
      "We combine sincere worship, strong character, and community service.",
      "Education, mentorship, and support come together under one shared mission.",
      "We help people grow in Islam while contributing positively to Canadian society.",
    ],
    image: {
      label: "Our Story",
      caption: "CIU scholars and community leaders serving together.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785024113/Mosque_silhouette_at_sunset_rcvswj.avif",
      imageAlt: "Mosque silhouette at sunset",
      imagePosition: "center center",
      imageFit: "cover" as const,
    },
  },
  vision: {
    title: "Our Vision",
    intro:
      "To cultivate a united and well-organized Muslim community striving for personal excellence, collective growth, and meaningful service. We serve as a registered charity organization for the benefit of all.",
    highlights: [
      "A community united in faith, purpose, and cooperation.",
      "Personal excellence rooted in Islamic values and character.",
      "Strong families supported through knowledge and connection.",
      "Meaningful service that uplifts Muslims and wider society.",
      "A brighter future for Muslim Canadians across Canada.",
    ],
  },
  mission: {
    title: "Our Mission",
    intro:
      "As a registered charity organization, we strengthen individuals, families, and communities through accessible Islamic education, spiritual mentorship, and community-focused services.",
    commitments: [
      "Authentic Islamic education for all age groups.",
      "Leadership and character development through mentorship.",
      "Practical spiritual and family support services.",
      "An inclusive environment where faith and compassion flourish.",
      "Active participation in building stronger communities.",
    ],
    image: {
      label: "Faith & Service",
      caption: "Spiritual devotion and compassionate service at the heart of our mission.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785024118/muslim-woman-prayer-having-worship-praying-with-hands-open-doing-dua-allah-sunset_606562-445_aj3yif.avif",
      imageAlt: "Muslim woman in dua with hands raised at sunset",
      imagePosition: "center center",
      imageFit: "cover" as const,
    },
  },
  values: {
    title: "Our Values",
    intro:
      "Everything we do is guided by timeless Islamic values that shape our character, our relationships, and our service to others.",
    items: [
      {
        title: "Faith",
        description:
          "Developing a sincere love for Allah ﷻ and His Messenger ﷺ as the foundation of every action.",
        icon: "faith",
      },
      {
        title: "Knowledge",
        description:
          "Seeking authentic knowledge that leads to understanding, wisdom, and practical application.",
        icon: "knowledge",
      },
      {
        title: "Excellence",
        description:
          "Striving for continuous improvement in worship, education, leadership, and community service.",
        icon: "excellence",
      },
      {
        title: "Compassion",
        description:
          "Serving families and individuals with kindness, humility, and genuine care.",
        icon: "compassion",
      },
      {
        title: "Unity",
        description:
          "Building strong relationships founded upon cooperation, mutual respect, and shared purpose.",
        icon: "unity",
      },
      {
        title: "Integrity",
        description:
          "Maintaining honesty, accountability, transparency, and professionalism in all our initiatives.",
        icon: "integrity",
      },
    ] satisfies ValueItem[],
    image: {
      label: "Our Values",
      caption: "Faith and devotion at the heart of our community.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785024101/devout-muslim-man-in-traditional-attire-praying-with-tasbih-beads-on-a-red-mat-inside-a-mosque-photo_woaih2.jpg",
      imageAlt: "Muslim man in traditional attire praying inside a mosque",
      imagePosition: "center center",
      imageFit: "cover" as const,
    },
  },
  whatWeDo: {
    title: "What We Do",
    intro:
      "Our programs are designed to serve individuals and families throughout every stage of life.",
    items: [
      {
        title: "Islamic Education",
        description:
          "Structured learning programs that provide authentic Islamic knowledge using modern teaching methods.",
        icon: "education",
      },
      {
        title: "Youth Development",
        description:
          "Helping young Muslims build confidence, leadership skills, and a strong Islamic identity.",
        icon: "youth",
      },
      {
        title: "Family Support",
        description:
          "Providing guidance, counselling, educational resources, and community programs that strengthen Muslim families.",
        icon: "family",
      },
      {
        title: "Community Initiatives",
        description:
          "Organizing charitable projects, educational events, volunteer opportunities, and outreach programs that benefit both Muslims and the wider Canadian community.",
        icon: "community",
      },
      {
        title: "Spiritual Growth",
        description:
          "Connecting individuals with qualified scholars and mentors who provide guidance and encourage lifelong learning.",
        icon: "spiritual",
      },
    ] satisfies ServiceItem[],
    image: {
      label: "What We Do",
      caption: "Islamic education, youth programs, and community service in action.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020530/home_hero2_mgconp.png",
      imageAlt: "Collage of CIU students, teachers, and community education programs",
      imageFit: "cover" as const,
    },
  },
  alAzhar: {
    title: "Azhar Canada College",
    intro:
      "CIU offers Islamic education through Azhar Canada College — an institute accredited by Al-Azhar University in Egypt, dedicated to delivering quality learning for individuals and families across Canada.",
    description:
      "Azhar Canada College combines authentic Al-Azhar scholarship with modern technology and creative teaching methods, offering programs for children, youth, adults, and families both in person and online.",
    goalsTitle: "Our Goals",
    goals: [
      "Make Al-Azhar accredited Islamic education accessible across Canada.",
      "Nurture faith, character, and confident Muslim identity.",
      "Develop future community leaders through mentorship.",
      "Encourage critical thinking and practical application.",
      "Foster a lifelong love of learning within a supportive community.",
    ],
    websiteHref: "https://azharcanada.groovemember.net/login",
    portalHref: "https://azharcanada.groovemember.net/home",
    image: {
      label: "Azhar Canada College",
      caption: "Al-Azhar accredited programs at the Canadian Islamic Centre.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785025487/azharposter_ytmxei.png",
      imageAlt: "Azhar Canada College educational programs overview poster",
      imageFit: "cover" as const,
    },
  },
  community: {
    title: "Our Community",
    paragraphs: [
      "CIU is more than an organization. It is a growing family.",
      "Our community includes students, parents, educators, volunteers, mentors, professionals, and community leaders who work together to create meaningful opportunities for growth and service.",
      "Together, we strive to create an environment where every individual feels welcomed, supported, and inspired to contribute their talents for the benefit of others.",
    ],
    image: {
      label: "Our Community",
      caption: "Community members gathered at the CIU centre for learning and fellowship.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020442/home_hero1_xnh8ra.png",
      imageAlt: "Community members gathered at tables in the CIU hall for an educational event",
      imagePosition: "center center",
      imageFit: "cover" as const,
    },
  },
  impact: {
    title: "Our Impact",
    note: "Numbers that reflect a community committed to learning, service, and connection.",
    stats: [
      {
        value: "850+",
        label: "Families Supported",
        description:
          "Helping families strengthen their faith and community connections.",
        icon: "families",
      },
      {
        value: "420+",
        label: "Students Enrolled",
        description:
          "Providing quality Islamic education for learners of all ages.",
        icon: "students",
      },
      {
        value: "38+",
        label: "Community Programs",
        description:
          "Educational, spiritual, youth, and family initiatives throughout the year.",
        icon: "programs",
      },
      {
        value: "175+",
        label: "Volunteers",
        description: "Dedicated individuals committed to serving the community.",
        icon: "volunteers",
      },
    ] satisfies StatItem[],
    image: {
      label: "Our Impact",
      caption: "Learning rooted in the Qur'an and authentic Islamic education.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785024120/Open_Qur_an_on_wooden_stand_zsb2h8.png",
      imageAlt: "Open Qur'an on a wooden stand",
      imageFit: "cover" as const,
    },
  },
  lookingAhead: {
    title: "Looking Ahead",
    paragraphs: [
      "As our community continues to grow, so does our commitment to serving Muslim Canadians with excellence.",
      "We remain focused on expanding educational opportunities, strengthening family services, empowering youth, and building lasting partnerships that benefit both our community and Canadian society as a whole.",
      "By investing in people today, we hope to inspire generations that will continue to serve with knowledge, compassion, integrity, and faith.",
    ],
    image: {
      label: "Looking Ahead",
      caption: "Muslim families and community members gathered outdoors for prayer and fellowship.",
      imageSrc:
        "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020567/home_hero3_p38cwf.png",
      imageAlt: "Community members gathered outdoors for prayer in a park setting",
      imagePosition: "center center",
      imageFit: "cover" as const,
    },
  },
};
