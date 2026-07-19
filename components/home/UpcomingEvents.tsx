import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { ArrowRightIcon, CalendarIcon, ClockIcon, MapPinIcon } from "@/components/home/icons";
import { upcomingEventsContent } from "@/content/HomeContent";

export default function UpcomingEvents() {
  return (
    <section className="border-y border-border bg-surface py-14 sm:py-16 lg:py-20">
      <SectionContainer>
        <SectionHeading heading={upcomingEventsContent.heading} />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {upcomingEventsContent.events.map((event) => (
            <article
              key={event.name}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-brand/10 p-3 text-brand">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand sm:text-base">
                    {event.dateLabel}
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-sm text-muted sm:text-base">
                    <ClockIcon className="h-4 w-4 text-brand" />
                    {event.time}
                  </p>
                </div>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {event.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {event.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted sm:text-base">
                <MapPinIcon />
                {event.location}
              </p>
              <Link
                href={event.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base"
              >
                View Details
                <ArrowRightIcon />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={upcomingEventsContent.viewAllHref}
            className="inline-flex items-center justify-center rounded-xl border border-brand/20 bg-brand/5 px-6 py-3 text-sm font-semibold text-brand transition hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base"
          >
            {upcomingEventsContent.viewAllLabel}
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
