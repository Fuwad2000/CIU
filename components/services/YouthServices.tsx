"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import {
  homeBtnOutlineClass,
  homeSectionClass,
} from "@/components/home/homeUi";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import { youthServicesContent } from "@/content/ServicesContent";

export default function YouthServices() {
  const { id, label, heading, body, pillars, button, imageSrc, imageAlt } =
    youthServicesContent;

  return (
    <section id={id} className={`${homeSectionClass} relative overflow-hidden bg-brand-gradient text-white`}>
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <SectionContainer className="relative">
        <MotionStagger className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionItem>
            <MotionSection>
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-light uppercase sm:text-sm">
                {label}
              </p>
              <div className="gold-accent-bar mt-4" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {heading}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                {body}
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {pillars.map((pillar) => (
                  <li
                    key={pillar.title}
                    className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"
                  >
                    <span className="inline-flex rounded-xl bg-white/10 p-2 text-brand-light">
                      <Sparkles className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold sm:text-base">{pillar.title}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={button.href}
                className={`${homeBtnOutlineClass} mt-8 border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15`}
              >
                {button.label}
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </MotionSection>
          </MotionItem>

          <MotionItem className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/20 shadow-premium-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </MotionItem>
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
