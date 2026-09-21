import { readFileSync } from "node:fs";
import { join } from "node:path";
import { EMAIL_LOGO_CID } from "@email/layout";

export type InlineEmailAttachment = {
  name: string;
  contentType: string;
  contentInBase64: string;
  contentId: string;
};

let cachedLogo: InlineEmailAttachment | undefined;

export function ciuLogoInlineAttachment(): InlineEmailAttachment {
  cachedLogo ??= {
    name: "ciu-logo.png",
    contentType: "image/png",
    contentInBase64: readFileSync(join(process.cwd(), "services/email/assets/ciu-logo.png")).toString(
      "base64"
    ),
    contentId: EMAIL_LOGO_CID,
  };
  return cachedLogo;
}

export function attachmentsForHtml(html?: string, extra?: InlineEmailAttachment[]) {
  const attachments: InlineEmailAttachment[] = [];
  if (html?.includes(`cid:${EMAIL_LOGO_CID}`)) {
    attachments.push(ciuLogoInlineAttachment());
  }
  for (const item of extra ?? []) {
    if (html?.includes(`cid:${item.contentId}`) && !attachments.some((current) => current.contentId === item.contentId)) {
      attachments.push(item);
    }
  }
  return attachments.length ? attachments : undefined;
}
