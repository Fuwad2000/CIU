export const ciuLogoSrc =
  "https://res.cloudinary.com/dpcnwntmv/image/upload/v1785031504/logo_voqavb.png";

export const siteContent = {
  name: "Canadian Islamic Union",
  shortName: "CIU",
  title: "Canadian Islamic Union | Registered Charity Organization",
  description: "Registered charity organization serving Muslim families across Canada through faith, education, and community.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://ciu-beta.vercel.app",
  logoSrc: ciuLogoSrc,
  logoAlt: "Canadian Islamic Union logo",
  ogImageSrc: ciuLogoSrc,
};
