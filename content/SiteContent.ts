export const siteContent = {
  name: "Canadian Islamic Union",
  shortName: "CIU",
  title: "Canadian Islamic Union | Non-Profit Organization",
  description: "Non-Profit Organization for the benefit of the community",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://ciu-beta.vercel.app",
  logoSrc: "/images/logo.png",
  logoAlt: "Canadian Islamic Union logo",
  ogImageSrc: "/images/og-image.png",
};
