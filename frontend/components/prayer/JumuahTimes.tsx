"use client";

import { MotionItem, MotionStagger } from "@frontend/components/motion";
import type { JumuahSession } from "@frontend/lib/prayerSchedule";

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

      {sessions[0] ? (
        <MotionStagger>
          <MotionItem
            className={`max-w-xl rounded-2xl border border-border/80 bg-surface shadow-sm ${
              compact ? "p-5 sm:p-6" : "card-premium p-6 sm:p-8"
            }`}
          >
            <div className={`grid grid-cols-2 gap-4 ${compact ? "sm:gap-5" : "gap-4 sm:grid-cols-2"}`}>
              <div className="rounded-xl bg-background/80 px-3 py-3 sm:px-4 sm:py-4">
                <p className="text-sm font-semibold text-muted sm:text-base">Khutbah</p>
                <p className={`mt-1.5 font-semibold text-foreground ${compact ? "text-xl sm:text-2xl" : "text-xl sm:text-2xl"}`}>
                  {sessions[0].khutbah}
                </p>
              </div>
              <div className="rounded-xl bg-background/80 px-3 py-3 sm:px-4 sm:py-4">
                <p className="text-sm font-semibold text-muted sm:text-base">Salah</p>
                <p className={`mt-1.5 font-semibold text-foreground ${compact ? "text-xl sm:text-2xl" : "text-xl sm:text-2xl"}`}>
                  {sessions[0].iqamah}
                </p>
              </div>
            </div>
          </MotionItem>
        </MotionStagger>
      ) : null}

      {note ? (
        <p className={`text-muted italic ${compact ? "mt-4 text-sm sm:text-base" : "mt-6 text-base sm:text-lg"}`}>
          {note}
        </p>
      ) : null}
    </div>
  );
}
