import AboutHero from "@/components/about/AboutHero";
import CharityRegistrationBanner from "@/components/about/CharityRegistrationBanner";
import LeadershipSection from "@/components/about/LeadershipSection";
import ImagePlaceholder from "@/components/about/ImagePlaceholder";
import {
  homeBtnOutlineClass,
  homeBtnPrimaryClass,
} from "@/components/home/homeUi";
import {
  AcademyIcon,
  CheckIcon,
  CommunitySectionIcon,
  LookingAheadIcon,
  MissionIcon,
  ServiceIcon,
  StatIcon,
  StoryIcon,
  ValueIcon,
  VisionIcon,
} from "@/components/about/icons";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import { aboutContent, type ServiceItem, type StatItem, type ValueItem } from "@/content/AboutContent";
import Link from "next/link";

function SectionHeading({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

function ValueCard({ title, description, icon }: ValueItem) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="inline-flex rounded-xl bg-brand/10 p-3">
        <ValueIcon icon={icon} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-brand sm:text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
        {description}
      </p>
    </div>
  );
}

function ServiceCard({ title, description, icon }: ServiceItem) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="mb-4 inline-flex rounded-xl bg-brand/10 p-3">
        <ServiceIcon icon={icon} />
      </div>
      <h3 className="text-base font-semibold text-foreground sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
        {description}
      </p>
    </div>
  );
}

function StatCard({ value, label, description, icon }: StatItem) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 text-center shadow-sm sm:p-6">
      <div className="mx-auto mb-4 inline-flex rounded-full bg-brand/10 p-3">
        <StatIcon icon={icon} />
      </div>
      <p className="text-3xl font-semibold text-brand sm:text-4xl">{value}</p>
      <h3 className="mt-2 text-base font-semibold text-foreground sm:text-lg">
        {label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
        {description}
      </p>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 sm:items-center">
      <div className="inline-flex shrink-0 rounded-xl bg-brand/10 p-3">{icon}</div>
      <h2 className="min-w-0 text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function StorySection({
  title,
  lead,
  intro,
  highlights,
  image,
}: {
  title: string;
  lead: string;
  intro: string;
  highlights: string[];
  image: (typeof aboutContent)["story"]["image"];
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand/[0.06] to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-0 h-16 w-16 rounded-tl-3xl border-l-[3px] border-t-[3px] border-gold/70"
        aria-hidden="true"
      />

      <div className="relative grid items-center lg:grid-cols-2">
        <div className="p-7 sm:p-9 lg:py-10">
          <div className="inline-flex rounded-2xl bg-brand-gradient p-[2px] shadow-premium">
            <div className="rounded-[14px] bg-surface p-3">
              <StoryIcon />
            </div>
          </div>
          <div className="gold-accent-bar mt-5 w-10" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
            {title}
          </h2>
          <p className="mt-5 text-base font-medium leading-relaxed text-foreground sm:text-lg">
            {lead}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:leading-7">
            {intro}
          </p>
          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-border/60 bg-background/80 px-3.5 py-3 text-sm leading-relaxed text-muted sm:text-base"
              >
                <CheckIcon className="mt-0.5 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border/80 p-4 sm:p-5 lg:border-t-0 lg:border-l lg:p-5 lg:pl-0">
          <ImagePlaceholder {...image} aspect="wide" className="rounded-2xl border-0 shadow-none" />
        </div>
      </div>
    </div>
  );
}

