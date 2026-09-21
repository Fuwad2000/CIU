import type { PrayerTime } from "@frontend/content/PrayerTimesContent";
import { getTimetableDay } from "@frontend/lib/prayerTimetableData";

export const PRAYER_LOCATION = {
  name: "Mississauga, Ontario",
  latitude: 43.589,
  longitude: -79.644,
  timezone: "America/Toronto",
} as const;

export type JumuahSession = {
  label: string;
  khutbah: string;
  iqamah: string;
};

export type DailySchedule = {
  date: Date;
  dateLabel: string;
  weekdayLabel: string;
  prayers: PrayerTime[];
};

export type YearlyPeriodRow = {
  month: string;
  dates: string;
  fajr: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  highlight?: boolean;
};

type TimeParts = {
  hours: number;
  minutes: number;
};

type CalendarBlock = {
  fajr: TimeParts;
  zuhr: TimeParts;
  asr: TimeParts;
  maghrib: TimeParts;
  isha: TimeParts;
};

const PRAYER_NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

function parseTimetableTime(
  prayer: "fajr" | "zuhr" | "asr" | "maghrib" | "isha",
  time: string
): TimeParts {
  const [hours, minutes] = time.split(":").map(Number);

  if (prayer === "fajr") {
    return { hours, minutes };
  }

  if (prayer === "zuhr") {
    if (hours === 12) {
      return { hours: 12, minutes };
    }
    return { hours: hours + 12, minutes };
  }

  if (hours >= 12) {
    return { hours, minutes };
  }

  return { hours: hours + 12, minutes };
}

