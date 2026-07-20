"use client";

import Image from "next/image";
import { HeroIcon } from "@/components/about/icons";
import { MotionSection } from "@/components/motion";
import { aboutContent } from "@/content/AboutContent";

export default function AboutHero() {
  const { label, headline, badge, intro, imageSrc, imageAlt } = aboutContent.hero;

  return (
    <section className="relative h-[420px] overflow-hidden sm:h-[480px] lg:h-[580px]">
      <Image src={imageSrc} alt={imageAlt} fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-brand/35 mix-blend-multiply" />

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <MotionSection className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-brand-light uppercase sm:text-sm">
            <HeroIcon className="text-brand-light" />
            {label}
          </p>
          <div className="gold-accent-bar mt-4" aria-hidden="true" />
          <h1 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            {headline}
          </h1>
          {badge ? (
            <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-gold/35 bg-white/8 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-light" aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-[0.18em] text-white/95 uppercase sm:text-xs">
                {badge}
              </span>
            </p>
          ) : null}
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/92 sm:text-base lg:text-lg">
            {intro}
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
