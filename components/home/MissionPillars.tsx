import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import {
  BookIcon,
  HandHeartIcon,
  HeartIcon,
  UsersIcon,
} from "@/components/home/icons";
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
    <section className="border-y border-border bg-surface py-14 sm:py-16 lg:py-20">
      <SectionContainer>
        <SectionHeading
          heading={missionPillarsContent.heading}
          subheading={missionPillarsContent.subheading}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {missionPillarsContent.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <div className="inline-flex rounded-xl bg-brand/10 p-3">
                <PillarIcon icon={pillar.icon} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground sm:text-lg">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
