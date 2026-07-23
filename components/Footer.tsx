"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SocialIcon from "@/components/SocialIcon";
import {
  ContactIcon,
  DonateIcon,
  MemberIcon,
} from "@/components/home/icons";
import {
  affiliateLinks,
  exploreLinks,
  footerContent,
} from "@/content/FooterContent";

function CtaButtonIcon({ icon }: { icon: "donate" | "contact" | "member" }) {
  switch (icon) {
    case "donate":
      return <DonateIcon className="h-4 w-4 shrink-0" />;
    case "contact":
      return <ContactIcon className="h-4 w-4 shrink-0" />;
    case "member":
      return <MemberIcon className="h-4 w-4 shrink-0" />;
  }
}

function ctaButtonClass(index: number) {
  if (index === 0) {
    return "inline-flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-brand shadow-sm transition hover:bg-brand-light sm:rounded-xl sm:px-6 sm:py-3.5 sm:text-lg";
  }

  if (index === 1) {
    return "inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:rounded-xl sm:px-6 sm:py-3.5 sm:text-lg";
  }

  return "inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-3 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 sm:rounded-xl sm:px-6 sm:py-3.5 sm:text-lg";
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-sm font-semibold tracking-[0.12em] text-white uppercase sm:text-base">
      {children}
    </h3>
  );
}

function FooterNavLink({
  href,
  label,
  compact = false,
}: {
  href: string;
  label: string;
  compact?: boolean;
}) {
  const className = `group flex items-center justify-between rounded-lg text-white no-underline transition-all hover:underline hover:underline-offset-4 ${
    compact
      ? "gap-2 border border-white/20 bg-white/10 px-2.5 py-2.5 text-sm hover:border-white/35 hover:bg-white/15 sm:text-base lg:gap-3 lg:px-3 lg:py-2.5 lg:text-lg"
      : "gap-4 px-2 py-2.5 text-base sm:text-lg"
  }`;
  const trailing = (
    <span
      className={`shrink-0 text-brand-light transition-all group-hover:translate-x-0.5 group-hover:text-white ${
        compact ? "ml-1" : ""
      }`}
      aria-hidden="true"
    >
      →
    </span>
  );

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span className="min-w-0 truncate">{label}</span>
        {trailing}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <span className="min-w-0 truncate">{label}</span>
      {trailing}
    </Link>
  );
}

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { cta, brand, sections, copyright, backToTopLabel, socialLinks } =
    footerContent;
  const { visitUs } = sections;

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto bg-gold-gradient text-white">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-brand shadow-xl ring-1 ring-black/10">
          <div className="grid gap-6 px-4 py-6 sm:gap-8 sm:px-8 sm:py-8 lg:grid-cols-[1.4fr_auto] lg:items-center lg:gap-10 lg:py-10">
            <div>
              <p className="text-sm font-semibold tracking-[0.14em] text-brand-light uppercase sm:text-base">
                {cta.eyebrow}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-3xl">
                {cta.headline}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/95 sm:mt-3 sm:text-lg">
                {cta.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:flex-wrap sm:gap-3 lg:flex-col xl:flex-row">
              {cta.buttons.map((button, index) => (
                <Link
                  key={button.href}
                  href={button.href}
                  className={ctaButtonClass(index)}
                >
                  <CtaButtonIcon icon={button.icon} />
                  {button.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 py-8 sm:py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 sm:gap-4">
              <div className="rounded-full bg-white p-1.5 shadow-md sm:p-2">
                <Image
                  src={brand.logoSrc}
                  alt={brand.logoAlt}
                  width={72}
                  height={72}
                  className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-white sm:text-2xl">
                  {brand.name}
                </p>
                <p className="text-sm text-white/90 italic sm:text-lg">
                  {brand.tagline}
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/95 sm:mt-5 sm:text-lg">
              {brand.description}
            </p>

            <div className="mt-5 sm:mt-6">
              <p className="mb-2 text-sm font-semibold tracking-[0.12em] text-white uppercase sm:mb-3 sm:text-base">
                {sections.followUs.heading}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-brand-dark sm:h-11 sm:w-11"
                  >
                    <SocialIcon platform={social.platform} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>{sections.explore.heading}</FooterHeading>
            <ul className="grid grid-cols-2 gap-2 sm:max-w-md lg:max-w-none lg:grid-cols-1 lg:gap-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <FooterNavLink
                    href={link.href}
                    label={link.label}
                    compact
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>{sections.ourNetwork.heading}</FooterHeading>
            <ul className="flex flex-col gap-2">
              {affiliateLinks.map((link) => (
                <li key={link.label}>
                  <FooterNavLink href={link.href} label={link.label} compact />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-white/90 italic sm:mt-6 sm:text-lg">
              {sections.ourNetwork.quote}
            </p>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>{visitUs.heading}</FooterHeading>
            <address className="space-y-2 text-sm not-italic leading-relaxed text-white/95 sm:space-y-3 sm:text-base lg:text-lg">
              <p>
                {visitUs.addressLines[0]}
                <br />
                {visitUs.addressLines[1]}
              </p>
              <p>
                <a
                  href={visitUs.phoneHref}
                  className="block underline decoration-white/35 underline-offset-4 transition hover:decoration-white"
                >
                  {visitUs.phone}
                </a>
                <a
                  href={visitUs.emailHref}
                  className="mt-1 block break-all underline decoration-white/35 underline-offset-4 transition hover:decoration-white"
                >
                  {visitUs.email}
                </a>
              </p>
            </address>
            <div className="mt-3 sm:mt-4">
              <FooterNavLink
                href={visitUs.messageLink.href}
                label={visitUs.messageLink.label}
                compact
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 py-5 text-sm text-white/85 sm:flex-row sm:gap-4 sm:py-6 sm:text-base">
          <p>
            © {new Date().getFullYear()} {copyright.organization}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {copyright.quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold no-underline transition hover:underline hover:underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label={backToTopLabel}
        className={`fixed right-5 bottom-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-all hover:bg-brand-dark ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
