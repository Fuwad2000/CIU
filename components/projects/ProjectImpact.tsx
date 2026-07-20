"use client";

import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { projectImpactContent } from "@/content/ProjectsContent";

export default function ProjectImpact() {
  const { heading, subheading, stats } = projectImpactContent;

  return (
    <section className={`${homeSectionClass} bg-brand-gradient text-white`}>
      <SectionContainer>
        <SectionHeading heading={heading} subheading={subheading} light />

        <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <MotionItem
              key={stat.label}
              className="rounded-3xl border border-white/15 bg-white/10 p-7 text-center shadow-premium backdrop-blur-md"
            >
              <p className="text-4xl font-semibold tabular-nums sm:text-5xl">{stat.value}</p>
              <h3 className="mt-3 text-base font-semibold sm:text-lg">{stat.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
                {stat.description}
              </p>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
