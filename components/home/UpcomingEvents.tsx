"use client";

import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { ArrowRightIcon, CalendarIcon, ClockIcon, MapPinIcon } from "@/components/home/icons";
import {
  homeBtnGhostClass,
  homeBtnOutlineClass,
  homeCardInteractiveClass,
  homeSectionClass,
} from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { upcomingEventsContent } from "@/content/HomeContent";

export default function UpcomingEvents() {
  return (
    <section className={`${homeSectionClass} border-y border-border/80 bg-section-warm`}>
      <SectionContainer>
        <SectionHeading
          label={upcomingEventsContent.label}
          heading={upcomingEventsContent.heading}
          subheading={upcomingEventsContent.subheading}
        />

        <MotionStagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {upcomingEventsContent.events.map((event) => (
            <MotionItem key={event.name}>
              <article
                className={`group relative h-full overflow-hidden ${homeCardInteractiveClass} border-l-4 border-l-gold/70 p-6 sm:p-7`}
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

                <h3 className="mt-3 text-lg font-semibold text-foreground sm:text-xl">
                  {event.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {event.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted sm:text-base">
                  <MapPinIcon />
                  {event.location}
                </p>
                <Link href={event.href} className={`${homeBtnGhostClass} mt-6`}>
                  View Details
                  <ArrowRightIcon />
                </Link>
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
