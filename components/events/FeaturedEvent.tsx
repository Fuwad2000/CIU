"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import EventTag from "@/components/events/EventTag";
import SectionContainer from "@/components/home/SectionContainer";
import {
  homeBtnOutlineClass,
  homeBtnPrimaryClass,
  homeSectionClass,
} from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { featuredEventContent } from "@/content/EventsContent";

export default function FeaturedEvent() {
  const {
    label,
    title,
    dateLabel,
    time,
    location,
    description,
    chips,
    primaryButton,
    secondaryButton,
    note,
    imageSrc,
    imageAlt,
  } = featuredEventContent;

  return (
    <section className={homeSectionClass}>
      <SectionContainer>
        <MotionStagger className="grid items-center gap-10 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium-lg lg:grid-cols-2 lg:gap-0">
          <MotionItem className="relative min-h-[280px] lg:min-h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
          </MotionItem>

          <MotionItem className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">{label}</p>
            <div className="gold-accent-bar mt-4" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h2>

            <div className="mt-5 space-y-2 text-sm text-muted sm:text-base">
              <p className="inline-flex items-center gap-2 font-medium text-foreground">
                <Clock className="h-4 w-4 text-brand" strokeWidth={1.75} aria-hidden="true" />
                {dateLabel} · {time}
              </p>
              <p className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-brand" strokeWidth={1.75} aria-hidden="true" />
                {location}
              </p>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <EventTag key={chip} label={chip} />
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={primaryButton.href} className={homeBtnPrimaryClass}>
                {primaryButton.label}
              </Link>
              <Link href={secondaryButton.href} className={homeBtnOutlineClass}>
                {secondaryButton.label}
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-muted">{note}</p>
          </MotionItem>
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
