export const EMAIL_POSTER_CID = "ciu-poster";
export const POSTER_MAX_BYTES = 1_500_000;
export const POSTER_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

export type PosterContentType = (typeof POSTER_CONTENT_TYPES)[number];

export type PosterImageInput = {
  name: string;
  contentType: PosterContentType;
  contentInBase64: string;
};

export function isPosterContentType(value: string): value is PosterContentType {
  return POSTER_CONTENT_TYPES.includes(value as PosterContentType);
}

export function posterPreviewSrc(poster: Pick<PosterImageInput, "contentType" | "contentInBase64">) {
  return `data:${poster.contentType};base64,${poster.contentInBase64}`;
}

export function decodedBase64Bytes(value: string) {
  const clean = value.replace(/\s/g, "");
  if (!clean || /[^A-Za-z0-9+/=]/.test(clean)) return 0;
  const padding = clean.endsWith("==") ? 2 : clean.endsWith("=") ? 1 : 0;
  return Math.max(0, Math.floor((clean.length * 3) / 4) - padding);
}

export function parsePosterImage(value: unknown): PosterImageInput | undefined | string {
  if (value == null || value === "") return undefined;
  if (typeof value !== "object" || Array.isArray(value)) return "Choose a JPEG, PNG, WebP, or GIF poster.";
  const body = value as Record<string, unknown>;
  const contentType = typeof body.contentType === "string" ? body.contentType.trim().toLowerCase() : "";
  if (!isPosterContentType(contentType)) return "Choose a JPEG, PNG, WebP, or GIF poster.";
  const contentInBase64 = typeof body.contentInBase64 === "string" ? body.contentInBase64.replace(/\s/g, "") : "";
  if (!contentInBase64) return "The poster file could not be read.";
  const bytes = decodedBase64Bytes(contentInBase64);
  if (bytes < 32) return "The poster file could not be read.";
  if (bytes > POSTER_MAX_BYTES) return "The poster must be 1.5 MB or smaller.";
  const rawName = typeof body.name === "string" ? body.name.trim() : "";
  const name = rawName.replace(/[^\w.\- ()]/g, "").slice(0, 120) || `poster.${contentType.split("/")[1]}`;
  return { name, contentType, contentInBase64 };
}
