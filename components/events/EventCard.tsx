import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import EventDateBlock from "@/components/events/EventDateBlock";
import EventTag from "@/components/events/EventTag";
import { homeBtnGhostClass, homeCardInteractiveClass } from "@/components/home/homeUi";
import { categoryLabels, type EventItem } from "@/content/EventsContent";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className={`group flex h-full flex-col overflow-hidden ${homeCardInteractiveClass}`}>
      {event.image ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.image}
            alt={`${event.title} event`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand shadow-sm">
              {categoryLabels[event.category]}
            </span>
          </div>
        </div>
      ) : (
        <div className="border-b border-border/70 bg-background/70 px-5 py-4">
          <div className="flex items-start gap-4">
            <EventDateBlock dateLabel={event.dateLabel} compact />
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                {categoryLabels[event.category]}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{event.title}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {event.image ? (
          <>
            <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
              {categoryLabels[event.category]}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">{event.title}</h3>
          </>
        ) : null}

        <div className={`${event.image ? "mt-3" : "mt-2"} space-y-2 text-sm text-muted`}>
          <p className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} aria-hidden="true" />
            {event.dateLabel} · {event.time}
          </p>
          <p className="inline-flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} aria-hidden="true" />
            {event.location}
          </p>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
          {event.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <EventTag key={tag} label={tag} />
          ))}
        </div>

        <Link href={event.href} className={`${homeBtnGhostClass} mt-5`}>
          {event.buttonLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
