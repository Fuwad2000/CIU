"use client";

import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeBtnOutlineClass, homeBtnPrimaryClass, homeSectionClass } from "@/components/home/homeUi";
import MediaHero from "@/components/media/MediaHero";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import { volunteerContent } from "@/content/VolunteerContent";
import { ArrowUpRight, Check } from "lucide-react";

export default function VolunteerPage() {
  const { hero, intro, opportunities, posters, cta } = volunteerContent;

  return (
    <div className="overflow-x-hidden bg-background">
      <MediaHero {...hero} />

      <section className={`${homeSectionClass} bg-section-warm`}>
        <SectionContainer>
          <MotionSection>
            <MotionStagger className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <MotionItem>
                <SectionHeading align="left" label={intro.label} heading={intro.heading} />
                <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                  {intro.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </MotionItem>
              <MotionItem>
                <ul className="grid gap-3">
                  {intro.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-xl border border-border/70 bg-surface px-4 py-3.5 text-sm leading-relaxed text-muted sm:text-base"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
                      {item}
                    </li>
                  ))}
                </ul>
              </MotionItem>
            </MotionStagger>
          </MotionSection>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
        <SectionContainer>
          <MotionSection>
            <SectionHeading heading="Volunteer Opportunities" />
          </MotionSection>
          <MotionStagger className="mt-12 grid gap-6 lg:grid-cols-3">
            {opportunities.map((item) => (
              <MotionItem key={item.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-background shadow-premium">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionStagger>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} bg-section-warm`}>
        <SectionContainer>
          <MotionSection>
            <SectionHeading
              heading="Volunteer Posters & Information"
              subheading="Share these opportunities with friends, family, and community members."
            />
          </MotionSection>
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posters.map((poster) => (
              <MotionItem key={poster.id}>
                <article className="overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium">
                  <div className="relative aspect-[3/4] bg-background">
                    <Image
                      src={poster.imageSrc}
                      alt={poster.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="border-t border-border/70 p-5">
                    <h3 className="text-base font-semibold text-foreground">{poster.title}</h3>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionStagger>
        </SectionContainer>
      </section>

      <section className="relative overflow-hidden border-t border-gold/20 bg-brand-gradient text-white">
        <SectionContainer className="relative py-14 sm:py-16 lg:py-20">
          <MotionSection className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-brand-light uppercase sm:text-sm">
              {cta.label}
            </p>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              {cta.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
              {cta.subheading}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={cta.primary.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3.5 text-sm font-semibold text-white shadow-premium transition hover:bg-gold-dark sm:px-8 sm:py-4 sm:text-base"
              >
                {cta.primary.label}
              </Link>
              <Link
                href={cta.secondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 sm:px-8 sm:py-4 sm:text-base"
              >
                {cta.secondary.label}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </MotionSection>
        </SectionContainer>
      </section>
    </div>
  );
}
