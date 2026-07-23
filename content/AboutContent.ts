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
    badge: "CRA Registered Charity",
    intro:
      "The Canadian Islamic Union is a registered nonprofit charity organization serving Muslim families across Canada through education, mentorship, and community support. Our work is guided by faith and dedicated to the benefit of our community.",
    imageSrc: "/images/about/about-hero.png",
    imageAlt: "Community members gathered at tables in the CIU hall for an educational event",
    image: {
      label: "CIU Community",
      caption: "A welcoming community gathering at the Canadian Islamic Union.",
    },
  },
  charityRegistration: {
    label: "CRA Registered Charity",
    title: "Officially Registered with the Canada Revenue Agency",
    registrationLabel: "Charity Registration Number",
    registrationNumber: "752892877RR0001",
    description:
      "The Canadian Islamic Union is a registered nonprofit charity organization. Your support helps us deliver education, family services, and community programs with transparency and accountability.",
    highlights: [
      "Registered charity with the Canada Revenue Agency (CRA)",
      "Eligible donations may qualify for official tax receipts",
      "Committed to transparent, accountable charitable service",
    ],
  },
  story: {
    title: "Our Story",
    lead: "Every thriving community begins with a shared vision.",
    intro:
      "The Canadian Islamic Union was established as a registered nonprofit charity to provide a welcoming environment where individuals and families can grow in faith, knowledge, and connection.",
    highlights: [
      "We combine sincere worship, strong character, and community service.",
      "Education, mentorship, and support come together under one shared mission.",
      "We help people grow in Islam while contributing positively to Canadian society.",
    ],
    image: {
      label: "Our Story",
      caption: "CIU scholars and community leaders serving together.",
      imageSrc: "/images/about/story.jpg",
      imageAlt: "Diverse community members attending a learning workshop at CIU",
    },
  },
  vision: {
    title: "Our Vision",
    intro:
      "To cultivate a united and well-organized Muslim community striving for personal excellence, collective growth, and meaningful service. We serve as a registered nonprofit charity for the benefit of all.",
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
      "As a registered nonprofit charity organization, we strengthen individuals, families, and communities through accessible Islamic education, spiritual mentorship, and community-focused services.",
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
      imageSrc: "/images/about/about-story.jpg",
      imageAlt: "Speaker presenting from a podium during a community event at CIU",
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
      label: "Our Values",
      caption: "Sisters from the community gathered at the CIU centre.",
      imageSrc: "/images/about/values.jpg",
      imageAlt: "Group of women sitting together in front of a world map at the community centre",
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
      imageSrc: "/images/about/what-we-do.jpg",
      imageAlt: "Teacher instructing students in an Arabic language and Islamic studies class",
    },
  },
  alAzhar: {
    title: "Azhar Canada",
    intro:
      "CIU offers Islamic education through Azhar Canada — an institute accredited by Al-Azhar University in Egypt, dedicated to delivering quality learning for individuals and families across Canada.",
    description:
      "Azhar Canada combines authentic Al-Azhar scholarship with modern technology and creative teaching methods, offering programs for children, youth, adults, and families both in person and online.",
    goalsTitle: "Our Goals",
    goals: [
      "Make Al-Azhar accredited Islamic education accessible across Canada.",
      "Nurture faith, character, and confident Muslim identity.",
      "Develop future community leaders through mentorship.",
      "Encourage critical thinking and practical application.",
      "Foster a lifelong love of learning within a supportive community.",
    ],
    websiteHref: "https://azharcanada.ca/",
    portalHref: "https://azharcanada.groovemember.net/home",
    image: {
      label: "Azhar Canada",
      caption: "Al-Azhar accredited programs at the Canadian Islamic Centre.",
      imageSrc: "/media/pictures/posters/azhar-programs-overview.jpg",
      imageAlt: "Azhar Canada educational programs overview poster",
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
      caption: "Women from the CIU community gathered together.",
      imageSrc: "/images/about/community.jpg",
      imageAlt: "Group portrait of women from the community seated in front of a world map",
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
      caption: "Students learning in an Islamic education classroom at CIU.",
      imageSrc: "/images/about/impact.jpg",
      imageAlt: "Teacher leading students in an Islamic education classroom",
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
      caption: "The mihrab and prayer hall at the Canadian Islamic Centre.",
      imageSrc: "/images/about/looking-ahead.jpg",
      imageAlt: "Ornate mihrab and minbar with Arabic calligraphy in the prayer hall",
    },
  },
};
