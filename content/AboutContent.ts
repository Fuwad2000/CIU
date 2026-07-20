export type ImagePlaceholderContent = {
  label: string;
  caption: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
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
    badge: "Nonprofit Organization",
    intro:
      "The Canadian Islamic Union is a nonprofit organization serving Muslim families across Canada through education, mentorship, and community support. Our work is guided by faith and dedicated to the benefit of our community.",
    imageSrc: "/images/about/about-hero.png",
    imageAlt: "CIU community collage featuring Islamic education, youth engagement, and outdoor gathering",
    image: {
      label: "Hero Image Placeholder",
      caption:
        "A welcoming image of families, students, or a community gathering.",
    },
  },
  story: {
    title: "Our Story",
    lead: "Every thriving community begins with a shared vision.",
    intro:
      "The Canadian Islamic Union was established as a nonprofit to provide a welcoming environment where individuals and families can grow in faith, knowledge, and connection.",
    highlights: [
      "We combine sincere worship, strong character, and community service.",
      "Education, mentorship, and support come together under one shared mission.",
      "We help people grow in Islam while contributing positively to Canadian society.",
    ],
    image: {
      label: "Our Story",
      caption: "CIU scholars and community leaders serving together.",
      imageSrc: "/images/about/story.png",
      imageAlt: "CIU scholars and community leaders serving together.",
    },
  },
  vision: {
    title: "Our Vision",
    intro:
      "To cultivate a united and well-organized Muslim community striving for personal excellence, collective growth, and meaningful service. We serve as a nonprofit for the benefit of all.",
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
      "As a nonprofit organization, we strengthen individuals, families, and communities through accessible Islamic education, spiritual mentorship, and community-focused services.",
    commitments: [
      "Authentic Islamic education for all age groups.",
      "Leadership and character development through mentorship.",
      "Practical spiritual and family support services.",
      "An inclusive environment where faith and compassion flourish.",
      "Active participation in building stronger communities.",
    ],
    image: {
      label: "Community Service",
      caption: "Volunteers serving the community.",
      imageSrc: "/images/about/about-story.png",
      imageAlt: "CIU community members greeting one another in service and fellowship",
      imagePosition: "right center",
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
      label: "Image Placeholder",
      caption: "Community gathering or volunteers.",
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
      label: "Image Placeholder",
      caption:
        "Program collage showing classes, events, and youth activities.",
    },
  },
  alAzhar: {
    title: "Al-Azhar Academy",
    intro:
      "One of CIU's flagship initiatives is Al-Azhar Academy, an online Islamic learning platform dedicated to delivering quality Islamic education to individuals and families.",
    description:
      "Inspired by the educational legacy of Al-Azhar, the academy combines authentic scholarship with modern technology to create engaging learning experiences for students of all ages.",
    goalsTitle: "Our Goals",
    goals: [
      "Instill strong Islamic values.",
      "Nurture future leaders.",
      "Build confidence in Muslim identity.",
      "Encourage critical thinking and understanding.",
      "Foster a lifelong love of learning.",
    ],
    image: {
      label: "Image Placeholder",
      caption: "Online classes or students studying.",
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
      label: "Image Placeholder",
      caption: "Group photo of members or community event.",
    },
  },
  impact: {
    title: "Our Impact",
    note: "Statistics can be updated as the organization grows.",
    stats: [
      {
        value: "[XX]+",
        label: "Families Supported",
        description:
          "Helping families strengthen their faith and community connections.",
        icon: "families",
      },
      {
        value: "[XX]+",
        label: "Students Enrolled",
        description:
          "Providing quality Islamic education for learners of all ages.",
        icon: "students",
      },
      {
        value: "[XX]+",
        label: "Community Programs",
        description:
          "Educational, spiritual, youth, and family initiatives throughout the year.",
        icon: "programs",
      },
      {
        value: "[XX]+",
        label: "Volunteers",
        description: "Dedicated individuals committed to serving the community.",
        icon: "volunteers",
      },
    ] satisfies StatItem[],
    image: {
      label: "Impact Statistics Section",
      caption: "Impact statistics section with icons.",
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
      label: "Large Inspirational Banner Image Placeholder",
      caption: "Inspirational banner image for the future of CIU.",
    },
  },
};
