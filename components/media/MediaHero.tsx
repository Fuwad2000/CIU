"use client";

import Image from "next/image";
import { MotionSection } from "@/components/motion";

type MediaHeroProps = {
  label: string;
  heading: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
};

export default function MediaHero({ label, heading, intro, imageSrc, imageAlt }: MediaHeroProps) {
  return (
    <section className="relative h-[420px] overflow-hidden sm:h-[480px] lg:h-[560px]">
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
        </MotionSection>
      </div>
    </section>
  );
}
