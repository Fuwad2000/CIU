export type NavChild = {
  href: string;
  label: string;
};

export type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

export type ContentLink = {
  href: string;
  label: string;
};

export type SocialPlatform = "x" | "facebook" | "instagram" | "youtube";

export type SocialLink = {
  label: string;
  href: string;
  platform: SocialPlatform;
};