function VisionMissionCard({
  icon,
  title,
  intro,
  listLabel,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  intro: string;
  listLabel: string;
  items: string[];
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface p-7 shadow-premium sm:p-9">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand/[0.06] to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-0 h-16 w-16 rounded-tl-3xl border-l-[3px] border-t-[3px] border-gold/70"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="inline-flex rounded-2xl bg-brand-gradient p-[2px] shadow-premium">
          <div className="rounded-[14px] bg-surface p-3">{icon}</div>
        </div>
        <div className="gold-accent-bar mt-5 w-10" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:leading-7">
          {intro}
        </p>
        <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-brand uppercase sm:text-sm">
          {listLabel}
        </p>
        <ul className="mt-4 flex-1 space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-border/60 bg-background/80 px-3.5 py-3 text-sm leading-relaxed text-muted sm:text-base"
            >
              <CheckIcon className="mt-0.5 shrink-0 text-gold" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const {
    story,
    vision,
    mission,
    values,
    whatWeDo,
    alAzhar,
    community,
    impact,
    lookingAhead,
  } = aboutContent;

  return (
    <div className="overflow-x-hidden bg-background">
      <AboutHero />

      <CharityRegistrationBanner />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <MotionSection>
          <StorySection
            title={story.title}
            lead={story.lead}
            intro={story.intro}
            highlights={story.highlights}
            image={story.image}
          />
        </MotionSection>
      </section>

      <section className="relative overflow-hidden border-y border-border/80 bg-section-warm">
        <div
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/6 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/8 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <MotionSection>
          <MotionStagger className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <MotionItem className="h-full">
              <VisionMissionCard
                icon={<VisionIcon />}
                title={vision.title}
                intro={vision.intro}
                listLabel="We envision"
                items={vision.highlights}
              />
            </MotionItem>
            <MotionItem className="h-full">
              <VisionMissionCard
                icon={<MissionIcon />}
                title={mission.title}
                intro={mission.intro}
                listLabel="We are committed to"
                items={mission.commitments}
              />
            </MotionItem>
          </MotionStagger>
          <div className="mx-auto mt-10 max-w-3xl">
            <ImagePlaceholder {...mission.image} />
          </div>
          </MotionSection>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <MotionSection>
        <SectionHeading title={values.title} intro={values.intro} />
        <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {values.items.map((item) => (
            <MotionItem key={item.title}>
              <ValueCard {...item} />
            </MotionItem>
          ))}
        </MotionStagger>
        <div className="mx-auto mt-10 max-w-3xl">
          <ImagePlaceholder {...values.image} />
        </div>
        </MotionSection>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <MotionSection>
          <SectionHeading title={whatWeDo.title} intro={whatWeDo.intro} />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {whatWeDo.items.map((item) => (
              <MotionItem key={item.title}>
                <ServiceCard {...item} />
              </MotionItem>
            ))}
          </MotionStagger>
          <div className="mx-auto mt-10 max-w-4xl">
            <ImagePlaceholder {...whatWeDo.image} aspect="wide" />
          </div>
          </MotionSection>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <MotionSection>
        <MotionStagger className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <MotionItem>
            <SectionTitle icon={<AcademyIcon />} title={alAzhar.title} />
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
              {alAzhar.intro}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
              {alAzhar.description}
            </p>
            <h3 className="mt-6 text-base font-semibold text-foreground sm:text-lg">
              {alAzhar.goalsTitle}
            </h3>
            <ul className="mt-3 space-y-2">
              {alAzhar.goals.map((goal) => (
                <li
                  key={goal}
                  className="flex gap-2 text-sm leading-relaxed text-muted sm:text-base"
                >
                  <CheckIcon className="mt-0.5 shrink-0 text-gold" />
                  {goal}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={alAzhar.portalHref}
                target="_blank"
                rel="noopener noreferrer"
                className={homeBtnPrimaryClass}
              >
                Student Portal — Log In
              </a>
              <Link href="/Education" className={homeBtnOutlineClass}>
                Explore Azhar Canada
              </Link>
            </div>
          </MotionItem>
          <MotionItem>
          <ImagePlaceholder {...alAzhar.image} aspect="wide" />
          </MotionItem>
        </MotionStagger>
        </MotionSection>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <MotionSection>
          <MotionStagger className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <MotionItem>
            <ImagePlaceholder {...community.image} aspect="wide" />
            </MotionItem>
            <MotionItem>
              <SectionTitle
                icon={<CommunitySectionIcon />}
                title={community.title}
              />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                {community.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </MotionItem>
          </MotionStagger>
          </MotionSection>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <LeadershipSection />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <MotionSection>
        <SectionHeading title={impact.title} intro={impact.note} />
        <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {impact.stats.map((stat) => (
            <MotionItem key={stat.label}>
              <StatCard {...stat} />
            </MotionItem>
          ))}
        </MotionStagger>
        <div className="mx-auto mt-10 max-w-4xl">
          <ImagePlaceholder {...impact.image} aspect="wide" />
        </div>
        </MotionSection>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <MotionSection>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex rounded-xl bg-brand/10 p-3">
              <LookingAheadIcon />
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {lookingAhead.title}
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-center text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
            {lookingAhead.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            <ImagePlaceholder {...lookingAhead.image} aspect="banner" />
          </div>
          </MotionSection>
        </div>
      </section>
    </div>
  );
}
