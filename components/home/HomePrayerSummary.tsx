"use client";

import Link from "next/link";
import { CalendarRangeIcon, ClockIcon, MapPinIcon } from "@/components/home/icons";
import { homeBtnOutlineClass } from "@/components/home/homeUi";
import { formatTodayDate, getNextPrayer } from "@/components/prayer/prayerUtils";
import type { PrayerTime } from "@/content/PrayerTimesContent";
import { isFridayInToronto, type JumuahSession } from "@/lib/prayerSchedule";

function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function HomePrayerSummary({
  date,
  times,
  jumuahSessions,
  heading,
  location,
  scheduleHref,
  scheduleLabel,
}: {
  date: Date;
  times: PrayerTime[];
  jumuahSessions: JumuahSession[];
  heading: string;
  location: string;
  scheduleHref: string;
  scheduleLabel: string;
}) {
  const nextPrayer = getNextPrayer(times);
  const nextPrayerTime = times.find((prayer) => prayer.name === nextPrayer)?.time;
  const isFriday = isFridayInToronto(date);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase sm:text-sm">
            Daily Salah
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted sm:text-base">
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4 shrink-0 text-brand" />
              {location}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" aria-hidden="true" />
            <span className="sm:hidden">{formatShortDate(date)}</span>
            <span className="hidden sm:inline">{formatTodayDate(date)}</span>
          </p>
        </div>

        <Link
          href={scheduleHref}
          className={`${homeBtnOutlineClass} shrink-0 self-start px-5 py-3 text-sm sm:px-6 sm:py-3.5`}
        >
          <CalendarRangeIcon className="h-4 w-4" />
          {scheduleLabel}
        </Link>
      </div>

      {nextPrayerTime ? (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-gold/30 bg-gradient-to-r from-gold/12 to-gold/5 px-4 py-3 sm:mt-6">
          <ClockIcon className="h-4 w-4 shrink-0 text-gold-dark" />
          <p className="text-sm text-foreground sm:text-base">
            <span className="font-semibold text-gold-dark">Next prayer:</span>{" "}
            {nextPrayer} at {nextPrayerTime}
          </p>
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-5 gap-1.5 sm:mt-5 sm:gap-3">
        {times.map((prayer) => {
          const isNext = prayer.name === nextPrayer;

          return (
            <div
              key={prayer.name}
              className={`rounded-xl border px-1 py-2.5 text-center sm:px-2 sm:py-3.5 ${
                isNext
                  ? "border-gold/40 bg-gold/10 shadow-sm"
                  : "border-border/80 bg-surface"
              }`}
            >
              <p
                className={`text-[0.65rem] font-semibold leading-tight sm:text-xs ${
                  isNext ? "text-gold-dark" : "text-foreground"
                }`}
              >
                {prayer.name}
              </p>
              <p
                className={`mt-1 text-[0.7rem] leading-tight sm:text-sm ${
                  isNext ? "font-semibold text-gold-dark" : "text-muted"
                }`}
              >
                {prayer.time}
              </p>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-4 overflow-hidden rounded-2xl border sm:mt-5 ${
          isFriday
            ? "border-gold/35 bg-gradient-to-br from-gold/12 via-gold/5 to-surface shadow-sm"
            : "border-border/80 bg-surface"
        }`}
      >
        <div
          className={`flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 ${
            isFriday ? "border-b border-gold/20" : "border-b border-border/70 bg-background/40"
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="gold-accent-bar w-8 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase sm:text-sm">
                Jumu&apos;ah
              </p>
              <p className="text-xs text-muted sm:text-sm">Every Friday at the masjid</p>
            </div>
          </div>
          {isFriday ? (
            <span className="inline-flex shrink-0 items-center rounded-full border border-gold/35 bg-gold/15 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-gold-dark uppercase sm:text-xs">
              Today
            </span>
          ) : null}
        </div>

        <div className="hidden grid-cols-[minmax(0,1.15fr)_1fr_1fr] gap-3 px-4 py-2.5 sm:grid sm:px-5">
          <span aria-hidden="true" />
          <p className="text-center text-[0.65rem] font-semibold tracking-[0.14em] text-muted uppercase">
            Khutbah
          </p>
          <p className="text-center text-[0.65rem] font-semibold tracking-[0.14em] text-muted uppercase">
            Iqamah
          </p>
        </div>

        <div className="divide-y divide-border/60">
          {jumuahSessions.map((session, index) => (
            <div
              key={session.label}
              className="grid grid-cols-1 gap-3 px-4 py-3.5 sm:grid-cols-[minmax(0,1.15fr)_1fr_1fr] sm:items-center sm:gap-3 sm:px-5 sm:py-3.5"
            >
              <p className="text-xs font-semibold text-brand sm:text-sm">
                {index === 0 ? "1st Session" : "2nd Session"}
              </p>

              <div className="flex items-center justify-between gap-3 rounded-xl bg-background/70 px-3 py-2.5 sm:block sm:rounded-none sm:bg-transparent sm:p-0 sm:text-center">
                <p className="text-[0.65rem] font-semibold tracking-wide text-muted uppercase sm:hidden">
                  Khutbah
                </p>
                <p className="text-sm font-semibold text-foreground sm:text-base">{session.khutbah}</p>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-xl bg-background/70 px-3 py-2.5 sm:block sm:rounded-none sm:bg-transparent sm:p-0 sm:text-center">
                <p className="text-[0.65rem] font-semibold tracking-wide text-muted uppercase sm:hidden">
                  Iqamah
                </p>
                <p className="text-sm font-semibold text-gold-dark sm:text-base">{session.iqamah}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
