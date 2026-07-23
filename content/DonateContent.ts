import { footerContent } from "./FooterContent";
import { topBarContent } from "./TopBarContent";

export type DonationFund = {
  id: string;
  label: string;
};

export type DonationMethod = {
  id: string;
  title: string;
  description: string;
  badge?: string;
  featured?: boolean;
};

export const donationEmail = "Canadianislamicunion@gmail.com";

export const donateContent = {
  hero: {
    label: "SUPPORT CIU",
    heading: "Give With Intention. Grow With Community.",
    intro:
      "Your generosity helps CIU deliver Islamic education, family support, community programs, and charitable outreach across the GTA. Every gift, large or small, strengthens the work we do together as one community.",
    badge: "Registered Nonprofit Organization",
  },
  impact: {
    heading: "Where Your Gift Goes",
    intro:
      "Contributions are directed toward programs and services that serve families, youth, and the wider community with care and accountability.",
    areas: [
      {
        title: "Islamic Education",
        description:
          "Classes, mentorship, and learning resources for children, youth, and adults.",
      },
      {
        title: "Family & Community",
        description:
          "Programs that help families connect, grow, and access meaningful support.",
      },
      {
        title: "Charitable Outreach",
        description:
          "Initiatives that respond to community needs with compassion and dignity.",
      },
      {
        title: "Masjid & Operations",
        description:
          "Maintaining a welcoming space for prayer, gatherings, and daily service.",
      },
    ],
  },
  eTransfer: {
    badge: "Recommended",
    title: "Interac e-Transfer",
    description:
      "The fastest way to support CIU from any Canadian bank. Send your gift securely using the details below.",
    emailLabel: "Send to",
    email: donationEmail,
    memoPrefix: "CIU Donation",
    memoHint:
      "Use the message below so we can identify and acknowledge your gift. The CIU Donation prefix stays the same for every transfer.",
    nameLabel: "Your name",
    namePlaceholder: "Full name or family name",
    fundLabel: "Gift purpose",
    funds: [
      { id: "general", label: "General Support" },
      { id: "education", label: "Education" },
      { id: "community", label: "Community Programs" },
      { id: "zakat", label: "Zakat" },
      { id: "sadaqah", label: "Sadaqah" },
    ] as DonationFund[],
    steps: [
      "Open your banking app and choose Interac e-Transfer.",
      "Send to the CIU donations email shown below.",
      "Paste the generated message into the transfer memo field.",
      "Complete the transfer. Our team will follow up if a receipt is requested.",
    ],
    copyEmailLabel: "Copy email",
    copyMemoLabel: "Copy message",
    copiedLabel: "Copied",
  },
  paypal: {
    title: "PayPal",
    description:
      "Donate online by card or PayPal balance. Send your gift to the CIU PayPal email below.",
    emailLabel: "Send to",
    email: donationEmail,
    buttonLabel: "Donate with PayPal",
    href:
      process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL ??
      "https://www.paypal.com/myaccount/transfer/send",
    note: "Use PayPal Send Money and enter the CIU email above, or your configured PayPal donate link when available.",
    copyEmailLabel: "Copy email",
    copiedLabel: "Copied",
  },
  otherMethods: [
    {
      id: "cheque",
      title: "Cheque",
      description:
        "Make cheques payable to Canadian Islamic Union and mail them to our office address.",
      detail: topBarContent.address,
    },
    {
      id: "in-person",
      title: "In Person",
      description:
        "Visit the masjid during operating hours to give in person. Our team can answer questions about designated giving.",
      detail: topBarContent.address,
    },
    {
      id: "monthly",
      title: "Monthly or Major Gifts",
      description:
        "Interested in recurring support or a larger contribution? Contact us to arrange a plan that works for you.",
      detail: footerContent.sections.visitUs.email,
      href: footerContent.sections.visitUs.emailHref,
    },
  ] as const,
  methodsIntro: {
    heading: "Ways to Give",
    subheading:
      "Choose the option that works best for you. e-Transfer is the quickest method for most donors in Canada.",
  },
  receipt: {
    heading: "Receipts & Questions",
    body:
      "Canadian Islamic Union is a registered nonprofit organization. Tax receipts may be available for eligible donations. Contact us after giving if you need a receipt or have questions about your gift.",
    contactLabel: "Contact our team",
    contactHref: "/Contact",
  },
  faq: {
    heading: "Common Questions",
    items: [
      {
        question: "Can I designate my donation?",
        answer:
          "Yes. When giving by e-Transfer, choose a gift purpose and include the generated message so we can allocate your support correctly.",
      },
      {
        question: "Is my donation secure?",
        answer:
          "e-Transfer and PayPal use established financial platforms. Never share banking passwords or PINs with anyone claiming to represent CIU.",
      },
      {
        question: "Can I give Zakat or Sadaqah through CIU?",
        answer:
          "Yes. Select Zakat or Sadaqah as the gift purpose when preparing your e-Transfer message, or note your intention when contacting us.",
      },
      {
        question: "How do I get a tax receipt?",
        answer:
          "Reach out after your donation with your name, amount, date, and method of giving. Our team will confirm eligibility and next steps.",
      },
    ],
  },
  closingCta: {
    heading: "Every Gift Builds Something Lasting",
    body:
      "From a single act of charity to ongoing support, your contribution helps CIU serve families with faith, education, and care.",
    primary: { label: "Send an e-Transfer", href: "#e-transfer" },
    secondary: { label: "Contact Us", href: "/Contact" },
  },
};
