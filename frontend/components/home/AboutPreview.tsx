"use client";

import ZoomableImage from "@frontend/components/lightbox/ZoomableImage";
import Link from "next/link";
import SectionContainer from "@frontend/components/home/SectionContainer";
import SectionHeading from "@frontend/components/home/SectionHeading";
import {
  homeBtnPrimaryClass,
  homeSectionClass,
} from "@frontend/components/home/homeUi";
import { MotionItem, MotionStagger } from "@frontend/components/motion";
import { aboutPreviewContent } from "@frontend/content/HomeContent";
import { ArrowRightIcon } from "@frontend/components/home/icons";

export default function AboutPreview() {
  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <MotionStagger className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <MotionItem className="relative">
            <div
              className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-brand/10 via-transparent to-gold/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-border/80 shadow-premium-xl sm:aspect-[4/3]">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-16 w-16 border-l-4 border-t-4 border-gold/80 rounded-tl-3xl" aria-hidden="true" />
              <ZoomableImage
                src={aboutPreviewContent.imageSrc}
                alt={aboutPreviewContent.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </MotionItem>

          <MotionItem>
            <SectionHeading
              align="left"
              label={aboutPreviewContent.label}
              heading={aboutPreviewContent.heading}
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:text-xl">
              {aboutPreviewContent.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Link href={aboutPreviewContent.button.href} className={`${homeBtnPrimaryClass} mt-10`}>
              {aboutPreviewContent.button.label}
              <ArrowRightIcon />
            </Link>
          </MotionItem>
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
