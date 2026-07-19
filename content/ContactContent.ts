import { footerContent } from "./FooterContent";
import { socialLinks } from "./socialLinks";
import { topBarContent } from "./TopBarContent";

export const contactContent = {
  hero: {
    label: "CONTACT US",
    heading: "We Would Love to Hear From You",
    intro:
      "Reach out with questions about programs, services, membership, events, or community support. Our team will respond as soon as possible.",
  },
  address: {
    label: "Visit Us",
    lines: footerContent.sections.visitUs.addressLines,
    full: topBarContent.address,
    mapsUrl: topBarContent.mapsUrl,
    mapEmbedUrl:
      "https://maps.google.com/maps?q=6185+Tomken+Rd+%236,+Mississauga,+ON+L5T+1X6,+Canada&output=embed",
  },
  phone: {
    label: "Phone",
    value: footerContent.sections.visitUs.phone,
    href: footerContent.sections.visitUs.phoneHref,
  },
  email: {
    label: "Email",
    value: footerContent.sections.visitUs.email,
    href: footerContent.sections.visitUs.emailHref,
  },
  social: {
    label: footerContent.sections.followUs.heading,
    links: socialLinks,
  },
  map: {
    heading: "Find Us on the Map",
    description:
      "Canadian Islamic Union is located in Mississauga, serving families across the GTA.",
  },
  form: {
    heading: "Send a Message",
    description:
      "Fill out the form below and we will get back to you. For urgent matters, please call us directly.",
    fields: {
      name: { label: "Full Name", placeholder: "Your name" },
      email: { label: "Email Address", placeholder: "you@example.com" },
      phone: {
        label: "Phone Number",
        placeholder: "905-555-0123",
        optionalLabel: "(optional)",
      },
      subject: { label: "Subject", placeholder: "How can we help?" },
      message: {
        label: "Message",
        placeholder: "Tell us a little about your question or request...",
      },
    },
    submitLabel: "Send Message",
    successTitle: "Message received",
    successMessage:
      "Thank you for contacting CIU. We have received your message and will respond soon.",
    note: "Form delivery will be connected to email or a backend service in a future update.",
  },
};