function timetableToBlock(day: {
  fajr: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}): CalendarBlock {
  return {
    fajr: parseTimetableTime("fajr", day.fajr),
    zuhr: parseTimetableTime("zuhr", day.zuhr),
    asr: parseTimetableTime("asr", day.asr),
    maghrib: parseTimetableTime("maghrib", day.maghrib),
    isha: parseTimetableTime("isha", day.isha),
  };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function formatTime12({ hours, minutes }: TimeParts) {
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${pad(minutes)} ${period}`;
}

function getTorontoDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: PRAYER_LOCATION.timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  });

  const parts = formatter.formatToParts(date);
  const lookup = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value])
  );

  return {
    year: Number(lookup.year),
    month: Number(lookup.month),
    day: Number(lookup.day),
    weekday: lookup.weekday ?? "Sun",
  };
}

function getSecondSundayInMarch(year: number) {
  const date = new Date(Date.UTC(year, 2, 1));
  let sundays = 0;

  while (date.getUTCMonth() === 2) {
    if (date.getUTCDay() === 0) {
      sundays += 1;
      if (sundays === 2) return date.getUTCDate();
    }
    date.setUTCDate(date.getUTCDate() + 1);
  }

  return 8;
}

function getFirstSundayInNovember(year: number) {
  for (let day = 1; day <= 7; day += 1) {
    const date = new Date(Date.UTC(year, 10, day));
    if (date.getUTCDay() === 0) return day;
  }

  return 1;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getCalendarBlock(year: number, month: number, day: number): CalendarBlock {
  void year;
  const dayTimes = getTimetableDay(month, day);
  if (dayTimes) {
    return timetableToBlock(dayTimes);
  }

  return timetableToBlock({
    fajr: "6:25",
    zuhr: "12:21",
    asr: "3:09",
    maghrib: "4:52",
    isha: "6:18",
  });
}

function createTorontoDate(year: number, month: number, day: number) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const parts = getTorontoDateParts(utcGuess);
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12, 0, 0));
}

export function getDailySchedule(date = new Date()): DailySchedule {
  const { year, month, day, weekday } = getTorontoDateParts(date);
  const calendar = getCalendarBlock(year, month, day);

  const prayers: PrayerTime[] = [
    { name: "Fajr", time: formatTime12(calendar.fajr) },
    { name: "Dhuhr", time: formatTime12(calendar.zuhr) },
    { name: "Asr", time: formatTime12(calendar.asr) },
    { name: "Maghrib", time: formatTime12(calendar.maghrib) },
    { name: "Isha", time: formatTime12(calendar.isha) },
  ];

  return {
    date: createTorontoDate(year, month, day),
    dateLabel: new Intl.DateTimeFormat("en-CA", {
      timeZone: PRAYER_LOCATION.timezone,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date),
    weekdayLabel: weekday,
    prayers,
  };
}

export function getWeekSchedule(startDate = new Date()) {
  const { year, month, day } = getTorontoDateParts(startDate);
  const start = createTorontoDate(year, month, day);

  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(start);
    next.setUTCDate(start.getUTCDate() + index);
    return getDailySchedule(next);
  });
}

export function getMonthSchedule(date = new Date()) {
  const { year, month } = getTorontoDateParts(date);
  return getMonthScheduleFor(year, month);
}

export function getMonthScheduleFor(year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month);

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    return getDailySchedule(createTorontoDate(year, month, day));
  });
}

export function getTorontoNowParts(date = new Date()) {
  return getTorontoDateParts(date);
}

export function getMonthLabelFor(year: number, month: number) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PRAYER_LOCATION.timezone,
    month: "long",
    year: "numeric",
  }).format(createTorontoDate(year, month, 1));
}

export const CALENDAR_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function isWinterSchedule(date = new Date()) {
  const { month, day } = getTorontoDateParts(date);
  const dayTimes = getTimetableDay(month, day);
  return dayTimes?.zuhr.startsWith("12:") ?? false;
}

export function isFridayInToronto(date = new Date()) {
  return getTorontoDateParts(date).weekday === "Fri";
}

export function getJumuahSessions(_date = new Date()): JumuahSession[] {
  return [{ label: "Jumu'ah", khutbah: "1:45 PM", iqamah: "2:05 PM" }];
}

export function getYearlyCalendarTable(year = new Date().getFullYear()): YearlyPeriodRow[] {
  const springDst = getSecondSundayInMarch(year);
  const fallDst = getFirstSundayInNovember(year);
  const febDays = getDaysInMonth(year, 2);

  return [
    timetableRow("January", 1, 1, 10),
    timetableRow("January", 1, 11, 20),
    timetableRow("January", 1, 21, 31),
    timetableRow("February", 2, 1, 10),
    timetableRow("February", 2, 11, 20),
    timetableRow("February", 2, 21, febDays),
    timetableRow("March", 3, 1, springDst - 1),
    timetableRow("March", 3, springDst, 20, true),
    timetableRow("March", 3, 21, 30),
    timetableRow("April", 4, 1, 10),
    timetableRow("April", 4, 11, 20),
    timetableRow("April", 4, 21, 30),
    timetableRow("May", 5, 1, 10),
    timetableRow("May", 5, 11, 20),
    timetableRow("May", 5, 21, 31),
    timetableRow("June", 6, 1, 10),
    timetableRow("June", 6, 11, 20),
    timetableRow("June", 6, 21, 30),
    timetableRow("July", 7, 1, 10),
    timetableRow("July", 7, 11, 20),
    timetableRow("July", 7, 21, 31),
    timetableRow("August", 8, 1, 10),
    timetableRow("August", 8, 11, 20),
    timetableRow("August", 8, 21, 31),
    timetableRow("September", 9, 1, 10),
    timetableRow("September", 9, 11, 20),
    timetableRow("September", 9, 21, 30),
    timetableRow("October", 10, 1, 10),
    timetableRow("October", 10, 11, 20),
    timetableRow("October", 10, 21, 31),
    timetableRow("November", 11, 1, fallDst - 1),
    timetableRow("November", 11, fallDst, 10, true),
    timetableRow("November", 11, 11, 20),
    timetableRow("November", 11, 21, 30),
    timetableRow("December", 12, 1, 10),
    timetableRow("December", 12, 11, 20),
    timetableRow("December", 12, 21, 31),
  ];
}

function timetableRow(
  month: string,
  monthNumber: number,
  startDay: number,
  endDay: number,
  highlight = false
): YearlyPeriodRow {
  const sampleDay = Math.min(endDay, Math.max(startDay, Math.floor((startDay + endDay) / 2)));
  const dayTimes = getTimetableDay(monthNumber, sampleDay);

  return {
    month,
    dates: `${startDay} - ${endDay}`,
    fajr: dayTimes?.fajr ?? "—",
    zuhr: dayTimes?.zuhr ?? "—",
    asr: dayTimes?.asr ?? "—",
    maghrib: dayTimes?.maghrib ?? "—",
    isha: dayTimes?.isha ?? "—",
    highlight,
  };
}

export function formatTodayDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PRAYER_LOCATION.timezone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PRAYER_LOCATION.timezone,
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getMonthLabel(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PRAYER_LOCATION.timezone,
    month: "long",
    year: "numeric",
  }).format(date);
}

export { PRAYER_NAMES };
