export type EducationPoster = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
};

export const azharCanadaLinks = {
  website: "https://azharcanada.ca/",
  studentPortal: "https://azharcanada.groovemember.net/home",
} as const;

export const educationContent = {
  hero: {
    label: "INSTITUTE OF ISLAMIC LEARNING",
    heading: "Azhar Canada",
    badge: "A CIU Educational Initiative",
    intro:
      "High-quality Islamic education accessible across Canada — accredited by Al-Azhar University in Egypt and delivered through modern, engaging learning.",
    imageSrc: "/media/ciu-general/azhar/azhar-02.jpeg",
    imageAlt: "Azhar Canada Aqeedah 101 Foundations course poster",
  },
  welcome: {
    label: "About Us",
    heading: "Welcome to Azhar Canada",
    paragraphs: [
      "Azhar Canada, a proud initiative of the Canadian Islamic Union, is dedicated to making high-quality Islamic education accessible to everyone across Canada. The esteemed Al-Azhar University in Egypt fully accredits our programs, and its distinguished professors have trained our passionate educators.",
      "We embrace innovation by using modern technology and creative teaching methods to bring Islamic knowledge to life for learners of all ages. Azhar Canada supports you with simplicity, practicality, and a strong sense of community, whether you're just beginning your journey or deepening your understanding.",
    ],
    sheikhNote: "Welcome message from Sheikh Umar Farooq",
  },
  mission: {
    title: "Our Mission",
    body: "To share the balanced and enriching teachings of Islam, rooted in the legacy of Al-Azhar University in Egypt, with learners across Canada. We are committed to nurturing individuals through knowledge, mentorship, and spiritual growth, empowering each person to walk confidently on a path of personal and collective betterment. Our doors are open to all who seek to grow in faith, character, and community.",
  },
  vision: {
    title: "Our Vision",
    body: "Our vision is to cultivate a vibrant and inclusive community where individuals of all ages are grounded in Islamic values, empowered to embrace their faith, and inspired to lead with compassion and integrity. We strive to nurture hearts and minds, fostering a generation of thoughtful, resilient leaders who are proud of their identity and united as one family in purpose and spirit.",
  },
  whyChooseUs: {
    title: "Why Choose Us",
    paragraphs: [
      "At Azhar Canada, we offer more than just education—we offer a transformative journey. What sets us apart is our forward-thinking approach, which blends the timeless teachings of Islam with the realities of modern life. We embrace innovation while staying rooted in tradition, ensuring our students are prepared to navigate today's world with clarity, confidence, and purpose.",
      "Our programs go beyond theory. We equip students with practical tools to live their faith meaningfully through real-life scenarios, hands-on workshops, and community engagement. We nurture not only the intellect but also every learner's spiritual, emotional, and social dimensions. At Azhar Canada, you're not just joining a school but becoming part of a vibrant, supportive community committed to holistic growth and lifelong learning.",
    ],
    highlights: [
      "Al-Azhar accredited curriculum — the only institute in Canada following Al-Azhar University's program",
      "Programs for children, youth, adults, and families",
      "Modern technology blended with authentic Islamic scholarship",
      "Practical, community-rooted learning for everyday life",
    ],
  },
  location: {
    title: "Our Location",
    body: "Our facility is conveniently located at 6185 Tomken Rd, Mississauga, ON L5T 1X6, in a vibrant and accessible part of the city.",
    details:
      "Just minutes from major roads like Courtneypark Drive East and Britannia Road East, our centre is surrounded by key landmarks and amenities, including restaurants and business hubs. With ample parking and a welcoming environment, it's ideal for learning, connection, and community.",
    addressLines: ["6185 Tomken Rd #6", "Mississauga, ON L5T 1X6, Canada"],
    mapHref: "https://maps.google.com/?q=6185+Tomken+Rd+Mississauga+ON",
  },
  postersHeading: "Programs & Registration",
  postersSubheading:
    "Browse current Azhar Canada course offerings, diplomas, and accredited Islamic sciences programs.",
  posters: [
    {
      id: "azhar-hadith-sciences",
      title: "Uloom Al-Hadith (Hadith Sciences)",
      imageSrc: "/media/ciu-general/azhar/azhar-01.jpeg",
      imageAlt: "Azhar Canada poster for Uloom Al-Hadith Hadith Sciences course UH101",
    },
    {
      id: "azhar-aqeedah-foundations",
      title: "Aqeedah 101 – Foundations",
      imageSrc: "/media/ciu-general/azhar/azhar-02.jpeg",
      imageAlt: "Azhar Canada poster for Aqeedah 101 Foundations introductory course",
    },
    {
      id: "azhar-sisters-diploma",
      title: "Sisters Islamic Diploma",
      imageSrc: "/media/ciu-general/azhar/azhar-03.jpeg",
      imageAlt: "Azhar Canada Sisters Islamic Diploma program poster",
    },
    {
      id: "azhar-islamic-sciences-diploma",
      title: "Intro to Islamic Sciences Diploma",
      imageSrc: "/media/ciu-general/azhar/azhar-04.jpeg",
      imageAlt: "Azhar Canada College Intro to Islamic Sciences Diploma program poster",
    },
    {
      id: "azhar-canada-courses",
      title: "Azhar Canada Courses",
      imageSrc: "/media/ciu-general/azhar/azhar-05.jpeg",
      imageAlt: "Azhar Canada courses overview poster listing diploma and course offerings",
    },
  ] satisfies EducationPoster[],
  cta: {
    label: "Start Learning",
    heading: "Register for Azhar Canada Programs",
    subheading:
      "Visit the Azhar Canada website to explore programs, or log in to the student portal to access your courses.",
    primary: {
      label: "Student Portal — Log In",
      href: azharCanadaLinks.studentPortal,
    },
    secondary: {
      label: "Visit Azhar Canada",
      href: azharCanadaLinks.website,
    },
    contact: {
      label: "Questions? Contact CIU",
      href: "/Contact",
    },
  },
};
