"use client";

import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeSectionClass } from "@/components/home/homeUi";
import MediaHero from "@/components/media/MediaHero";
import MembershipForm from "@/components/membership/MembershipForm";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import { membershipContent } from "@/content/MembershipContent";
import { ArrowUpRight, UserPlus } from "lucide-react";

export default function MembershipPage() {
  const { hero, overview, benefits, process, sidebar } = membershipContent;

  return (
    <div className="overflow-x-hidden bg-background">
      <MediaHero {...hero} />

      <section className={`${homeSectionClass} bg-section-warm`}>
        <SectionContainer>
          <MotionSection>
            <SectionHeading
              label={overview.label}
              heading={overview.heading}
              subheading={overview.intro}
            />
          </MotionSection>

          <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <MotionItem key={benefit.title}>
                <article className="h-full rounded-3xl border border-border/80 bg-surface p-6 shadow-premium">
                  <div className="inline-flex rounded-2xl bg-brand/10 p-3 text-brand">
                    <UserPlus className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground sm:text-lg">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {benefit.description}
                  </p>
                </article>
              </MotionItem>
            ))}
          </MotionStagger>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted sm:text-base">
            {overview.note}
          </p>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
        <SectionContainer>
          <MotionStagger className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <MotionItem>
              <MembershipForm />
            </MotionItem>

            <MotionItem className="space-y-6">
              <div className="rounded-3xl border border-border/80 bg-background p-6 shadow-premium sm:p-8">
                <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                  {process.heading}
                </h2>
                <ol className="mt-6 space-y-5">
                  {process.steps.map((step) => (
                    <li key={step.step} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-border/80 bg-brand-gradient p-6 text-white shadow-premium sm:p-8">
                <h2 className="text-xl font-semibold sm:text-2xl">{sidebar.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
                  {sidebar.body}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={sidebar.contactHref}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold-dark"
                  >
                    {sidebar.contactLabel}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                  <Link
                    href={sidebar.volunteerHref}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                  >
                    {sidebar.volunteerLabel}
                  </Link>
                </div>
              </div>
            </MotionItem>
          </MotionStagger>
        </SectionContainer>
      </section>
    </div>
  );
}
