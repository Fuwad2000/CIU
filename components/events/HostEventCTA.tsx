"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import {
  homeBtnOutlineClass,
  homeBtnPrimaryClass,
  homeSectionClass,
} from "@/components/home/homeUi";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import { hostEventContent } from "@/content/EventsContent";

export default function HostEventCTA() {
  const {
    id,
    label,
    heading,
    body,
    areas,
    note,
    primaryButton,
    secondaryButton,
    imageSrc,
    imageAlt,
  } = hostEventContent;

  return (
    <section id={id} className={homeSectionClass}>
      <SectionContainer>
        <MotionStagger className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionItem>
            <MotionSection>
              <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">{label}</p>
              <div className="gold-accent-bar mt-4" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {heading}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">{body}</p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {areas.map((area) => (
                  <li key={area} className="flex gap-2 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} />
                    {area}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={primaryButton.href} className={homeBtnPrimaryClass}>
                  {primaryButton.label}
                </Link>
                <Link href={secondaryButton.href} className={homeBtnOutlineClass}>
                  {secondaryButton.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-muted">{note}</p>
            </MotionSection>
          </MotionItem>

          <MotionItem className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/80 shadow-premium-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </MotionItem>
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
