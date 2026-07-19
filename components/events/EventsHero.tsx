"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionSection } from "@/components/motion";
import {
  homeBtnOutlineClass,
  homeBtnPrimaryClass,
} from "@/components/home/homeUi";
import { eventsHeroContent } from "@/content/EventsContent";

export default function EventsHero() {
  const {
    label,
    heading,
    intro,
    supportLine,
    primaryButton,
    secondaryButton,
    imageSrc,
    imageAlt,
  } = eventsHeroContent;

  return (
    <section className="relative h-[420px] overflow-hidden sm:h-[480px] lg:h-[580px]">
      {/*
        TODO: Replace /images/events/events-hero.svg with an approved CIU community
        photograph (e.g. events-hero.jpg) before publishing.
      */}
      <Image src={imageSrc} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-brand/35 mix-blend-multiply" />

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <MotionSection className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-light uppercase sm:text-sm">
            {label}
          </p>
          <div className="gold-accent-bar mt-4" aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {heading}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/92 sm:text-base lg:text-lg">
            {intro}
          </p>
          <p className="mt-3 text-sm font-medium text-brand-light sm:text-base">{supportLine}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={primaryButton.href} className={homeBtnPrimaryClass}>
              {primaryButton.label}
            </Link>
            <Link
              href={secondaryButton.href}
              className={`${homeBtnOutlineClass} border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15`}
            >
              {secondaryButton.label}
            </Link>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
