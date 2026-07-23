export type MembershipType = "individual" | "family";

export type MembershipInterest =
  | "education"
  | "events"
  | "volunteer"
  | "family-services"
  | "spiritual-guidance";

export const membershipContent = {
  hero: {
    label: "CIU MEMBERSHIP",
    heading: "Join the CIU Family",
    intro:
      "Become a member of the Canadian Islamic Union to access community programs, educational opportunities, family support, and a network of families across the GTA.",
    imageSrc: "/images/home/about-community.jpg",
    imageAlt: "Community members gathered at the Canadian Islamic Centre",
  },
  overview: {
    label: "Why Join",
    heading: "Membership Benefits",
    intro:
      "CIU membership helps families stay connected to programs, services, and community life at the Canadian Islamic Centre.",
    note: "Membership terms, eligibility, fees, benefits, and approval requirements are subject to CIU's official membership policies.",
  },
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
      title: "Education Access",
      description: "Connection to CIU and Azhar Canada learning programs and registration support.",
    },
    {
      title: "Community Network",
      description:
        "Opportunities to connect with families, professionals, teachers, volunteers, and community leaders.",
    },
    {
      title: "Events & Activities",
      description: "Priority awareness of classes, gatherings, workshops, and seasonal programs.",
    },
  ],
  process: {
    heading: "How It Works",
    steps: [
      {
        step: 1,
        title: "Submit Application",
        description: "Complete the membership form with your contact and household details.",
      },
      {
        step: 2,
        title: "Team Review",
        description: "Our team reviews your application and may follow up with any questions.",
      },
      {
        step: 3,
        title: "Welcome to CIU",
        description: "Approved members receive guidance on programs, services, and next steps.",
      },
    ],
  },
  form: {
    heading: "Membership Application",
    description:
      "Fill out the form below to apply for CIU membership. We will contact you to confirm details and next steps.",
    fields: {
      fullName: { label: "Full Name", placeholder: "Your full name" },
      email: { label: "Email Address", placeholder: "you@example.com" },
      phone: { label: "Phone Number", placeholder: "905-555-0123" },
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
      householdSize: {
        label: "Household Size",
        placeholder: "e.g. 4",
        optionalLabel: "(optional, for family membership)",
      },
      interests: {
        label: "Areas of Interest",
        description: "Select all that apply.",
        options: [
          { value: "education", label: "Islamic Education" },
          { value: "events", label: "Community Events" },
          { value: "volunteer", label: "Volunteering" },
          { value: "family-services", label: "Family Services" },
          { value: "spiritual-guidance", label: "Spiritual Guidance" },
        ] as const,
      },
      message: {
        label: "Additional Notes",
        placeholder: "Share anything else that would help us process your application...",
        optionalLabel: "(optional)",
      },
      agreement: {
        label:
          "I confirm that the information provided is accurate and I agree to be contacted by CIU regarding my membership application.",
      },
    },
    submitLabel: "Submit Application",
    successTitle: "Application received",
    successMessage:
      "Thank you for applying to become a CIU member. Our team has received your application and will contact you soon with next steps.",
    resetLabel: "Submit another application",
  },
  sidebar: {
    heading: "Questions?",
    body: "If you need help with your application or want to learn more before applying, contact our team.",
    contactLabel: "Contact CIU",
    contactHref: "/Contact",
    volunteerLabel: "Interested in volunteering?",
    volunteerHref: "/Services/volunteer",
  },
};
