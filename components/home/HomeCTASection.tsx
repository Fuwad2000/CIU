"use client";

import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { ArrowRightIcon } from "@/components/home/icons";
import { homeBtnPrimaryClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionSection } from "@/components/motion";
import { homeCtaContent } from "@/content/HomeContent";

export default function HomeCTASection() {
  const { label, heading, subheading, primary, secondary } = homeCtaContent;

  return (
    <section className={`${homeSectionClass} relative overflow-hidden`}>
      <div
        className="pointer-events-none absolute inset-0 bg-brand-gradient opacity-[0.97]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />

      <SectionContainer className="relative">
        <MotionSection>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading label={label} heading={heading} subheading={subheading} light />
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={primary.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-brand shadow-premium-lg transition hover:bg-brand-light hover:shadow-premium-xl"
              >
                {primary.label}
                <ArrowRightIcon />
              </Link>
              <Link
                href={secondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/15"
              >
                {secondary.label}
              </Link>
            </div>
          </div>
        </MotionSection>
      </SectionContainer>
    </section>
  );
}
