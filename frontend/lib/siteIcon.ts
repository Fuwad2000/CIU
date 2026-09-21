import { ciuLogoSrc } from "@frontend/content/SiteContent";

/** Shared CIU logo bytes for app/icon and app/apple-icon routes. */
export async function fetchSiteIconBytes() {
  const response = await fetch(ciuLogoSrc, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    throw new Error("Failed to load CIU site icon from Cloudinary");
  }

  return response.arrayBuffer();
}
