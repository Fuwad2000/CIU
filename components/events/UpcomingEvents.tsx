"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import EmptyEventsState from "@/components/events/EmptyEventsState";
import EventCard from "@/components/events/EventCard";
import EventFilters from "@/components/events/EventFilters";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeBtnOutlineClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import {
  categoryLabels,
  upcomingEvents,
  upcomingEventsSection,
  type EventDateFilterId,
  type EventFilterCategoryId,
  type EventItem,
} from "@/content/EventsContent";

const INITIAL_VISIBLE = 6;

function isThisMonth(date?: string) {
  if (!date) return false;
  const parsed = new Date(`${date}T12:00:00`);
  const now = new Date();
  return (
    parsed.getFullYear() === now.getFullYear() && parsed.getMonth() === now.getMonth()
  );
}

function matchesSearch(event: EventItem, query: string) {
  if (!query.trim()) return true;
  const normalized = query.trim().toLowerCase();
  return [
    event.title,
    event.description,
    event.location,
    event.dateLabel,
    categoryLabels[event.category],
    ...event.tags,
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}

function filterEvents(
  events: EventItem[],
  category: EventFilterCategoryId,
  dateFilter: EventDateFilterId,
  search: string
) {
  return events.filter((event) => {
    if (category !== "all" && event.category !== category) return false;
    if (dateFilter === "recurring" && !event.recurring) return false;
    if (dateFilter === "this-month" && !event.recurring && !isThisMonth(event.date)) {
      return false;
    }
    if (!matchesSearch(event, search)) return false;
    return true;
  });
}

export default function UpcomingEvents() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<EventFilterCategoryId>("all");
  const [dateFilter, setDateFilter] = useState<EventDateFilterId>("upcoming");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [showLoadMoreNote, setShowLoadMoreNote] = useState(false);

  useEffect(() => {
    const param = searchParams.get("category");
    if (
      param &&
      ["education", "youth", "family", "community", "spiritual", "volunteer"].includes(param)
    ) {
      setCategory(param as EventFilterCategoryId);
    }
  }, [searchParams]);

  const filteredEvents = useMemo(
    () => filterEvents(upcomingEvents, category, dateFilter, search),
    [category, dateFilter, search]
  );

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredEvents.length;

  const clearFilters = () => {
    setCategory("all");
    setDateFilter("upcoming");
    setSearch("");
    setVisibleCount(INITIAL_VISIBLE);
    setShowLoadMoreNote(false);
  };

  return (
    <section id={upcomingEventsSection.id} className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <SectionHeading
          heading={upcomingEventsSection.heading}
          subheading={upcomingEventsSection.subheading}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
          <EventFilters
            category={category}
            dateFilter={dateFilter}
            search={search}
            onCategoryChange={(value) => {
              setCategory(value);
              setVisibleCount(INITIAL_VISIBLE);
              setShowLoadMoreNote(false);
            }}
            onDateFilterChange={(value) => {
              setDateFilter(value);
              setVisibleCount(INITIAL_VISIBLE);
              setShowLoadMoreNote(false);
            }}
            onSearchChange={(value) => {
              setSearch(value);
              setVisibleCount(INITIAL_VISIBLE);
              setShowLoadMoreNote(false);
            }}
          />

          <div>
            {filteredEvents.length === 0 ? (
              <EmptyEventsState onClearFilters={clearFilters} />
            ) : (
              <>
                <MotionStagger className="grid gap-6 md:grid-cols-2">
                  {visibleEvents.map((event) => (
                    <MotionItem key={event.id}>
                      <EventCard event={event} />
                    </MotionItem>
                  ))}
                </MotionStagger>

                <div className="mt-8 text-center">
                  {canLoadMore ? (
                    <button
                      type="button"
                      onClick={() => setVisibleCount(filteredEvents.length)}
                      className={homeBtnOutlineClass}
                    >
                      {upcomingEventsSection.loadMoreLabel}
                    </button>
                  ) : filteredEvents.length >= INITIAL_VISIBLE ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setShowLoadMoreNote((value) => !value)}
                        className={homeBtnOutlineClass}
                      >
                        {upcomingEventsSection.loadMoreLabel}
                      </button>
                      {showLoadMoreNote ? (
                        <p className="mt-3 text-sm text-muted">{upcomingEventsSection.loadMoreNote}</p>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
