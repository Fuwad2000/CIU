"use client";

import Link from "next/link";
import { useMemo } from "react";
import SectionContainer from "@/components/home/SectionContainer";
import { ClockIcon, MapPinIcon, MosqueIcon, CalendarRangeIcon } from "@/components/home/icons";
import { homeBtnOutlineClass, homeSectionClass } from "@/components/home/homeUi";
import JumuahTimes from "@/components/prayer/JumuahTimes";
import PrayerTimesGrid from "@/components/prayer/PrayerTimesGrid";
import { formatTodayDate, getNextPrayer } from "@/components/prayer/prayerUtils";
import { getDailySchedule, getJumuahSessions } from "@/lib/prayerSchedule";
import { prayerTimesContent } from "@/content/PrayerTimesContent";

export default function PrayerTimes() {
  const now = useMemo(() => new Date(), []);
  const todaySchedule = useMemo(() => getDailySchedule(now), [now]);
  const jumuahSessions = useMemo(() => getJumuahSessions(now), [now]);
  const nextPrayer = getNextPrayer(todaySchedule.prayers);

  return (
    <section className={`relative z-20 ${homeSectionClass} -mt-6 pt-10 pb-0 sm:-mt-8 sm:pt-12 lg:-mt-10 lg:pt-14`}>
      <SectionContainer>
        <div className="card-premium overflow-hidden rounded-3xl shadow-premium-lg">
          <div className="h-1.5 bg-brand-gradient" />
          <div className="p-7 sm:p-9 lg:p-11">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 rounded-2xl border border-brand/10 bg-brand/5 px-4 py-3 shadow-sm">
                  <div className="inline-flex rounded-xl bg-brand/10 p-2.5 text-brand">
                    <MosqueIcon className="h-5 w-5" />
                  </div>
                  <div className="inline-flex rounded-xl bg-brand/10 p-2.5 text-brand">
                    <ClockIcon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">
                    Daily Salah
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {prayerTimesContent.heading}
                </h2>
                <p className="mt-3 inline-flex items-center gap-2 text-base font-medium text-foreground sm:text-lg">
                  <MapPinIcon className="h-4 w-4 text-brand" />
                  {prayerTimesContent.location}
                </p>
                <p className="mt-2 text-base text-muted sm:text-lg">{formatTodayDate(now)}</p>
              </div>

              <Link
                href={prayerTimesContent.scheduleHref}
                className={`${homeBtnOutlineClass} shrink-0 self-start lg:mt-2`}
              >
                <CalendarRangeIcon className="h-4 w-4" />
                {prayerTimesContent.scheduleLabel}
              </Link>
            </div>

            <PrayerTimesGrid
              className="mt-10 sm:mt-12"
              times={todaySchedule.prayers}
              nextPrayer={nextPrayer}
            />

            <div className="mt-10 border-t border-border/70 pt-10 sm:mt-12 sm:pt-12">
              <JumuahTimes compact sessions={jumuahSessions} />
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
