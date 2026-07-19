import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import {
  GraduationCapIcon,
  HandHeartIcon,
  SparklesIcon,
  UsersIcon,
} from "@/components/home/icons";
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
    <section className="bg-brand py-14 text-white sm:py-16 lg:py-20">
      <SectionContainer>
        <SectionHeading heading={impactContent.heading} light />

        {/* Placeholder statistics — replace with confirmed organizational data before publishing. */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impactContent.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-white/10 px-5 py-6 text-center backdrop-blur-sm"
            >
              <div className="mx-auto mb-4 inline-flex rounded-full bg-white/10 p-3">
                <ImpactIcon icon={stat.icon} />
              </div>
              <p className="text-3xl font-semibold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-white/90 sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
