"use client";

import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { servicesProcessContent } from "@/content/ServicesContent";

export default function ServicesProcess() {
  const { heading, steps } = servicesProcessContent;

  return (
    <section className={homeSectionClass}>
      <SectionContainer>
        <SectionHeading heading={heading} />

        <div className="relative mt-12">
          <div
            className="absolute top-8 hidden h-0.5 bg-border lg:left-[12.5%] lg:right-[12.5%] lg:block"
            aria-hidden="true"
          />

          <MotionStagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <MotionItem key={step.step} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand/20 bg-surface text-lg font-semibold text-brand shadow-premium">
                  {step.step}
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {step.description}
                </p>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </SectionContainer>
    </section>
  );
}
