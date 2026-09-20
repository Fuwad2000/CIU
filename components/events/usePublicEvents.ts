"use client";

import { useEffect, useState } from "react";
import { upcomingEvents, type EventItem } from "@/content/EventsContent";

export function usePublicEvents(fallback: EventItem[] = upcomingEvents) {
  const [events, setEvents] = useState<EventItem[]>(fallback);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/events")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: EventItem[] | null) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return events;
}

export function featuredEvent(events: EventItem[]) {
  return events.find((event) => event.featured) ?? events[0];
}

export function recurringEvents(events: EventItem[]) {
  return events.filter((event) => event.recurring);
}
