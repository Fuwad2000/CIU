"use client";

import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import { homeBtnOutlineClass, homeBtnPrimaryClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { mediaHubContent } from "@/content/MediaContent";
import { ArrowUpRight } from "lucide-react";

export default function MediaHubCards() {
  const { cards } = mediaHubContent;

  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <MotionStagger className="grid gap-6 lg:grid-cols-2">
          {cards.map((card) => (
            <MotionItem
              key={card.id}
              className="group overflow-hidden rounded-[2rem] border border-border/80 bg-surface shadow-premium transition duration-500 hover:-translate-y-1 hover:shadow-premium-xl"
            >
              <div className="grid sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="relative min-h-[220px] sm:min-h-full">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/5" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className={`${homeBtnPrimaryClass} mt-6 w-full sm:w-auto`}
                  >
                    {card.buttonLabel}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}

export function MediaFeaturedStrip() {
  const { featuredHeading, featuredSubheading } = mediaHubContent;

  return (
    <section className={`${homeSectionClass} bg-surface`}>
      <SectionContainer>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {featuredHeading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{featuredSubheading}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mediaHubContent.cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="rounded-2xl border border-border/80 bg-background/70 p-5 transition hover:border-brand/20 hover:shadow-premium"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                Sample Layout
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">{card.title}</p>
              <p className="mt-2 text-sm text-muted">Ready for CIU media content</p>
            </Link>
          ))}
          <Link
            href="/Media/images"
            className="rounded-2xl border border-dashed border-brand/25 bg-brand/5 p-5 transition hover:border-brand/35 hover:bg-brand/8"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
              Add More
            </p>
            <p className="mt-2 text-base font-semibold text-foreground">New Albums & Series</p>
            <p className="mt-2 text-sm text-muted">Expand galleries and lecture collections</p>
          </Link>
        </div>

        <div className="mt-10 text-center">
          <Link href="/Contact" className={homeBtnOutlineClass}>
            Request Media Access
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
