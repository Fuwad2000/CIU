"use client";

import { Info } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import { MotionSection } from "@/components/motion";
import { servicesNoticeContent } from "@/content/ServicesContent";

export default function ServicesNotice() {
  const { heading, paragraphs } = servicesNoticeContent;

  return (
    <section className="pb-14 sm:pb-16 lg:pb-20">
      <SectionContainer>
        <MotionSection>
          <div className="rounded-2xl border border-brand/20 bg-background px-6 py-6 sm:px-8 sm:py-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Info className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                  {heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted sm:text-base">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MotionSection>
      </SectionContainer>
    </section>
  );
}
