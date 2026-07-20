"use client";

import { useMemo } from "react";
import HomePrayerSummary from "@/components/home/HomePrayerSummary";
import SectionContainer from "@/components/home/SectionContainer";
import { homeSectionClass } from "@/components/home/homeUi";
import { getDailySchedule, getJumuahSessions } from "@/lib/prayerSchedule";
import { prayerTimesContent } from "@/content/PrayerTimesContent";

export default function PrayerTimes() {
  const now = useMemo(() => new Date(), []);
  const todaySchedule = useMemo(() => getDailySchedule(now), [now]);
  const jumuahSessions = useMemo(() => getJumuahSessions(now), [now]);

  return (
    <section className={`relative z-20 ${homeSectionClass} -mt-8 pt-2 pb-0 sm:-mt-10 sm:pt-4 lg:-mt-12 lg:pt-6`}>
      <SectionContainer>
        <div className="card-premium overflow-hidden rounded-[2rem] shadow-premium-xl sm:rounded-[2.25rem]">
          <div className="h-2 bg-brand-gradient" />
          <div className="p-5 sm:p-8 lg:p-10">
            <HomePrayerSummary
              date={now}
              times={todaySchedule.prayers}
              jumuahSessions={jumuahSessions}
              heading={prayerTimesContent.heading}
              location={prayerTimesContent.location}
              scheduleHref={prayerTimesContent.scheduleHref}
              scheduleLabel={prayerTimesContent.scheduleLabel}
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
