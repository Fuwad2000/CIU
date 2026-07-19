"use client";

import { useEffect, useState } from "react";
import { announcementContent } from "@/content/AnnouncementContent";

function AnnouncementLabel() {
  return (
    <div className="relative z-10 flex shrink-0 items-center bg-gold pl-4 pr-5 text-sm font-semibold tracking-wide text-white sm:text-base">
      <span>{announcementContent.label}</span>
      <span
        className="absolute top-0 -right-3 h-full w-3 bg-gold"
        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
        aria-hidden="true"
      />
    </div>
  );
}

function MarqueeTrack({ items }: { items: string[] }) {
  const track = items.flatMap((item, index) => [
    <span key={`a-${index}`} className="mx-8 inline-flex items-center gap-8">
      <span>{item}</span>
      <span className="text-gold" aria-hidden="true">
        •
      </span>
    </span>,
  ]);

  return (
    <div className="announcement-marquee-track flex w-max items-center whitespace-nowrap py-2.5 text-sm text-foreground sm:py-3 sm:text-base">
      {track}
      {track}
    </div>
  );
}

export default function AnnouncementTicker() {
  const { items } = announcementContent;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div
      className="border-b-2 border-brand bg-background"
      role="region"
      aria-label="Site announcements"
    >
      <div className="flex h-10 items-stretch overflow-hidden sm:h-11">
        <AnnouncementLabel />

        {reduceMotion ? (
          <div className="min-w-0 flex-1 overflow-x-auto px-4 py-2.5 sm:px-6">
            <p className="text-sm text-foreground sm:text-base">
              {items.join(" • ")}
            </p>
          </div>
        ) : (
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="announcement-marquee flex w-max">
              <MarqueeTrack items={items} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
