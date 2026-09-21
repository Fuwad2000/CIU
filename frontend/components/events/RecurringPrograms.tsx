"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { recurringEvents, usePublicEvents } from "@frontend/components/events/usePublicEvents";
import SectionContainer from "@frontend/components/home/SectionContainer";
import SectionHeading from "@frontend/components/home/SectionHeading";
import { homeCardInteractiveClass, homeSectionClass } from "@frontend/components/home/homeUi";
import { MotionItem, MotionStagger } from "@frontend/components/motion";
import { recurringProgramsContent } from "@frontend/content/EventsContent";
import { isExternalHref } from "@frontend/lib/externalLink";

export default function RecurringPrograms() {
  const { id, label, heading, subheading, programs, note } = recurringProgramsContent;
  const livePrograms = recurringEvents(usePublicEvents()).map((event) => ({
    id: event.id,
    title: event.title,
    frequency: event.dateLabel,
    time: event.time,
    audience: event.location,
    href: event.href,
    buttonLabel: event.buttonLabel,
  }));
  const items = livePrograms.length > 0 ? livePrograms : programs;

  return (
    <section id={id} className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
      <SectionContainer>
        <SectionHeading label={label} heading={heading} subheading={subheading} />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((program) => (
            <MotionItem key={program.id}>
              <article className={`h-full ${homeCardInteractiveClass} p-6`}>
                <div className="inline-flex rounded-2xl bg-brand/10 p-3 text-brand">
                  <CalendarDays className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground sm:text-lg">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-brand">{program.frequency}</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted">
                  <Clock className="h-4 w-4 text-brand" strokeWidth={1.75} aria-hidden="true" />
                  {program.time}
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted">
                  <MapPin className="h-4 w-4 text-brand" strokeWidth={1.75} aria-hidden="true" />
                  {program.audience}
                </p>
                {isExternalHref(program.href) ? (
                  <a
                    href={program.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {program.buttonLabel}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href={program.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {program.buttonLabel}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                )}
              </article>
            </MotionItem>
          ))}
        </MotionStagger>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted sm:text-base">{note}</p>
      </SectionContainer>
    </section>
  );
}
