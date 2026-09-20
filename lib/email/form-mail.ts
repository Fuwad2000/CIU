import { detailsFromText, renderCiuEmail, siteUrl } from "@/lib/email/layout";
import { sendMail } from "@/lib/email/send-mail";

export const CIU_INTERNAL_NOTIFICATION_TO = "info@ciucanada.ca";

export type FormMailKind =
  | "contact"
  | "membership"
  | "volunteer"
  | "newsletter"
  | "quran-class"
  | "kids-program";

export type FormSubmissionMail = {
  form: FormMailKind;
  submitterName: string;
  submitterEmail: string;
  internalDetails: string;
};

export function formatFormDetails(fields: Record<string, string | string[] | undefined>) {
  return Object.entries(fields)
    .flatMap(([label, value]) => {
      if (value == null) return [];
      const text = Array.isArray(value) ? value.filter(Boolean).join(", ") : value.trim();
      return text ? [`${label}: ${text}`] : [];
    })
    .join("\n");
}

function formLabel(form: FormMailKind) {
  switch (form) {
    case "contact":
      return "contact message";
    case "membership":
      return "membership registration";
    case "volunteer":
      return "volunteer registration";
    case "newsletter":
      return "newsletter sign-up";
    case "quran-class":
      return "Quran class registration";
    case "kids-program":
      return "kids program registration";
  }
}

function confirmationCopy(form: FormMailKind) {
  switch (form) {
    case "contact":
      return {
        subject: "We received your message — Canadian Islamic Union",
        title: "We received your message",
        eyebrow: "Contact",
        body: "Thank you for contacting the Canadian Islamic Union. A member of our team will review your message and get back to you as soon as possible.",
        cta: { href: siteUrl("/"), label: "Visit the CIU website" },
      };
    case "membership":
      return {
        subject: "You’re on the CIU mailing list",
        title: "Welcome to the CIU family",
        eyebrow: "Membership",
        body: "Thank you for joining the Canadian Islamic Union mailing list. We will keep you informed about programs, services, and community news.",
        cta: { href: siteUrl("/Events"), label: "See upcoming events" },
      };
    case "volunteer":
      return {
        subject: "We received your volunteer registration — CIU",
        title: "Thank you for offering to serve",
        eyebrow: "Volunteers",
        body: "Thank you for registering to volunteer with the Canadian Islamic Union. A member of our team will review your information and be in touch.",
        cta: { href: siteUrl("/Services/volunteer"), label: "Learn about volunteering" },
      };
    case "newsletter":
      return {
        subject: "You’re subscribed to CIU event emails",
        title: "You’re on the newsletter list",
        eyebrow: "Newsletter",
        body: "Thank you for signing up for CIU event emails. We will let you know about upcoming programs and gatherings.",
        cta: { href: siteUrl("/Events"), label: "See upcoming events" },
      };
    case "quran-class":
      return {
        subject: "Quran class registration received — CIU",
        title: "Your Quran class registration is in",
        eyebrow: "Quran class",
        body: "Thank you for registering for Weekly Quran Class. We have received your registration and will contact you with next steps.",
        cta: { href: siteUrl("/register"), label: "View class registration" },
      };
    case "kids-program":
      return {
        subject: "Kids program registration received — CIU",
        title: "Your kids program registration is in",
        eyebrow: "Kids program",
        body: "Thank you for registering for CIU Kids / Weekend School. We have received your registration and will contact you with next steps.",
        cta: { href: siteUrl("/register"), label: "View class registration" },
      };
  }
}

export function confirmationText(form: FormMailKind, name: string) {
  const greetingName = name.trim() || "there";
  const copy = confirmationCopy(form);
  return [
    `Assalamu Alaikum ${greetingName},`,
    "",
    copy.body,
    "",
    "JazakAllahu Khairan,",
    "Canadian Islamic Union",
  ].join("\n");
}

export function confirmationHtml(form: FormMailKind, name: string) {
  const greetingName = name.trim() || "there";
  const copy = confirmationCopy(form);
  return renderCiuEmail({
    preheader: copy.body,
    eyebrow: copy.eyebrow,
    title: copy.title,
    greeting: `Assalamu Alaikum ${greetingName},`,
    paragraphs: [copy.body],
    cta: copy.cta,
  });
}

export function internalNoticeHtml(input: {
  form: FormMailKind;
  submitterName: string;
  submitterEmail: string;
  internalDetails: string;
}) {
  const label = formLabel(input.form);
  const details = detailsFromText(input.internalDetails);
  return renderCiuEmail({
    preheader: `A new ${label} was received from ${input.submitterName || input.submitterEmail}.`,
    eyebrow: "New website submission",
    title: `New ${label}`,
    paragraphs: ["A new form was submitted on the CIU website. Details are below."],
    details: [
      { label: "Name", value: input.submitterName || "—" },
      { label: "Email", value: input.submitterEmail || "—" },
      ...details.filter((row) => row.label !== "Name" && row.label !== "Email"),
    ],
    cta: { href: siteUrl("/admin"), label: "Open the staff portal" },
  });
}

async function sendQuietly(
  input: Parameters<typeof sendMail>[0],
  label: string
) {
  try {
    await sendMail(input);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    console.error("[ciu-email] form email failed", { label, message });
  }
}

export async function sendFormSubmissionEmails(input: FormSubmissionMail) {
  const name = input.submitterName.trim();
  const submitterEmail = input.submitterEmail.trim().toLowerCase();
  const label = formLabel(input.form);
  const copy = confirmationCopy(input.form);

  await sendQuietly(
    {
      to: CIU_INTERNAL_NOTIFICATION_TO,
      subject: `New CIU ${label}`,
      text: [
        `A new ${label} was received.`,
        "",
        `Name: ${name || "—"}`,
        `Email: ${submitterEmail || "—"}`,
        "",
        input.internalDetails.trim(),
      ].join("\n"),
      html: internalNoticeHtml({
        form: input.form,
        submitterName: name,
        submitterEmail,
        internalDetails: input.internalDetails,
      }),
      purpose: "form-internal",
    },
    `${input.form}-internal`
  );

  if (!submitterEmail) return;

  await sendQuietly(
    {
      to: submitterEmail,
      subject: copy.subject,
      text: confirmationText(input.form, name),
      html: confirmationHtml(input.form, name),
      purpose: "form-confirmation",
    },
    `${input.form}-confirmation`
  );
}
