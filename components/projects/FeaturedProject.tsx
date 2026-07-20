"use client";

import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import { homeBtnOutlineClass, homeBtnPrimaryClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionSection } from "@/components/motion";
import { featuredProjectContent } from "@/content/ProjectsContent";
import { Check } from "lucide-react";

export default function FeaturedProject() {
  const {
    label,
    title,
    status,
    summary,
    highlights,
    raisedLabel,
    raisedValue,
    primaryButton,
    secondaryButton,
    imageSrc,
    imageAlt,
  } = featuredProjectContent;

  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <MotionSection className="overflow-hidden rounded-[2rem] border border-border/80 bg-surface shadow-premium-xl">
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="relative min-h-[280px] lg:min-h-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase sm:text-sm">
                  {label}
                </p>
                <span className="rounded-full border border-brand/20 bg-brand/8 px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-brand uppercase">
                  {status}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{summary}</p>

              <ul className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground sm:text-base">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/8 p-4 sm:p-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-gold-dark uppercase">
                  {raisedLabel}
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">{raisedValue}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={primaryButton.href} className={homeBtnPrimaryClass}>
                  {primaryButton.label}
                </Link>
                <Link href={secondaryButton.href} className={homeBtnOutlineClass}>
                  {secondaryButton.label}
                </Link>
              </div>
            </div>
          </div>
        </MotionSection>
      </SectionContainer>
    </section>
  );
}
