"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, Mail, MapPin, Phone, Sparkles, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import SocialIcon from "@frontend/components/SocialIcon";
import { footerContent } from "@frontend/content/FooterContent";

function ActionIcon({ kind }: { kind: "donate" | "contact" | "member" }) {
  const className = "h-4 w-4 shrink-0";
  if (kind === "donate") return <Heart className={className} strokeWidth={1.75} aria-hidden="true" />;
  if (kind === "contact") return <Mail className={className} strokeWidth={1.75} aria-hidden="true" />;
  return <UserPlus className={className} strokeWidth={1.75} aria-hidden="true" />;
}

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { brand, sections, actions, network, copyright, staffLogin, backToTopLabel, socialLinks } =
    footerContent;
  const { visitUs } = sections;

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative mt-auto overflow-hidden bg-brand-gradient text-white">
      <div className="h-1 bg-gold-gradient" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-gold/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-8 h-40 w-40 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr_1.05fr] lg:gap-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-premium backdrop-blur-sm sm:p-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="rounded-full bg-white p-1.5 shadow-md ring-2 ring-gold-light/70">
                <Image
                  src={brand.logoSrc}
                  alt={brand.logoAlt}
                  width={52}
                  height={52}
                  className="h-11 w-11 object-contain"
                />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">{brand.name}</p>
                <p className="inline-flex items-center gap-1.5 text-sm text-gold-light italic">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  {brand.tagline}
                </p>
              </div>
            </Link>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm transition hover:-translate-y-0.5 hover:border-gold-light/60 hover:bg-gold/25 hover:shadow-md"
                >
                  <SocialIcon platform={social.platform} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold-light uppercase">
              {visitUs.heading}
            </p>
            <span className="gold-accent-bar mt-2" aria-hidden="true" />
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-white/90">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" strokeWidth={1.75} />
                <span>
                  {visitUs.addressLines[0]}
                  <br />
                  {visitUs.addressLines[1]}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold-light" strokeWidth={1.75} />
                <a href={visitUs.phoneHref} className="underline decoration-white/25 underline-offset-4 hover:decoration-gold-light">
                  {visitUs.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold-light" strokeWidth={1.75} />
                <a href={visitUs.emailHref} className="break-all underline decoration-white/25 underline-offset-4 hover:decoration-gold-light">
                  {visitUs.email}
                </a>
              </p>
            </address>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold-light uppercase">Get involved</p>
            <span className="gold-accent-bar mt-2" aria-hidden="true" />
            <div className="mt-4 grid gap-2">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={
                    action.kind === "donate"
                      ? "inline-flex items-center justify-between rounded-xl bg-gold-gradient px-3.5 py-2.5 text-sm font-semibold text-white no-underline shadow-md shadow-black/15 transition hover:brightness-110"
                      : "inline-flex items-center justify-between rounded-xl border border-white/15 bg-white/8 px-3.5 py-2.5 text-sm font-semibold text-white no-underline transition hover:border-gold-light/40 hover:bg-white/15"
                  }
                >
                  <span className="inline-flex items-center gap-2">
                    <ActionIcon kind={action.kind} />
                    {action.label}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-80" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-gold-light uppercase">Our network</p>
            <div className="mt-2 grid gap-2">
              {network.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between rounded-xl border border-gold-light/25 bg-gold/10 px-3.5 py-2 text-sm font-medium text-gold-light no-underline transition hover:border-gold-light/50 hover:bg-gold/20 hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-brand-dark/40 px-4 py-3.5 text-xs text-white/75 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p>
            © {new Date().getFullYear()} {copyright.organization}.{" "}
            <span className="text-gold-light/90">
              {copyright.developerCredit.prefix} {copyright.developerCredit.name}.
            </span>
          </p>
          <Link
            href={staffLogin.href}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold-light/40 px-3 py-1.5 text-xs font-semibold tracking-wide text-gold-light no-underline transition hover:bg-gold/15 hover:text-white"
          >
            {staffLogin.label}
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={backToTopLabel}
        className={`fixed right-5 bottom-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-all hover:bg-gold-dark ${
          showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
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
