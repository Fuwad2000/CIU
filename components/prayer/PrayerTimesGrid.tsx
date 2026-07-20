"use client";

import { ClockIcon } from "@/components/home/icons";
import { MotionItem, MotionStagger } from "@/components/motion";
import type { PrayerTime } from "@/content/PrayerTimesContent";

export default function PrayerTimesGrid({
  times,
  nextPrayer,
  className = "",
}: {
  times: PrayerTime[];
  nextPrayer: string;
  className?: string;
}) {
  return (
    <MotionStagger
      className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5 ${className}`}
    >
      {times.map((prayer) => {
        const isNext = prayer.name === nextPrayer;

        return (
          <MotionItem
            key={prayer.name}
            className={`flex min-h-[118px] flex-col items-center justify-center rounded-2xl border px-4 py-6 text-center transition duration-300 sm:min-h-[128px] sm:px-5 sm:py-7 ${
              isNext
                ? "border-gold/45 bg-gradient-to-b from-gold/15 via-gold/8 to-white shadow-premium"
                : "border-border/80 bg-surface shadow-sm hover:border-brand/20 hover:shadow-premium"
            }`}
          >
            {isNext ? (
              <p className="mb-2 inline-flex items-center justify-center gap-1 text-[0.65rem] font-semibold tracking-[0.14em] text-gold uppercase sm:text-xs">
                <ClockIcon className="h-3.5 w-3.5" />
                Next Prayer
              </p>
            ) : null}
            <p
              className={`text-base font-semibold sm:text-lg ${
                isNext ? "text-gold-dark" : "text-foreground"
              }`}
            >
              {prayer.name}
            </p>
            <p
              className={`mt-1 text-base sm:text-lg ${
                isNext ? "font-semibold text-gold-dark" : "text-muted"
              }`}
            >
              {prayer.time}
            </p>
          </MotionItem>
        );
      })}
    </MotionStagger>
  );
}
