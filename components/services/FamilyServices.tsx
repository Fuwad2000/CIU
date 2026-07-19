"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import {
  homeBtnPrimaryClass,
  homeCardClass,
  homeSectionClass,
} from "@/components/home/homeUi";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import { familyServicesContent } from "@/content/ServicesContent";

export default function FamilyServices() {
  const { id, label, heading, body, features, button, imageSrc, imageAlt } =
    familyServicesContent;

  return (
    <section id={id} className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
      <SectionContainer>
        <MotionStagger className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionItem>
            <MotionSection>
              <SectionHeading align="left" label={label} heading={heading} />
              <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                {body}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature.title} className={`${homeCardClass} p-5`}>
                    <div className="inline-flex rounded-xl bg-brand/10 p-2.5 text-brand">
                      <Heart className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-foreground sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <Link href={button.href} className={`${homeBtnPrimaryClass} mt-8`}>
                {button.label}
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </MotionSection>
          </MotionItem>

          <MotionItem className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/80 shadow-premium-lg lg:aspect-[5/4]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/25 via-transparent to-transparent" />
            </div>
          </MotionItem>
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
