export const volunteerImages = {
  highSchool:
    "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785031540/volunteer-03_m0szvo.jpg",
  volunteersNeeded:
    "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785020581/home_hero4_j6vzhr.png",
  seniorVolunteers:
    "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785031529/volunteer-01_sxhauf.jpg",
  hero: "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785024115/Mosque_dome_interior_with_sunlight_bgmw0n.jpg",
} as const;

export type VolunteerAgeGroup = "high-school" | "adult" | "senior";

export type VolunteerRole =
  | "event-coordination"
  | "community-engagement"
  | "education-programs"
  | "masjid-facility"
  | "outreach"
  | "admin-support"
  | "student-mentor";

export type VolunteerAvailability = "weekdays" | "weekends" | "evenings" | "flexible";

export const volunteerContent = {
  hero: {
    label: "VOLUNTEER WITH CIU",
    heading: "Serve at the Masjid & Centre",
    intro:
      "CIU volunteers help with masjid support, event setup, education programs, outreach, and day-to-day community service at the Canadian Islamic Centre.",
    imageSrc: volunteerImages.hero,
    imageAlt: "CIU community members serving together",
  },
  intro: {
    label: "Hands-On Service",
    heading: "Volunteer for Community Work",
    paragraphs: [
      "Volunteering with CIU is for people who want to contribute time and effort on-site — helping with programs, events, facility support, and service to families across the GTA.",
      "This is separate from CIU membership, which is our email list for community updates. If you want to receive announcements only, join membership instead.",
    ],
    highlights: [
      "Masjid and facility support at the centre",
      "Event coordination and community program setup",
      "Education, youth, and family initiative support",
      "High school volunteer hours and senior volunteer roles",
    ],
  },
  opportunitiesSection: {
    heading: "Volunteer Opportunities",
    subheading:
      "Explore current ways to serve — from general community support to senior roles and high school volunteer hours.",
  },
  opportunities: [
    {
      id: "community-service",
      title: "Volunteers Needed",
      description:
        "General volunteer roles at the centre — outreach, program setup, family events, facility care, and day-to-day community support.",
      imageSrc: volunteerImages.volunteersNeeded,
      imageAlt: "CIU community members serving together",
    },
    {
      id: "senior-volunteers",
      title: "Senior Volunteers",
      description:
        "Enthusiastic, social seniors who want to give back through community engagement, event support, and sharing wisdom with younger generations.",
      imageSrc: volunteerImages.seniorVolunteers,
      imageAlt: "CIU senior volunteers program poster — serving seniors in unity",
    },
    {
      id: "program-support",
      title: "High School Volunteer Hours",
      description:
        "Students completing required volunteer hours through admin support, mentoring, event coordination, and program assistance.",
      imageSrc: volunteerImages.highSchool,
      imageAlt: "High school volunteer hours poster — complete 40 hours with Azhar Canada and CIU",
    },
  ],
  form: {
    id: "volunteer-form",
    heading: "Volunteer Registration",
    description:
      "Tell us how you would like to serve at the masjid and centre. Our team will follow up about current volunteer needs and scheduling.",
    fields: {
      fullName: { label: "Full Name", placeholder: "Your full name" },
      email: { label: "Email Address", placeholder: "you@example.com" },
      phone: { label: "Phone Number", placeholder: "905-555-0123" },
      ageGroup: {
        label: "Volunteer Category",
        options: [
          { value: "high-school", label: "High School Student" },
          { value: "adult", label: "Adult" },
          { value: "senior", label: "Senior" },
        ] as const,
      },
      roles: {
        label: "How Would You Like to Help?",
        description: "Select all areas where you are willing to serve.",
        options: [
          { value: "event-coordination", label: "Event Coordination" },
          { value: "community-engagement", label: "Community Engagement" },
          { value: "education-programs", label: "Education & Kids Programs" },
          { value: "masjid-facility", label: "Masjid & Facility Support" },
          { value: "outreach", label: "Outreach & Family Support" },
          { value: "admin-support", label: "Admin & Office Support" },
          { value: "student-mentor", label: "Student Mentoring" },
        ] as const,
      },
      availability: {
        label: "Availability",
        options: [
          { value: "weekdays", label: "Weekdays" },
          { value: "weekends", label: "Weekends" },
          { value: "evenings", label: "Evenings" },
          { value: "flexible", label: "Flexible" },
        ] as const,
      },
      volunteerHours: {
        label: "Completing High School Volunteer Hours?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ] as const,
        optionalLabel: "(for student volunteers)",
      },
      message: {
        label: "Experience & Notes",
        placeholder: "Share any relevant experience, skills, or scheduling notes...",
        optionalLabel: "(optional)",
      },
      agreement: {
        label:
          "I understand this form is for hands-on volunteer service at CIU and I agree to be contacted about volunteer opportunities.",
      },
    },
    submitLabel: "Submit Volunteer Registration",
  },
  cta: {
    label: "Join Us",
    heading: "Ready to Serve?",
    subheading:
      "Complete the volunteer registration form and our team will connect with you about current needs at the centre.",
    primary: {
      label: "Register to Volunteer",
      href: "#volunteer-form",
    },
    secondary: {
      label: "Join Membership Emails",
      href: "/Membership",
    },
  },
};
