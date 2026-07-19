"use client";

import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import { homeBtnOutlineClass, homeBtnPrimaryClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionSection } from "@/components/motion";
import { eventsFinalCtaContent } from "@/content/EventsContent";

function ctaButtonClass(variant: "primary" | "outline" | "gold") {
  if (variant === "gold") {
    return "inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-white shadow-premium transition hover:bg-gold-dark hover:shadow-premium-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-base";
  }

  if (variant === "outline") {
    return `${homeBtnOutlineClass} border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15`;
  }

  return `${homeBtnPrimaryClass} bg-white text-brand hover:bg-brand-light`;
}

export default function EventsFinalCTA() {
  const { label, heading, intro, buttons } = eventsFinalCtaContent;

  return (
    <section className={`${homeSectionClass} bg-brand-gradient text-white`}>
      <SectionContainer>
        <MotionSection className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-light uppercase sm:text-sm">
            {label}
          </p>
          <div className="gold-accent-bar mx-auto mt-4" aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">{intro}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            {buttons.map((button) => (
              <Link key={button.label} href={button.href} className={ctaButtonClass(button.variant)}>
                {button.label}
              </Link>
            ))}
          </div>
        </MotionSection>
      </SectionContainer>
    </section>
  );
}
