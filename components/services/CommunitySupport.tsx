"use client";

import Image from "next/image";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeSectionClass } from "@/components/home/homeUi";
import { servicesIntroContent } from "@/content/ServicesContent";

export default function CommunitySupport() {
  const { label, heading, paragraphs, highlight, imageSrc, imageAlt } =
    servicesIntroContent;

  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <MotionStagger className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionItem className="relative order-2 lg:order-1">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand/10 via-transparent to-gold/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/80 shadow-premium-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </MotionItem>

          <MotionItem className="order-1 lg:order-2">
            <MotionSection>
              <SectionHeading align="left" label={label} heading={heading} />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <blockquote className="mt-6 rounded-2xl border border-gold/25 bg-gold/5 px-5 py-4 text-sm leading-relaxed text-foreground sm:text-base">
                <span aria-hidden="true" className="font-serif text-2xl text-gold">
                  “
                </span>
                {highlight}
                <span aria-hidden="true" className="font-serif text-2xl text-gold">
                  ”
                </span>
              </blockquote>
            </MotionSection>
          </MotionItem>
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
