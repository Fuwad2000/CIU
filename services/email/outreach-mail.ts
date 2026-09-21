import { EMAIL_POSTER_CID, renderCiuEmail, siteUrl } from "@email/layout";
import { isValidEmailAddress, sendMail } from "@email/send-mail";
import { OUTREACH_TYPE_LABELS, type OutreachCampaign, type OutreachRecipient } from "@shared/outreach";
import type { PosterImageInput } from "@shared/poster-image";

export function outreachGreetingName(displayName: string) {
  const first = displayName.trim().split(/\s+/)[0] ?? "";
  return first || "there";
}

export function outreachParagraphs(content: string) {
  return content
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function outreachEmailText(input: { displayName: string; content: string; hasPoster?: boolean }) {
  const name = outreachGreetingName(input.displayName);
  const paragraphs = outreachParagraphs(input.content);
  return [
    `Assalamu Alaikum ${name},`,
    "",
    ...(input.hasPoster ? ["A poster is included in this email.", ""] : []),
    ...paragraphs,
    "",
    "JazakAllahu Khairan,",
    "Canadian Islamic Union",
  ].join("\n");
}

export function outreachEmailHtml(input: {
  displayName: string;
  subject: string;
  content: string;
  type: OutreachCampaign["type"];
  poster?: PosterImageInput;
}) {
  const name = outreachGreetingName(input.displayName);
  const paragraphs = outreachParagraphs(input.content);
  return renderCiuEmail({
    preheader: paragraphs[0] ?? input.subject,
    eyebrow: OUTREACH_TYPE_LABELS[input.type],
    title: input.subject,
    greeting: `Assalamu Alaikum ${name},`,
    heroImage: input.poster
      ? { src: `cid:${EMAIL_POSTER_CID}`, alt: input.poster.name || "Campaign poster" }
      : undefined,
    paragraphs: paragraphs.length ? paragraphs : [input.content.trim() || input.subject],
    cta: { href: siteUrl("/"), label: "Visit the CIU website" },
  });
}

export async function sendOutreachRecipientMail(
  campaign: Pick<OutreachCampaign, "type" | "subject" | "content">,
  recipient: Pick<OutreachRecipient, "email" | "displayName">,
  poster?: PosterImageInput
) {
  if (!isValidEmailAddress(recipient.email)) {
    return { status: "skipped" as const };
  }

  await sendMail({
    to: recipient.email,
    subject: campaign.subject,
    text: outreachEmailText({
      displayName: recipient.displayName,
      content: campaign.content,
      hasPoster: Boolean(poster),
    }),
    html: outreachEmailHtml({
      displayName: recipient.displayName,
      subject: campaign.subject,
      content: campaign.content,
      type: campaign.type,
      poster,
    }),
    purpose: "outreach",
    attachments: poster
      ? [
          {
            name: poster.name,
            contentType: poster.contentType,
            contentInBase64: poster.contentInBase64,
            contentId: EMAIL_POSTER_CID,
          },
        ]
      : undefined,
  });
  return { status: "sent" as const };
}
