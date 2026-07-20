"use client";

import Link from "next/link";
import { useMemo } from "react";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { ClockIcon, MapPinIcon, MosqueIcon } from "@/components/home/icons";
import { homeBtnOutlineClass, homeBtnPrimaryClass } from "@/components/home/homeUi";
import JumuahTimes from "@/components/prayer/JumuahTimes";
import PrayerScheduleTabs from "@/components/prayer/PrayerScheduleTabs";
import PrayerTimesHero from "@/components/prayer/PrayerTimesHero";
import { formatTodayDate } from "@/components/prayer/prayerUtils";
import { MotionSection } from "@/components/motion";
import { getJumuahSessions } from "@/lib/prayerSchedule";
import { prayerTimesPageContent } from "@/content/PrayerTimesContent";

export default function PrayerTimesPage() {
  const now = useMemo(() => new Date(), []);
  const jumuahSessions = useMemo(() => getJumuahSessions(now), [now]);
  const { today, jumuah, guidance, cta } = prayerTimesPageContent;

  return (
    <div className="overflow-x-hidden bg-background">
      <PrayerTimesHero />

      <section className="home-section">
        <SectionContainer>
          <MotionSection>
            <div className="card-premium overflow-hidden rounded-3xl shadow-premium-lg">
              <div className="h-1.5 bg-brand-gradient" />
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase sm:text-sm">
                      {today.label}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                      {today.heading}
                    </h2>
                    <p className="mt-2 inline-flex items-center gap-2 text-base font-medium text-foreground sm:text-lg">
                      <MapPinIcon className="h-4 w-4 text-brand" />
                      {today.location}
                    </p>
                    <p className="mt-1 text-base text-muted sm:text-lg">{formatTodayDate(now)}</p>
                    <p className="mt-2 text-base italic text-muted sm:text-lg">{today.note}</p>
                  </div>

                  <div className="inline-flex items-center gap-3">
                    <div className="inline-flex rounded-2xl bg-brand/10 p-3 text-brand shadow-sm">
                      <MosqueIcon className="h-5 w-5" />
                    </div>
                    <div className="inline-flex rounded-2xl bg-brand/10 p-3 text-brand shadow-sm">
                      <ClockIcon className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <PrayerScheduleTabs />
              </div>
            </div>
          </MotionSection>
        </SectionContainer>
      </section>

      <section className="home-section bg-section-warm pt-0">
        <SectionContainer>
          <MotionSection>
            <SectionHeading
              align="left"
              label={jumuah.label}
              heading={jumuah.heading}
              subheading={jumuah.intro}
            />
            <JumuahTimes sessions={jumuahSessions} note={jumuah.note} />
          </MotionSection>
        </SectionContainer>
      </section>

      <section className="home-section pt-0">
        <SectionContainer>
          <MotionSection>
            <SectionHeading align="left" label={guidance.label} heading={guidance.heading} />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {guidance.items.map((item) => (
                <div key={item.title} className="card-premium rounded-3xl p-6 sm:p-7">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </MotionSection>
        </SectionContainer>
      </section>

      <section className="home-section bg-section-warm pt-0">
        <SectionContainer>
          <MotionSection>
            <div className="overflow-hidden rounded-3xl bg-brand-gradient px-6 py-10 text-center text-white shadow-premium-lg sm:px-10 sm:py-12">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{cta.heading}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/92 sm:text-lg">
                {cta.text}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={cta.primaryButton.href} className={homeBtnPrimaryClass}>
                  {cta.primaryButton.label}
                </Link>
                <Link
                  href={cta.secondaryButton.href}
                  className={`${homeBtnOutlineClass} border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15`}
                >
                  {cta.secondaryButton.label}
                </Link>
              </div>
            </div>
          </MotionSection>
        </SectionContainer>
      </section>
    </div>
  );
}
