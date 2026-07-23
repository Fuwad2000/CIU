"use client";

import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import {
  homeBtnOutlineClass,
  homeBtnPrimaryClass,
  homeSectionClass,
} from "@/components/home/homeUi";
import MediaHero from "@/components/media/MediaHero";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import { ciuProgramsContent } from "@/content/CiuProgramsContent";
import { ArrowUpRight, Check, ExternalLink, MapPin } from "lucide-react";

export default function CiuProgramsPage() {
  const { hero, overview, programs, posters, gallery, location, cta, postersHeading, postersSubheading, galleryHeading, gallerySubheading } =
    ciuProgramsContent;

  return (
    <div className="overflow-x-hidden bg-background">
      <MediaHero {...hero} />

      <section className={`${homeSectionClass} bg-section-warm`}>
        <SectionContainer>
          <MotionSection>
            <MotionStagger className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <MotionItem>
                <SectionHeading align="left" label={overview.label} heading={overview.heading} />
                <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                  {overview.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-8 grid gap-3">
                  {overview.highlights.map((item) => (
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

              <MotionItem className="relative">
                <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface shadow-premium-xl">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={programs[1].imageSrc}
                      alt={programs[1].imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </MotionItem>
            </MotionStagger>
          </MotionSection>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
        <SectionContainer>
          <MotionSection>
            <SectionHeading heading="Our CIU-Hosted Programs" />
          </MotionSection>
          <MotionStagger className="mt-12 grid gap-6 lg:grid-cols-2">
            {programs.map((program) => (
              <MotionItem key={program.id}>
                <article className="overflow-hidden rounded-3xl border border-border/80 bg-background shadow-premium">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={program.imageSrc}
                      alt={program.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl font-semibold text-foreground">{program.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      {program.description}
                    </p>
                    <p className="mt-4 text-sm font-medium text-brand">{program.schedule}</p>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionStagger>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} bg-section-warm`} id="registration">
        <SectionContainer>
          <MotionSection>
            <SectionHeading heading={postersHeading} subheading={postersSubheading} />
          </MotionSection>
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2">
            {posters.map((poster) => (
              <MotionItem key={poster.id}>
                <article className="overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium">
                  <div className="relative aspect-[3/4] bg-background">
                    <Image
                      src={poster.imageSrc}
                      alt={poster.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="border-t border-border/70 p-5">
                    <h3 className="text-base font-semibold text-foreground sm:text-lg">{poster.title}</h3>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionStagger>
        </SectionContainer>
      </section>

      <section className={homeSectionClass}>
        <SectionContainer>
          <MotionSection>
            <SectionHeading heading={galleryHeading} subheading={gallerySubheading} />
          </MotionSection>
          <MotionStagger className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {gallery.map((item) => (
              <MotionItem key={item.id} className="relative aspect-square overflow-hidden rounded-3xl border border-border/80 shadow-premium">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </MotionItem>
            ))}
          </MotionStagger>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
        <SectionContainer>
          <MotionSection>
            <MotionStagger className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <MotionItem>
                <SectionHeading align="left" heading={location.title} />
                <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{location.body}</p>
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/70 bg-background/80 p-5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.75} />
                  <div>
                    {location.addressLines.map((line) => (
                      <p key={line} className="text-sm font-medium text-foreground sm:text-base">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
                <a
                  href={location.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${homeBtnOutlineClass} mt-6`}
                >
                  Open in Google Maps
                  <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </MotionItem>
              <MotionItem>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/80 shadow-premium-lg">
                  <Image
                    src="/media/ciu-general/general/photos/general-03.jpg"
                    alt="CIU weekend classroom session at the Canadian Islamic Centre"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </MotionItem>
            </MotionStagger>
          </MotionSection>
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
              <Link href={cta.primary.href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3.5 text-sm font-semibold text-white shadow-premium transition hover:bg-gold-dark sm:px-8 sm:py-4 sm:text-base">
                {cta.primary.label}
              </Link>
              <Link href={cta.secondary.href} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 sm:px-8 sm:py-4 sm:text-base">
                {cta.secondary.label}
              </Link>
              <Link href={cta.media.href} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 sm:px-8 sm:py-4 sm:text-base">
                {cta.media.label}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </MotionSection>
        </SectionContainer>
      </section>
    </div>
  );
}
