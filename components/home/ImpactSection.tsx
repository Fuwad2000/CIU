"use client";

import CountUpStat from "@/components/home/CountUpStat";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import {
  GraduationCapIcon,
  HandHeartIcon,
  SparklesIcon,
  UsersIcon,
} from "@/components/home/icons";
import { homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { impactContent, type ImpactStat } from "@/content/HomeContent";

function ImpactIcon({ icon }: { icon: ImpactStat["icon"] }) {
  switch (icon) {
    case "users":
      return <UsersIcon className="mx-auto h-6 w-6 text-brand-light" />;
    case "graduation-cap":
      return <GraduationCapIcon className="mx-auto text-brand-light" />;
    case "hand-heart":
      return <HandHeartIcon className="mx-auto h-6 w-6 text-brand-light" />;
    case "sparkles":
      return <SparklesIcon className="mx-auto text-brand-light" />;
  }
}

export default function ImpactSection() {
  return (
    <section className={`${homeSectionClass} relative overflow-hidden bg-brand-gradient text-white`}>
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <SectionContainer className="relative">
        <SectionHeading
          heading={impactContent.heading}
          subheading={impactContent.subheading}
          light
        />

        <MotionStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {impactContent.stats.map((stat, index) => (
            <MotionItem
              key={stat.label}
              className="group rounded-3xl border border-white/15 bg-white/10 px-7 py-10 text-center shadow-premium backdrop-blur-md transition duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-premium-lg"
            >
              <div className="mx-auto mb-5 inline-flex rounded-full bg-white/10 p-4 ring-1 ring-white/15 transition group-hover:bg-white/15">
                <ImpactIcon icon={stat.icon} />
              </div>
              <p className="text-4xl font-semibold tabular-nums text-white sm:text-5xl lg:text-[3.25rem]">
                <CountUpStat value={stat.value} suffix="+" delay={index * 120} />
              </p>
              <p className="mt-3 text-base font-medium text-white/90 sm:text-lg">
                {stat.label}
              </p>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
