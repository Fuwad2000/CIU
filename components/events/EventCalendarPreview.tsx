"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeBtnOutlineClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionSection } from "@/components/motion";
import { eventCalendarContent } from "@/content/EventsContent";

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ day: number | null; iso?: string }> = [];

  for (let i = 0; i < startOffset; i += 1) cells.push({ day: null });
  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({ day, iso });
  }

  return cells;
}

export default function EventCalendarPreview() {
  /*
    // Connect this section to the approved event management or calendar source later.
  */
  const { id, heading, viewFullLabel, viewFullHref, demoEvents } = eventCalendarContent;
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const [selectedIso, setSelectedIso] = useState<string | null>("2026-08-15");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthLabel = new Intl.DateTimeFormat("en-CA", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, typeof demoEvents>();
    demoEvents.forEach((event) => {
      const existing = map.get(event.date) ?? [];
      map.set(event.date, [...existing, event]);
    });
    return map;
  }, [demoEvents]);

  const cells = buildMonthGrid(year, month);
  const selectedEvents = selectedIso ? eventsByDate.get(selectedIso) ?? [] : [];

  return (
    <section id={id} className={homeSectionClass}>
      <SectionContainer>
        <MotionSection>
          <SectionHeading heading={heading} />

          <div className="mt-10 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium">
            <div className="flex items-center justify-between border-b border-border/80 px-5 py-4 sm:px-6">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 text-brand transition hover:bg-brand/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <h3 className="text-lg font-semibold text-foreground sm:text-xl">{monthLabel}</h3>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 text-brand transition hover:bg-brand/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="grid grid-cols-7 border-b border-border/80 bg-background/70">
              {weekdayLabels.map((label) => (
                <div
                  key={label}
                  className="px-2 py-3 text-center text-xs font-semibold tracking-wide text-muted uppercase"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-px bg-border/70 p-px">
              {cells.map((cell, index) => {
                if (!cell.day || !cell.iso) {
                  return <div key={`empty-${index}`} className="min-h-16 bg-surface sm:min-h-20" />;
                }

                const dayIso = cell.iso;
                const hasEvents = eventsByDate.has(dayIso);
                const isSelected = selectedIso === dayIso;

                return (
                  <button
                    key={dayIso}
                    type="button"
                    aria-label={`${cell.day} ${monthLabel}${hasEvents ? ", events scheduled" : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedIso(dayIso)}
                    className={`min-h-16 bg-surface p-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand sm:min-h-20 ${
                      isSelected ? "ring-2 ring-inset ring-brand/30" : "hover:bg-brand/5"
                    }`}
                  >
                    <span className="text-sm font-semibold text-foreground">{cell.day}</span>
                    {hasEvents ? (
                      <span className="mt-2 block h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-border/80 bg-background/70 px-5 py-4 sm:px-6">
              {selectedEvents.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">Events on this date</p>
                  {selectedEvents.map((event) => (
                    <div
                      key={`${event.date}-${event.title}`}
                      className="rounded-2xl border border-border/80 bg-surface px-4 py-3"
                    >
                      <p className="font-semibold text-foreground">{event.title}</p>
                      <p className="mt-1 text-sm text-muted">{event.time}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">Select a highlighted date to preview placeholder events.</p>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href={viewFullHref} className={homeBtnOutlineClass}>
              {viewFullLabel}
            </a>
          </div>
        </MotionSection>
      </SectionContainer>
    </section>
  );
}
