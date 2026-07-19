"use client";

import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import { ClockIcon, MapPinIcon, MosqueIcon, CalendarRangeIcon } from "@/components/home/icons";
import { prayerTimesContent, type PrayerTime } from "@/content/HomeContent";

function parseTime(time: string) {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function getNextPrayer(times: PrayerTime[]) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayerMinutes = times
    .filter((prayer) => prayer.name !== "Sunrise")
    .map((prayer) => ({
      name: prayer.name,
      minutes: parseTime(prayer.time),
    }))
    .filter(
      (prayer): prayer is { name: string; minutes: number } =>
        prayer.minutes !== null
    );

  const upcoming = prayerMinutes.find((prayer) => prayer.minutes > currentMinutes);
  return upcoming?.name ?? prayerMinutes[0]?.name ?? "Fajr";
}

function formatTodayDate() {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

export default function PrayerTimes() {
  const nextPrayer = getNextPrayer(prayerTimesContent.times);

  return (
    <section className="border-b border-border bg-surface py-8 sm:py-10">
      <SectionContainer>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3 text-brand">
              <div className="inline-flex rounded-xl bg-brand/10 p-2.5">
                <MosqueIcon className="h-5 w-5" />
              </div>
              <div className="inline-flex rounded-xl bg-brand/10 p-2.5">
                <ClockIcon className="h-5 w-5" />
              </div>
            </div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {prayerTimesContent.heading}
            </h2>
            <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-foreground sm:text-base">
              <MapPinIcon className="h-4 w-4 text-brand" />
              {prayerTimesContent.location}
            </p>
            <p className="mt-1 text-sm text-muted sm:text-base">
              {formatTodayDate()}
            </p>
            <p className="mt-2 text-sm italic text-muted sm:text-base">
              {prayerTimesContent.note}
            </p>
          </div>

          <Link
            href={prayerTimesContent.scheduleHref}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-brand/20 bg-brand/5 px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base"
          >
            <CalendarRangeIcon className="h-4 w-4" />
            {prayerTimesContent.scheduleLabel}
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {prayerTimesContent.times.map((prayer) => {
            const isNext = prayer.name === nextPrayer;

            return (
              <div
                key={prayer.name}
                className={`rounded-2xl border px-4 py-4 text-center shadow-sm ${
                  isNext
                    ? "border-gold bg-gold/10"
                    : "border-border bg-background"
                }`}
              >
                {isNext ? (
                  <p className="mb-2 inline-flex items-center justify-center gap-1 text-xs font-semibold tracking-[0.12em] text-gold uppercase">
                    <ClockIcon className="h-3.5 w-3.5" />
                    Next Prayer
                  </p>
                ) : null}
                <p
                  className={`text-sm font-semibold sm:text-base ${
                    isNext ? "text-gold-dark" : "text-foreground"
                  }`}
                >
                  {prayer.name}
                </p>
                <p
                  className={`mt-1 text-sm sm:text-base ${
                    isNext ? "font-semibold text-gold-dark" : "text-muted"
                  }`}
                >
                  {prayer.time}
                </p>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
