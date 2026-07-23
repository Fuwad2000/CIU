"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import {
  homeBtnOutlineClass,
  homeBtnPrimaryClass,
  homeSectionClass,
} from "@/components/home/homeUi";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import { educationServicesContent } from "@/content/ServicesContent";

export default function EducationServices() {
  const { heading, intro, academy, imageSrc, imageAlt } = educationServicesContent;

  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <MotionSection>
          <SectionHeading heading={heading} subheading={intro} />
        </MotionSection>

        <MotionStagger className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionItem>
            <div className="rounded-3xl border border-border/80 bg-surface p-6 shadow-premium sm:p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                Featured Initiative
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                {academy.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                {academy.body}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                {academy.description}
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-foreground sm:text-base">Goals</h4>
                  <ul className="mt-3 space-y-2">
                    {academy.goals.map((goal) => (
                      <li key={goal} className="flex gap-2 text-sm leading-relaxed text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground sm:text-base">Strategy</h4>
                  <ul className="mt-3 space-y-2">
                    {academy.strategy.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {academy.primaryButton.external ? (
                  <a
                    href={academy.primaryButton.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={homeBtnPrimaryClass}
                  >
                    {academy.primaryButton.label}
                  </a>
                ) : (
                  <Link href={academy.primaryButton.href} className={homeBtnPrimaryClass}>
                    {academy.primaryButton.label}
                  </Link>
                )}
                {academy.secondaryButton.external ? (
                  <a
                    href={academy.secondaryButton.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={homeBtnOutlineClass}
                  >
                    {academy.secondaryButton.label}
                  </a>
                ) : (
                  <Link href={academy.secondaryButton.href} className={homeBtnOutlineClass}>
                    {academy.secondaryButton.label}
                  </Link>
                )}
              </div>
            </div>
          </MotionItem>

          <MotionItem className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/80 shadow-premium-lg lg:sticky lg:top-28">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </MotionItem>
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
