"use client";

import Image from "next/image";
import { ClockIcon, MosqueIcon } from "@/components/home/icons";
import { MotionSection } from "@/components/motion";
import { prayerTimesPageContent } from "@/content/PrayerTimesContent";

export default function PrayerTimesHero() {
  const { label, heading, intro, imageSrc, imageAlt } = prayerTimesPageContent.hero;

  return (
    <section className="relative h-[420px] overflow-hidden sm:h-[480px] lg:h-[580px]">
      <Image src={imageSrc} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-brand/35 mix-blend-multiply" />

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <MotionSection className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-brand-light uppercase sm:text-sm">
            <MosqueIcon className="h-4 w-4" />
            {label}
          </p>
          <div className="gold-accent-bar mt-4" aria-hidden="true" />
          <h1 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            {heading}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/92 sm:text-base lg:text-lg">
            {intro}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/90 sm:text-base">
            <ClockIcon className="h-4 w-4 text-brand-light" />
            Mississauga, Ontario
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
