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

const pillarAccents: Record<Pillar["icon"], string> = {
  book: "from-brand/12 via-brand/5 to-transparent",
  users: "from-gold/14 via-gold/5 to-transparent",
  heart: "from-brand/10 via-gold/8 to-transparent",
  hand: "from-gold/12 via-brand/6 to-transparent",
};

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
    <section
      className={`${homeSectionClass} relative overflow-hidden border-y border-border/80 bg-section-warm`}
    >
      <div
        className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-brand/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <SectionContainer className="relative">
        <SectionHeading
          heading={missionPillarsContent.heading}
          subheading={missionPillarsContent.subheading}
        />

        <MotionStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {missionPillarsContent.pillars.map((pillar) => (
            <MotionItem
              key={pillar.title}
              className={`group relative overflow-hidden ${homeCardInteractiveClass} p-8 sm:p-9`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-0 transition duration-500 group-hover:opacity-100 ${pillarAccents[pillar.icon]}`}
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div
                className="absolute left-0 top-0 h-14 w-14 rounded-tl-2xl border-l-[3px] border-t-[3px] border-gold/75 opacity-80"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="inline-flex rounded-2xl bg-brand-gradient p-[2px] shadow-premium transition duration-300 group-hover:shadow-premium-lg">
                  <div className="rounded-[14px] bg-surface px-4 py-4">
                    <PillarIcon icon={pillar.icon} />
                  </div>
                </div>

                <div
                  className="gold-accent-bar mt-7 w-10 transition-all duration-300 group-hover:w-14"
                  aria-hidden="true"
                />

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {pillar.description}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
