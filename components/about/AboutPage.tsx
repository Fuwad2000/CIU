import ImagePlaceholder from "@/components/about/ImagePlaceholder";
import {
  AcademyIcon,
  CheckIcon,
  CommunitySectionIcon,
  HeroIcon,
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

function SectionHeading({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
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
    <div className="flex items-center gap-3">
      <div className="inline-flex rounded-xl bg-brand/10 p-3">{icon}</div>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export default function AboutPage() {
  const {
    hero,
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
    <div className="bg-background">
      <section className="bg-brand text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <MotionSection>
            <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.14em] text-brand-light uppercase sm:text-base">
              <HeroIcon className="text-brand-light" />
              About the Canadian Islamic Union (CIU)
            </p>
            <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              {hero.headline}
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/95 sm:text-base lg:text-lg">
              {hero.intro}
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            <ImagePlaceholder
              {...hero.image}
              aspect="banner"
              className="border-white/30 bg-white/10 [&_p]:text-white [&_svg]:text-white/60"
            />
          </div>
          </MotionSection>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <MotionSection>
        <MotionStagger className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <MotionItem>
            <SectionTitle icon={<StoryIcon />} title={story.title} />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </MotionItem>
          <MotionItem>
          <ImagePlaceholder {...story.image} aspect="wide" />
          </MotionItem>
        </MotionStagger>
        </MotionSection>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <MotionSection>
          <MotionStagger className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <MotionItem className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
              <div className="inline-flex rounded-xl bg-brand/10 p-3">
                <VisionIcon />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-brand sm:text-2xl">
                {vision.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                {vision.text}
              </p>
            </MotionItem>
            <MotionItem className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
              <div className="inline-flex rounded-xl bg-brand/10 p-3">
                <MissionIcon />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-brand sm:text-2xl">
                {mission.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                {mission.intro}
              </p>
              <p className="mt-4 text-sm font-medium text-foreground sm:text-base">
                We are committed to:
              </p>
              <ul className="mt-3 space-y-2">
                {mission.commitments.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-muted sm:text-base"
                  >
                    <CheckIcon className="mt-0.5 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
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
          </MotionItem>
          <MotionItem>
          <ImagePlaceholder {...alAzhar.image} aspect="wide" />
          </MotionItem>
        </MotionStagger>
        </MotionSection>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
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
