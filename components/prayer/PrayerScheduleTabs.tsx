"use client";

import { useMemo, useState } from "react";
import PrayerTimesGrid from "@/components/prayer/PrayerTimesGrid";
import { getNextPrayer } from "@/components/prayer/prayerUtils";
import {
  CALENDAR_MONTHS,
  formatShortDate,
  getDailySchedule,
  getMonthLabelFor,
  getMonthScheduleFor,
  getTorontoNowParts,
  getWeekSchedule,
  getYearlyCalendarTable,
  PRAYER_NAMES,
} from "@/lib/prayerSchedule";

const tabs = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "calendar", label: "Monthly Calendar" },
  { id: "year", label: "Yearly Calendar" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const selectClassName =
  "rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15 sm:text-base";

function ScheduleTable({
  rows,
  highlightToday = false,
}: {
  rows: ReturnType<typeof getWeekSchedule>;
  highlightToday?: boolean;
}) {
  const todayKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-border/80">
      <table className="min-w-full text-left text-sm sm:text-base">
        <thead className="bg-brand/5 text-xs tracking-[0.12em] text-brand uppercase sm:text-sm">
          <tr>
            <th className="px-4 py-3 font-semibold">Date</th>
            {PRAYER_NAMES.map((name) => (
              <th key={name} className="px-4 py-3 font-semibold">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((day) => {
            const rowKey = new Intl.DateTimeFormat("en-CA", {
              timeZone: "America/Toronto",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(day.date);
            const isToday = highlightToday && rowKey === todayKey;

            return (
              <tr
                key={rowKey}
                className={`border-t border-border/70 ${
                  isToday ? "bg-gold/10 font-medium" : "bg-surface"
                }`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-foreground">
                  {formatShortDate(day.date)}
                  <span className="ml-2 text-muted">{day.weekdayLabel}</span>
                </td>
                {day.prayers.map((prayer) => (
                  <td key={prayer.name} className="px-4 py-3 whitespace-nowrap text-muted">
                    {prayer.time}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function PrayerScheduleTabs() {
  const now = useMemo(() => new Date(), []);
  const { year: currentYear, month: currentMonth } = useMemo(() => getTorontoNowParts(now), [now]);

  const [activeTab, setActiveTab] = useState<TabId>("today");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const todaySchedule = useMemo(() => getDailySchedule(now), [now]);
  const weekSchedule = useMemo(() => getWeekSchedule(now), [now]);
  const monthSchedule = useMemo(
    () => getMonthScheduleFor(selectedYear, selectedMonth),
    [selectedMonth, selectedYear]
  );
  const yearSchedule = useMemo(() => getYearlyCalendarTable(selectedYear), [selectedYear]);
  const nextPrayer = getNextPrayer(todaySchedule.prayers);

  const yearOptions = useMemo(
    () => [currentYear - 1, currentYear, currentYear + 1],
    [currentYear]
  );

  const showTodayHighlight =
    selectedYear === currentYear && selectedMonth === currentMonth;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:text-base ${
              activeTab === tab.id
                ? "bg-brand text-white shadow-premium"
                : "border border-border bg-background text-muted hover:border-brand/25 hover:text-brand"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "today" ? (
        <PrayerTimesGrid times={todaySchedule.prayers} nextPrayer={nextPrayer} />
      ) : null}

      {activeTab === "week" ? (
        <ScheduleTable rows={weekSchedule} highlightToday />
      ) : null}

      {activeTab === "calendar" ? (
        <div>
          <div className="mt-6 rounded-2xl border border-border/80 bg-background/80 p-5 sm:p-6">
            <p className="text-sm font-semibold text-foreground sm:text-base">Choose a month</p>
            <p className="mt-1 text-sm text-muted sm:text-base">
              View daily iqamah times for any month. Maghrib follows sunset for each date.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                  Month
                </span>
                <select
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(Number(event.target.value))}
                  className={`${selectClassName} w-full`}
                  aria-label="Select month"
                >
                  {CALENDAR_MONTHS.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                  Year
                </span>
                <select
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(Number(event.target.value))}
                  className={`${selectClassName} w-full`}
                  aria-label="Select year"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => {
                  setSelectedYear(currentYear);
                  setSelectedMonth(currentMonth);
                }}
                className="rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm font-semibold text-brand transition hover:border-brand/35 hover:bg-brand/10 sm:text-base"
              >
                Current Month
              </button>
            </div>
          </div>

          <p className="mt-6 text-base font-medium text-foreground sm:text-lg">
            {getMonthLabelFor(selectedYear, selectedMonth)}
          </p>
          <ScheduleTable rows={monthSchedule} highlightToday={showTodayHighlight} />
        </div>
      ) : null}

      {activeTab === "year" ? (
        <div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <label className="block sm:max-w-xs">
              <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                Year
              </span>
              <select
                value={selectedYear}
                onChange={(event) => setSelectedYear(Number(event.target.value))}
                className={`${selectClassName} w-full`}
                aria-label="Select year for yearly calendar"
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-sm text-muted sm:text-base">
              Published iqamah ranges for {selectedYear}
            </p>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-border/80">
            <table className="min-w-full text-left text-sm sm:text-base">
              <thead className="bg-brand text-xs tracking-[0.12em] text-white uppercase sm:text-sm">
                <tr>
                  <th className="px-4 py-3 font-semibold">Month</th>
                  <th className="px-4 py-3 font-semibold">Dates</th>
                  <th className="px-4 py-3 font-semibold">Fajr</th>
                  <th className="px-4 py-3 font-semibold">Zuhr</th>
                  <th className="px-4 py-3 font-semibold">Asr</th>
                  <th className="px-4 py-3 font-semibold">Maghrib</th>
                  <th className="px-4 py-3 font-semibold">Isha</th>
                </tr>
              </thead>
              <tbody>
                {yearSchedule.map((row, index) => (
                  <tr
                    key={`${row.month}-${row.dates}-${index}`}
                    className={`border-t border-border/70 ${
                      row.highlight ? "bg-gold/10" : index % 2 === 0 ? "bg-surface" : "bg-background"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{row.month}</td>
                    <td className="px-4 py-3 text-muted">{row.dates}</td>
                    <td className="px-4 py-3 text-muted">{row.fajr}</td>
                    <td className="px-4 py-3 text-muted">{row.zuhr}</td>
                    <td className="px-4 py-3 text-muted">{row.asr}</td>
                    <td className="px-4 py-3 text-muted">{row.maghrib}</td>
                    <td className="px-4 py-3 text-muted">{row.isha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-border/70 bg-background px-4 py-3 text-sm text-muted sm:text-base">
              Maghrib iqamah is at sunset for each date. Daily views calculate sunset for Mississauga
              automatically.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
