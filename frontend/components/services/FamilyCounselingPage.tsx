"use client";

import ZoomableImage from "@frontend/components/lightbox/ZoomableImage";
import Link from "next/link";
import SectionContainer from "@frontend/components/home/SectionContainer";
import SectionHeading from "@frontend/components/home/SectionHeading";
import { homeBtnOutlineClass, homeBtnPrimaryClass, homeSectionClass } from "@frontend/components/home/homeUi";
import MediaHero from "@frontend/components/media/MediaHero";
import { MotionItem, MotionSection, MotionStagger } from "@frontend/components/motion";
import { familyCounselingContent } from "@frontend/content/FamilyCounselingContent";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Heart,
  Home,
  Info,
  Scale,
  Users,
} from "lucide-react";

const serviceIcons = [Heart, Users, Home, Scale, BookOpen, Users] as const;

export default function FamilyCounselingPage() {
  const { hero, intro, imam, services, process, workshops, notice, cta } =
    familyCounselingContent;

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
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
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
          <MotionStagger className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <MotionItem className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/80 shadow-premium-lg lg:aspect-[5/4]">
                <ZoomableImage
                  src={imam.imageSrc}
                  alt={imam.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/30 via-transparent to-transparent" />
              </div>
            </MotionItem>
            <MotionItem className="order-1 lg:order-2">
              <MotionSection>
                <SectionHeading align="left" label={imam.label} heading={imam.name} />
                <p className="mt-2 text-sm font-medium text-brand sm:text-base">{imam.role}</p>
                <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                  {imam.bio}
                </p>
              </MotionSection>
            </MotionItem>
          </MotionStagger>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} bg-section-warm`}>
        <SectionContainer>
          <MotionSection>
            <SectionHeading
              label={services.label}
              heading={services.heading}
              subheading={services.subheading}
            />
          </MotionSection>
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((item, index) => {
              const Icon = serviceIcons[index] ?? Heart;
              return (
                <MotionItem key={item.id}>
                  <article className="flex h-full flex-col rounded-3xl border border-border/80 bg-surface p-6 shadow-premium">
                    <div className="inline-flex rounded-xl bg-brand/10 p-2.5 text-brand">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      {item.description}
                    </p>
                    <ul className="mt-5 space-y-2 border-t border-border/70 pt-5">
                      {item.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex gap-2 text-sm leading-relaxed text-muted"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                            strokeWidth={1.75}
                          />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </article>
                </MotionItem>
              );
            })}
          </MotionStagger>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
        <SectionContainer>
          <MotionSection>
            <SectionHeading label={process.label} heading={process.heading} />
          </MotionSection>
          <div className="relative mt-12">
            <div
              className="absolute top-8 hidden h-0.5 bg-border lg:left-[12.5%] lg:right-[12.5%] lg:block"
              aria-hidden="true"
            />
            <MotionStagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {process.steps.map((step) => (
                <MotionItem key={step.step} className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand/20 bg-background text-lg font-semibold text-brand shadow-premium">
                    {step.step}
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {step.description}
                  </p>
                </MotionItem>
              ))}
            </MotionStagger>
          </div>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} bg-section-warm`}>
        <SectionContainer>
          <MotionSection>
            <SectionHeading
              label={workshops.label}
              heading={workshops.heading}
              subheading={workshops.subheading}
            />
          </MotionSection>
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workshops.items.map((item) => (
              <MotionItem key={item.id}>
                <article className="overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium">
                  <div className="relative aspect-[4/3]">
                    <ZoomableImage
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="border-t border-border/70 p-5">
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionStagger>
        </SectionContainer>
      </section>

      <section className="pb-14 sm:pb-16 lg:pb-20">
        <SectionContainer>
          <MotionSection>
            <div className="rounded-2xl border border-brand/20 bg-background px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Info className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                    {notice.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted sm:text-base">
                    {notice.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
              <Link
                href={cta.primary.href}
                className={`${homeBtnPrimaryClass} bg-gold hover:bg-gold-dark`}
              >
                {cta.primary.label}
              </Link>
              <Link
                href={cta.secondary.href}
                className={`${homeBtnOutlineClass} border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15`}
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
