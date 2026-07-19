"use client";

import { Search } from "lucide-react";
import {
  eventDateFilters,
  eventFilterCategories,
  type EventDateFilterId,
  type EventFilterCategoryId,
} from "@/content/EventsContent";

type EventFiltersProps = {
  category: EventFilterCategoryId;
  dateFilter: EventDateFilterId;
  search: string;
  onCategoryChange: (category: EventFilterCategoryId) => void;
  onDateFilterChange: (dateFilter: EventDateFilterId) => void;
  onSearchChange: (search: string) => void;
};

function filterButtonClass(active: boolean) {
  return `rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
    active
      ? "bg-brand text-white shadow-sm"
      : "border border-border/80 bg-surface text-foreground hover:border-brand/20 hover:bg-brand/5"
  }`;
}

export default function EventFilters({
  category,
  dateFilter,
  search,
  onCategoryChange,
  onDateFilterChange,
  onSearchChange,
}: EventFiltersProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-surface p-5 shadow-premium sm:p-6">
      <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Find an Event</h2>

      <div className="mt-5">
        <label htmlFor="event-search" className="sr-only">
          Search events
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <input
            id="event-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search events"
            className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15 sm:text-base"
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">Category</p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {eventFilterCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              onClick={() => onCategoryChange(item.id)}
              className={filterButtonClass(category === item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">Date</p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by date">
          {eventDateFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={dateFilter === item.id}
              onClick={() => onDateFilterChange(item.id)}
              className={filterButtonClass(dateFilter === item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
