import { servicesImages } from "@frontend/content/ServicesContent";

export type MembershipType = "individual" | "family";

export type MembershipEmailTopic =
  | "events"
  | "education"
  | "family-programs"
  | "community-news"
  | "charitable-projects";

export const membershipContent = {
  hero: {
    label: "CIU MEMBERSHIP",
    heading: "Stay Connected With CIU",
    intro:
      "CIU membership is our community mailing list — join to receive ongoing emails about programs, events, family services, and important announcements from the Canadian Islamic Union.",
    imageSrc: servicesImages.familyServices,
    imageAlt: "Families and children gathered in the CIU community centre",
  },
  overview: {
    label: "Why Join",
    heading: "Community Updates in Your Inbox",
    intro:
      "Members stay informed about what is happening at the centre — from classes and gatherings to service updates and seasonal programs across the GTA.",
    note: "Membership is free. You may unsubscribe from CIU emails at any time. Membership details and policies may be updated as CIU programs evolve.",
  },
  benefits: [
    {
      title: "Program Announcements",
      description: "Be first to hear about classes, workshops, and seasonal community programs.",
    },
    {
      title: "Event Invitations",
      description: "Receive updates for family gatherings, picnics, lectures, and special events.",
    },
    {
      title: "Family & Service News",
      description: "Learn about family services, education pathways, and centre announcements.",
    },
    {
      title: "Community Highlights",
      description: "Stay connected to CIU projects, outreach efforts, and charitable initiatives.",
    },
    {
      title: "Important Reminders",
      description: "Get timely notices about schedule changes, Ramadan programs, and centre updates.",
    },
  ],
  process: {
    heading: "How It Works",
    steps: [
      {
        step: 1,
        title: "Sign Up Below",
        description: "Share your contact details and choose the topics you want to hear about.",
      },
      {
        step: 2,
        title: "Join the Mailing List",
        description: "CIU adds you to our member email list for ongoing community updates.",
      },
      {
        step: 3,
        title: "Stay Informed",
        description: "Receive emails about programs, events, and announcements that matter to you.",
      },
    ],
  },
  form: {
    heading: "Membership Sign-Up",
    description:
      "Join the CIU mailing list to receive ongoing emails about community life, programs, and announcements. This form is for staying connected — not for volunteer registration.",
    fields: {
      fullName: { label: "Full Name", placeholder: "Your full name" },
      email: { label: "Email Address", placeholder: "you@example.com" },
      phone: {
        label: "Phone Number",
        placeholder: "905-555-0123",
        optionalLabel: "(optional)",
      },
      city: {
        label: "City",
        placeholder: "Mississauga",
        optionalLabel: "(optional)",
      },
      membershipType: {
        label: "Membership Type",
        options: [
          { value: "individual", label: "Individual" },
          { value: "family", label: "Family" },
        ] as const,
      },
      emailTopics: {
        label: "Email Me About",
        description: "Select the updates you would like to receive.",
        options: [
          { value: "events", label: "Events & Gatherings" },
          { value: "education", label: "Education & Classes" },
          { value: "family-programs", label: "Family Programs" },
          { value: "community-news", label: "Community News" },
          { value: "charitable-projects", label: "Projects & Outreach" },
        ] as const,
      },
      message: {
        label: "Additional Notes",
        placeholder: "Tell us about your household or anything else we should know...",
        optionalLabel: "(optional)",
      },
      agreement: {
        label:
          "I agree to receive ongoing emails from CIU about community programs, events, and announcements. I understand I may unsubscribe at any time.",
      },
    },
    submitLabel: "Join the Mailing List",
  },
  sidebar: {
    heading: "Want to Serve at the Centre?",
    body: "Membership is for email updates. If you want to volunteer for masjid and community work, use the volunteer registration form instead.",
    contactLabel: "Contact CIU",
    contactHref: "/Contact",
    volunteerLabel: "Register to Volunteer",
    volunteerHref: "/Services/volunteer#volunteer-form",
  },
};
