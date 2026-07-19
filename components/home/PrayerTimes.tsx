"use client";

import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import { ClockIcon, MapPinIcon, MosqueIcon, CalendarRangeIcon } from "@/components/home/icons";
import { homeBtnOutlineClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
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
    <section className={`relative z-20 ${homeSectionClass} -mt-14 pb-0 sm:-mt-16 lg:-mt-20`}>
      <SectionContainer>
        <div className="card-premium overflow-hidden rounded-3xl shadow-premium-lg">
          <div className="h-1.5 bg-brand-gradient" />
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="inline-flex rounded-2xl bg-brand/10 p-3 text-brand shadow-sm">
                    <MosqueIcon className="h-5 w-5" />
                  </div>
                  <div className="inline-flex rounded-2xl bg-brand/10 p-3 text-brand shadow-sm">
                    <ClockIcon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                  Daily Salah
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {prayerTimesContent.heading}
                </h2>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground sm:text-base">
                  <MapPinIcon className="h-4 w-4 text-brand" />
                  {prayerTimesContent.location}
                </p>
                <p className="mt-1 text-sm text-muted sm:text-base">{formatTodayDate()}</p>
                <p className="mt-2 text-sm italic text-muted sm:text-base">
                  {prayerTimesContent.note}
                </p>
              </div>

              <Link href={prayerTimesContent.scheduleHref} className={homeBtnOutlineClass}>
                <CalendarRangeIcon className="h-4 w-4" />
                {prayerTimesContent.scheduleLabel}
              </Link>
            </div>

            <MotionStagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
              {prayerTimesContent.times.map((prayer) => {
                const isNext = prayer.name === nextPrayer;

                return (
                  <MotionItem
                    key={prayer.name}
                    className={`rounded-2xl border px-4 py-5 text-center transition duration-300 ${
                      isNext
                        ? "border-gold/40 bg-gradient-to-b from-gold/15 to-gold/5 shadow-premium"
                        : "border-border/80 bg-background shadow-sm hover:border-brand/20 hover:shadow-premium"
                    }`}
                  >
                    {isNext ? (
                      <p className="mb-2 inline-flex items-center justify-center gap-1 text-[0.65rem] font-semibold tracking-[0.14em] text-gold uppercase sm:text-xs">
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
                  </MotionItem>
                );
              })}
            </MotionStagger>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
