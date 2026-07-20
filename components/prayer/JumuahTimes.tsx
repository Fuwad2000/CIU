"use client";

import { MotionItem, MotionStagger } from "@/components/motion";
import type { JumuahSession } from "@/lib/prayerSchedule";

export default function JumuahTimes({
  sessions,
  note,
  compact = false,
}: {
  sessions: JumuahSession[];
  note?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "" : "mt-10"}>
      <div className={compact ? "mb-6 sm:mb-7" : "mb-4"}>
        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase sm:text-sm">
          Jumu&apos;ah
        </p>
        <h3
          className={`mt-2 font-semibold tracking-tight text-foreground ${
            compact ? "text-xl sm:text-2xl" : "text-xl sm:text-2xl"
          }`}
        >
          Friday Prayer Times
        </h3>
      </div>

      <MotionStagger className={`grid gap-4 ${compact ? "sm:grid-cols-2 sm:gap-5" : "gap-4 sm:grid-cols-2"}`}>
        {sessions.map((session) => (
          <MotionItem
            key={session.label}
            className={`rounded-2xl border border-border/80 bg-surface shadow-sm ${
              compact ? "p-5 sm:p-6" : "card-premium p-6 sm:p-8"
            }`}
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase sm:text-sm">
              {session.label}
            </p>
            <div className={`mt-5 grid grid-cols-2 gap-4 ${compact ? "sm:gap-5" : "gap-4 sm:grid-cols-2"}`}>
              <div className="rounded-xl bg-background/80 px-3 py-3 sm:px-4 sm:py-4">
                <p className="text-sm font-semibold text-muted sm:text-base">Khutbah</p>
                <p className={`mt-1.5 font-semibold text-foreground ${compact ? "text-xl sm:text-2xl" : "text-xl sm:text-2xl"}`}>
                  {session.khutbah}
                </p>
              </div>
              <div className="rounded-xl bg-background/80 px-3 py-3 sm:px-4 sm:py-4">
                <p className="text-sm font-semibold text-muted sm:text-base">Iqamah</p>
                <p className={`mt-1.5 font-semibold text-foreground ${compact ? "text-xl sm:text-2xl" : "text-xl sm:text-2xl"}`}>
                  {session.iqamah}
                </p>
              </div>
            </div>
          </MotionItem>
        ))}
      </MotionStagger>

      {note ? (
        <p className={`text-muted italic ${compact ? "mt-4 text-sm sm:text-base" : "mt-6 text-base sm:text-lg"}`}>
          {note}
        </p>
      ) : null}
    </div>
  );
}
