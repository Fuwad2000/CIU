import { footerContent } from "@/content/FooterContent";
import { ciuLogoSrc, siteContent } from "@/content/SiteContent";

const BRAND = "#174d32";
const BRAND_DARK = "#0a3220";
const GOLD = "#b8891f";
const GOLD_LIGHT = "#d4ad4a";
const CREAM = "#f8f7f4";
const INK = "#1c1917";
const MUTED = "#78716c";
const BORDER = "#e7e5e4";
const WHITE = "#ffffff";

const EMAIL_LOGO_SRC =
  "https://res.cloudinary.com/dpcnwntmv/image/upload/c_fit,w_160,h_160,f_png,q_auto/v1785031504/logo_voqavb.png";

export type EmailDetailRow = {
  label: string;
  value: string;
};

export type CiuEmailContent = {
  preheader?: string;
  eyebrow?: string;
  title: string;
  greeting?: string;
  paragraphs: string[];
  details?: EmailDetailRow[];
  cta?: { href: string; label: string };
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function siteUrl(path = "/") {
  const base = siteContent.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function emailLogoSrc() {
  return EMAIL_LOGO_SRC || ciuLogoSrc;
}

function rowsFromDetails(details?: EmailDetailRow[]) {
  if (!details?.length) return "";
  const cells = details
    .map(
      (row, index) => `
        <tr>
          <td style="padding:10px 0;border-top:${index === 0 ? "0" : `1px solid ${BORDER}`};width:34%;vertical-align:top;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:${GOLD};font-weight:700;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding:10px 0;border-top:${index === 0 ? "0" : `1px solid ${BORDER}`};vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:${INK};">
            ${escapeHtml(row.value).replace(/\n/g, "<br />")}
          </td>
        </tr>`
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0 8px;background:${CREAM};border:1px solid ${BORDER};border-radius:12px;">
      <tr>
        <td style="padding:8px 18px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            ${cells}
          </table>
        </td>
      </tr>
    </table>`;
}

export function renderCiuEmail(content: CiuEmailContent) {
  const visit = footerContent.sections.visitUs;
  const logo = emailLogoSrc();
  const home = siteUrl("/");
  const preheader = escapeHtml(content.preheader ?? content.paragraphs[0] ?? content.title);
  const greeting = content.greeting
    ? `<p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.4;color:${BRAND};">${escapeHtml(content.greeting)}</p>`
    : "";
  const paragraphs = content.paragraphs
    .map(
      (paragraph) =>
        `<p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:${INK};">${escapeHtml(paragraph)}</p>`
    )
    .join("");
  const cta = content.cta
    ? `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:26px auto 8px;">
        <tr>
          <td style="border-radius:12px;background:${BRAND};">
            <a href="${escapeHtml(content.cta.href)}" style="display:inline-block;padding:13px 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:${WHITE};text-decoration:none;">
              ${escapeHtml(content.cta.label)}
            </a>
          </td>
        </tr>
      </table>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(content.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${CREAM};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${CREAM};">
      <tr>
        <td align="center" style="padding:28px 12px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:${WHITE};border:1px solid ${BORDER};border-radius:20px;overflow:hidden;">
            <tr>
              <td style="background:${BRAND_DARK};padding:28px 28px 22px;text-align:center;">
                <a href="${home}" style="text-decoration:none;">
                  <img src="${logo}" width="72" height="72" alt="${escapeHtml(siteContent.logoAlt)}" style="display:block;margin:0 auto 14px;border:0;border-radius:18px;background:${WHITE};padding:6px;" />
                </a>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${GOLD_LIGHT};">Canadian Islamic Union</p>
                <p style="margin:8px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${WHITE};">The One Big Family</p>
              </td>
            </tr>
            <tr>
              <td style="height:5px;background:${GOLD};font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:32px 28px 20px;">
                ${
                  content.eyebrow
                    ? `<p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};font-weight:700;">${escapeHtml(content.eyebrow)}</p>`
                    : ""
                }
                <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.3;color:${BRAND};">${escapeHtml(content.title)}</h1>
                ${greeting}
                ${paragraphs}
                ${rowsFromDetails(content.details)}
                ${cta}
                <p style="margin:28px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:${BRAND};">
                  JazakAllahu Khairan,<br />
                  <strong>Canadian Islamic Union</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:${BRAND};padding:22px 28px;text-align:center;">
                <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${WHITE};">
                  ${escapeHtml(visit.addressLines.join(", "))}
                </p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${GOLD_LIGHT};">
                  ${escapeHtml(visit.phone)} · ${escapeHtml(visit.email)}
                </p>
                <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;">
                  <a href="${home}" style="color:${WHITE};text-decoration:underline;">ciucanada.ca</a>
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:${MUTED};">
            This message was sent by Canadian Islamic Union. Please do not reply to this email.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function detailsFromText(text: string): EmailDetailRow[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const index = line.indexOf(":");
      if (index === -1) return { label: "Note", value: line };
      const label = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      return { label: label || "Note", value };
    });
}
