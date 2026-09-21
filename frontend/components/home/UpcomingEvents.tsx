"use client";

import Link from "next/link";
import { usePublicEvents } from "@frontend/components/events/usePublicEvents";
import SectionContainer from "@frontend/components/home/SectionContainer";
import SectionHeading from "@frontend/components/home/SectionHeading";
import { ArrowRightIcon, CalendarIcon, ClockIcon, MapPinIcon } from "@frontend/components/home/icons";
import {
  homeBtnGhostClass,
  homeBtnOutlineClass,
  homeCardInteractiveClass,
  homeSectionClass,
} from "@frontend/components/home/homeUi";
import { MotionItem, MotionStagger } from "@frontend/components/motion";
import { upcomingEventsContent } from "@frontend/content/HomeContent";
import { isExternalHref } from "@frontend/lib/externalLink";

export default function UpcomingEvents() {
  const events = usePublicEvents().slice(0, 3);

  return (
    <section className={`${homeSectionClass} border-y border-border/80 bg-section-warm`}>
      <SectionContainer>
        <SectionHeading
          label={upcomingEventsContent.label}
          heading={upcomingEventsContent.heading}
          subheading={upcomingEventsContent.subheading}
        />

        <MotionStagger className="mt-14 grid gap-7 lg:grid-cols-3">
          {events.map((event) => (
            <MotionItem key={event.id}>
              <article
                className={`group relative h-full overflow-hidden ${homeCardInteractiveClass} border-l-[5px] border-l-gold/75 p-7 sm:p-8`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-brand/10 p-3 text-brand shadow-sm">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold tracking-wide text-gold-dark uppercase">
                    {event.dateLabel}
                  </span>
                </div>

                <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted sm:text-base">
                  <ClockIcon className="h-4 w-4 text-brand" />
                  {event.time}
                </p>

                <h3 className="mt-4 text-xl font-semibold text-foreground sm:text-2xl">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {event.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted sm:text-base">
                  <MapPinIcon />
                  {event.location}
                </p>
                {isExternalHref(event.href) ? (
                  <a
                    href={event.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${homeBtnGhostClass} mt-6`}
                  >
                    {event.buttonLabel ?? "View Details"}
                    <ArrowRightIcon />
                  </a>
                ) : (
                  <Link href={event.href} className={`${homeBtnGhostClass} mt-6`}>
                    {event.buttonLabel ?? "View Details"}
                    <ArrowRightIcon />
                  </Link>
                )}
              </article>
            </MotionItem>
          ))}
        </MotionStagger>

        <div className="mt-12 text-center">
          <Link href={upcomingEventsContent.viewAllHref} className={homeBtnOutlineClass}>
            {upcomingEventsContent.viewAllLabel}
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
