const CLOUDINARY_UPLOAD = "/upload/";

export function isCloudinaryUrl(src: string): boolean {
  return src.includes("res.cloudinary.com");
}

/** Insert Cloudinary transforms after `/upload/` (before version/public_id). */
export function withCloudinaryTransform(src: string, transforms: string): string {
  if (!isCloudinaryUrl(src)) return src;

  const markerIndex = src.indexOf(CLOUDINARY_UPLOAD);
  if (markerIndex === -1) return src;

  const prefix = src.slice(0, markerIndex + CLOUDINARY_UPLOAD.length);
  const suffix = src.slice(markerIndex + CLOUDINARY_UPLOAD.length);

  // Skip if transforms are already present (e.g. f_auto,w_1200,.../v123/...)
  if (/^[^/]+\/v\d+\//.test(suffix) && suffix.includes(",")) {
    return src;
  }

  return `${prefix}${transforms}/${suffix}`;
}

/** Medium preview for lightbox placeholder while the full image loads. */
export function cloudinaryLightboxPreview(src: string): string {
  return withCloudinaryTransform(src, "f_auto,q_auto:good,w_960,c_limit");
}

/** Lightbox zoom preview — large enough for retina, optimized for faster delivery. */
export function cloudinaryFullSize(src: string): string {
  return withCloudinaryTransform(src, "f_auto,q_auto:good,w_1920,c_limit");
}

type LoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

/** Next.js custom loader — sharp Cloudinary URLs; local/public assets served directly. */
export default function cloudinaryImageLoader({ src, width, quality }: LoaderParams): string {
  if (isCloudinaryUrl(src)) {
    const q = quality ?? 90;
    // Extra headroom for retina displays and subtle hover/zoom animations.
    const targetWidth = Math.min(Math.ceil(width * 1.25), 3840);
    return withCloudinaryTransform(src, `f_auto,q_${q},w_${targetWidth},c_limit`);
  }

  // Custom loader bypasses /_next/image — return public and other URLs as-is.
  return src;
}
