"use client";

import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import {
  BookIcon,
  HandHeartIcon,
  HeartIcon,
  UsersIcon,
} from "@/components/home/icons";
import { homeCardInteractiveClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { missionPillarsContent, type Pillar } from "@/content/HomeContent";

function PillarIcon({ icon }: { icon: Pillar["icon"] }) {
  switch (icon) {
    case "book":
      return <BookIcon className="text-brand" />;
    case "users":
      return <UsersIcon className="text-brand" />;
    case "heart":
      return <HeartIcon className="text-brand" />;
    case "hand":
      return <HandHeartIcon className="text-brand" />;
  }
}

export default function MissionPillars() {
  return (
    <section className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
      <SectionContainer>
        <SectionHeading
          heading={missionPillarsContent.heading}
          subheading={missionPillarsContent.subheading}
        />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {missionPillarsContent.pillars.map((pillar, index) => (
            <MotionItem
              key={pillar.title}
              className={`group relative overflow-hidden ${homeCardInteractiveClass} p-7`}
            >
              <div
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold tracking-[0.16em] text-brand/60">
                0{index + 1}
              </span>
              <div className="mt-4 inline-flex rounded-2xl bg-brand/10 p-3.5 shadow-sm">
                <PillarIcon icon={pillar.icon} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground sm:text-lg">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {pillar.description}
              </p>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
