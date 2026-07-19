"use client";

import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import {
  homeBtnPrimaryClass,
  homeSectionClass,
} from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { aboutPreviewContent } from "@/content/HomeContent";
import { ArrowRightIcon } from "@/components/home/icons";

export default function AboutPreview() {
  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <MotionStagger className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionItem className="relative">
            <div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand/10 via-transparent to-gold/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/80 shadow-premium-lg">
              <div className="absolute left-0 top-0 z-10 h-16 w-16 border-l-4 border-t-4 border-gold/80 rounded-tl-3xl" aria-hidden="true" />
              <Image
                src={aboutPreviewContent.imageSrc}
                alt={aboutPreviewContent.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </MotionItem>

          <MotionItem>
            <SectionHeading
              align="left"
              label={aboutPreviewContent.label}
              heading={aboutPreviewContent.heading}
            />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
              {aboutPreviewContent.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Link href={aboutPreviewContent.button.href} className={`${homeBtnPrimaryClass} mt-8`}>
              {aboutPreviewContent.button.label}
              <ArrowRightIcon />
            </Link>
          </MotionItem>
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
