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
import { azharCanadaLinks, educationContent } from "@/content/EducationContent";
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  GraduationCap,
  LogIn,
  MapPin,
} from "lucide-react";

function ExternalButton({
  href,
  label,
  className,
  icon,
}: {
  href: string;
  label: string;
  className: string;
  icon: "login" | "external";
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {icon === "login" ? (
        <LogIn className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      )}
      {label}
    </a>
  );
}

function MissionVisionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface p-7 shadow-premium sm:p-9">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand/[0.06] to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-0 h-16 w-16 rounded-tl-3xl border-l-[3px] border-t-[3px] border-gold/70"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="inline-flex rounded-2xl bg-brand-gradient p-[2px] shadow-premium">
          <div className="rounded-[14px] bg-surface p-3">
            <GraduationCap className="h-7 w-7 text-brand" strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>
        <div className="gold-accent-bar mt-5 w-10" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:leading-7">{body}</p>
      </div>
    </div>
  );
}

export default function EducationPage() {
  const { hero, welcome, mission, vision, whyChooseUs, location, posters, cta } =
    educationContent;

  return (
    <div className="overflow-x-hidden bg-background">
      <MediaHero {...hero} />

      <section className={`${homeSectionClass} bg-section-warm`}>
        <SectionContainer>
          <MotionSection>
            <MotionStagger className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <MotionItem>
                <SectionHeading
                  align="left"
                  label={welcome.label}
                  heading={welcome.heading}
                />
                <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                  {welcome.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/8 px-4 py-2 text-sm font-medium text-foreground">
                  {welcome.sheikhNote}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ExternalButton
                    href={azharCanadaLinks.studentPortal}
                    label={cta.primary.label}
                    className={homeBtnPrimaryClass}
                    icon="login"
                  />
                  <ExternalButton
                    href={azharCanadaLinks.website}
                    label={cta.secondary.label}
                    className={homeBtnOutlineClass}
                    icon="external"
                  />
                </div>
              </MotionItem>

              <MotionItem className="relative">
                <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface shadow-premium-xl">
                  <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                    <Image
                    src="/media/ciu-general/azhar/azhar-01.jpeg"
                    alt="Azhar Canada Uloom Al-Hadith Hadith Sciences course poster"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain bg-background p-3"
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
            <MotionStagger className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <MotionItem>
                <MissionVisionCard title={mission.title} body={mission.body} />
              </MotionItem>
              <MotionItem>
                <MissionVisionCard title={vision.title} body={vision.body} />
              </MotionItem>
            </MotionStagger>
          </MotionSection>
        </SectionContainer>
      </section>

      <section className={homeSectionClass}>
        <SectionContainer>
          <MotionSection>
            <SectionHeading heading={whyChooseUs.title} />
            <div className="mx-auto mt-8 max-w-4xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {whyChooseUs.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
              {whyChooseUs.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-border/70 bg-surface px-4 py-3.5 text-sm leading-relaxed text-muted sm:text-base"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </MotionSection>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} bg-section-warm`} id="programs">
        <SectionContainer>
          <MotionSection>
            <SectionHeading
              heading={educationContent.postersHeading}
              subheading={educationContent.postersSubheading}
            />
          </MotionSection>

          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posters.map((poster) => (
              <MotionItem key={poster.id}>
                <article className="group overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium transition duration-500 hover:-translate-y-1 hover:shadow-premium-xl">
                  <div className="relative aspect-[3/4] overflow-hidden bg-background">
                    <Image
                      src={poster.imageSrc}
                      alt={poster.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-3 transition duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="border-t border-border/70 p-5">
                    <h3 className="text-base font-semibold text-foreground sm:text-lg">
                      {poster.title}
                    </h3>
                    <a
                      href={azharCanadaLinks.studentPortal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-brand-dark"
                    >
                      Register via student portal
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </div>
                </article>
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
                <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                  {location.body}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {location.details}
                </p>
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
                    src="/media/ciu-general/azhar/azhar-03.jpeg"
                    alt="Azhar Canada college program at the Canadian Islamic Centre"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </MotionItem>
            </MotionStagger>
          </MotionSection>
        </SectionContainer>
      </section>

      <section className="relative overflow-hidden border-t border-gold/20 bg-brand-gradient text-white">
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold/12 blur-3xl"
          aria-hidden="true"
        />
        <SectionContainer className="relative py-14 sm:py-16 lg:py-20">
          <MotionSection className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-brand-light uppercase sm:text-sm">
              {cta.label}
            </p>
            <div className="gold-accent-bar mx-auto mt-4" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              {cta.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
              {cta.subheading}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <ExternalButton
                href={cta.primary.href}
                label={cta.primary.label}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3.5 text-sm font-semibold text-white shadow-premium transition hover:bg-gold-dark sm:px-8 sm:py-4 sm:text-base"
                icon="login"
              />
              <ExternalButton
                href={cta.secondary.href}
                label={cta.secondary.label}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 sm:px-8 sm:py-4 sm:text-base"
                icon="external"
              />
              <Link
                href={cta.contact.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 sm:px-8 sm:py-4 sm:text-base"
              >
                {cta.contact.label}
              </Link>
            </div>
          </MotionSection>
        </SectionContainer>
      </section>
    </div>
  );
}
