import { getTimes as getSunTimes } from "suncalc";
import type { PrayerTime } from "@/content/PrayerTimesContent";

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
  isha: TimeParts;
};

const PRAYER_NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

function parseIqamaTime(prayer: "fajr" | "zuhr" | "asr" | "isha", time: string): TimeParts {
  const [hours, minutes] = time.split(":").map(Number);

  if (prayer === "fajr") {
    return { hours, minutes };
  }

  return { hours: hours + 12, minutes };
}

function block(fajr: string, zuhr: string, asr: string, isha: string): CalendarBlock {
  return {
    fajr: parseIqamaTime("fajr", fajr),
    zuhr: parseIqamaTime("zuhr", zuhr),
    asr: parseIqamaTime("asr", asr),
    isha: parseIqamaTime("isha", isha),
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
  const springDst = getSecondSundayInMarch(year);
  const fallDst = getFirstSundayInNovember(year);

  switch (month) {
    case 1:
      if (day <= 10) return block("6:45", "1:00", "3:45", "8:00");
      if (day <= 20) return block("6:45", "1:00", "4:00", "8:00");
      return block("6:45", "1:00", "4:00", "8:00");
    case 2:
      if (day <= 10) return block("6:30", "1:00", "4:15", "8:00");
      if (day <= 20) return block("6:15", "1:00", "4:30", "8:00");
      return block("6:15", "1:00", "4:45", "8:00");
    case 3:
      if (day < springDst) return block("6:00", "1:00", "4:45", "8:00");
      if (day <= 20) return block("6:45", "2:00", "6:00", "9:15");
      return block("6:30", "2:00", "6:00", "9:30");
    case 4:
      if (day <= 10) return block("6:15", "2:00", "6:15", "9:30");
      if (day <= 20) return block("6:00", "2:00", "6:30", "9:45");
      return block("5:45", "2:00", "6:30", "10:00");
    case 5:
      if (day <= 10) return block("5:30", "2:00", "6:30", "10:15");
      if (day <= 20) return block("5:15", "2:00", "7:00", "10:30");
      return block("5:00", "2:00", "7:00", "10:45");
    case 6:
      return block("5:00", "2:00", "7:30", "10:55");
    case 7:
      if (day <= 10) return block("5:00", "2:00", "7:30", "10:55");
      if (day <= 20) return block("5:00", "2:00", "7:30", "10:50");
      return block("5:15", "2:00", "7:15", "10:40");
    case 8:
      if (day <= 10) return block("5:15", "2:00", "7:00", "10:30");
      if (day <= 20) return block("5:30", "2:00", "6:45", "10:15");
      return block("5:45", "2:00", "6:30", "9:45");
    case 9:
      if (day <= 10) return block("6:00", "2:00", "6:30", "9:30");
      if (day <= 20) return block("6:15", "2:00", "6:15", "9:15");
      return block("6:15", "2:00", "6:00", "9:00");
    case 10:
      if (day <= 10) return block("6:30", "2:00", "5:45", "8:30");
      if (day <= 20) return block("6:30", "2:00", "5:30", "8:30");
      return block("6:45", "2:00", "5:15", "8:00");
    case 11:
      if (day < fallDst) return block("6:45", "2:00", "5:00", "8:00");
      if (day <= 10) return block("6:15", "1:00", "3:45", "8:00");
      if (day <= 20) return block("6:15", "1:00", "3:30", "8:00");
      return block("6:30", "1:00", "3:30", "8:00");
    case 12:
      if (day <= 10) return block("6:30", "1:00", "3:30", "8:00");
      if (day <= 20) return block("6:45", "1:00", "3:30", "8:00");
      return block("6:45", "1:00", "3:30", "8:00");
    default:
      return block("6:45", "1:00", "4:00", "8:00");
  }
}

function getSunTimeParts(
  year: number,
  month: number,
  day: number,
  event: "sunrise" | "sunset"
): TimeParts | null {
  if (event !== "sunset") return null;

  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const { sunset } = getSunTimes(
    date,
    PRAYER_LOCATION.latitude,
    PRAYER_LOCATION.longitude
  );

  if (!sunset) return null;

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PRAYER_LOCATION.timezone,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(sunset);

  const hours = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minutes = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return { hours, minutes };
}

function createTorontoDate(year: number, month: number, day: number) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const parts = getTorontoDateParts(utcGuess);
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12, 0, 0));
}

export function getDailySchedule(date = new Date()): DailySchedule {
  const { year, month, day, weekday } = getTorontoDateParts(date);
  const calendar = getCalendarBlock(year, month, day);
  const sunset = getSunTimeParts(year, month, day, "sunset");

  const prayers: PrayerTime[] = [
    { name: "Fajr", time: formatTime12(calendar.fajr) },
    { name: "Dhuhr", time: formatTime12(calendar.zuhr) },
    { name: "Asr", time: formatTime12(calendar.asr) },
    {
      name: "Maghrib",
      time: sunset ? formatTime12(sunset) : "Sunset",
    },
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
  const { year, month, day } = getTorontoDateParts(date);
  return getCalendarBlock(year, month, day).zuhr.hours === 13;
}

export function isFridayInToronto(date = new Date()) {
  return getTorontoDateParts(date).weekday === "Fri";
}

export function getJumuahSessions(date = new Date()): JumuahSession[] {
  const winter = isWinterSchedule(date);

  if (winter) {
    return [
      { label: "First Jumu'ah", khutbah: "12:30 PM", iqamah: "1:00 PM" },
      { label: "Second Jumu'ah", khutbah: "1:30 PM", iqamah: "2:00 PM" },
    ];
  }

  return [
    { label: "First Jumu'ah", khutbah: "1:30 PM", iqamah: "2:00 PM" },
    { label: "Second Jumu'ah", khutbah: "2:30 PM", iqamah: "3:00 PM" },
  ];
}

export function getYearlyCalendarTable(year = new Date().getFullYear()): YearlyPeriodRow[] {
  const springDst = getSecondSundayInMarch(year);
  const fallDst = getFirstSundayInNovember(year);
  const febDays = getDaysInMonth(year, 2);

  return [
    row("January", "1 - 10", "6:45", "1:00", "3:45", "8:00"),
    row("January", "11 - 20", "6:45", "1:00", "4:00", "8:00"),
    row("January", "21 - 31", "6:45", "1:00", "4:00", "8:00"),
    row("February", "1 - 10", "6:30", "1:00", "4:15", "8:00"),
    row("February", "11 - 20", "6:15", "1:00", "4:30", "8:00"),
    row("February", `21 - ${febDays}`, "6:15", "1:00", "4:45", "8:00"),
    row("March", `1 - ${springDst - 1}`, "6:00", "1:00", "4:45", "8:00"),
    row("March", `${springDst} - 20`, "6:45", "2:00", "6:00", "9:15", true),
    row("March", "21 - 30", "6:30", "2:00", "6:00", "9:30"),
    row("April", "1 - 10", "6:15", "2:00", "6:15", "9:30"),
    row("April", "11 - 20", "6:00", "2:00", "6:30", "9:45"),
    row("April", "21 - 30", "5:45", "2:00", "6:30", "10:00"),
    row("May", "1 - 10", "5:30", "2:00", "6:30", "10:15"),
    row("May", "11 - 20", "5:15", "2:00", "7:00", "10:30"),
    row("May", "21 - 31", "5:00", "2:00", "7:00", "10:45"),
    row("June", "1 - 10", "5:00", "2:00", "7:30", "10:55"),
    row("June", "11 - 20", "5:00", "2:00", "7:30", "10:55"),
    row("June", "21 - 30", "5:00", "2:00", "7:30", "10:55"),
    row("July", "1 - 10", "5:00", "2:00", "7:30", "10:55"),
    row("July", "11 - 20", "5:00", "2:00", "7:30", "10:50"),
    row("July", "21 - 31", "5:15", "2:00", "7:15", "10:40"),
    row("August", "1 - 10", "5:15", "2:00", "7:00", "10:30"),
    row("August", "11 - 20", "5:30", "2:00", "6:45", "10:15"),
    row("August", "21 - 31", "5:45", "2:00", "6:30", "9:45"),
    row("September", "1 - 10", "6:00", "2:00", "6:30", "9:30"),
    row("September", "11 - 20", "6:15", "2:00", "6:15", "9:15"),
    row("September", "21 - 30", "6:15", "2:00", "6:00", "9:00"),
    row("October", "1 - 10", "6:30", "2:00", "5:45", "8:30"),
    row("October", "11 - 20", "6:30", "2:00", "5:30", "8:30"),
    row("October", "21 - 31", "6:45", "2:00", "5:15", "8:00"),
    row("November", `1 - ${fallDst - 1}`, "6:45", "2:00", "5:00", "8:00"),
    row("November", `${fallDst} - 10`, "6:15", "1:00", "3:45", "8:00", true),
    row("November", "11 - 20", "6:15", "1:00", "3:30", "8:00"),
    row("November", "21 - 30", "6:30", "1:00", "3:30", "8:00"),
    row("December", "1 - 10", "6:30", "1:00", "3:30", "8:00"),
    row("December", "11 - 20", "6:45", "1:00", "3:30", "8:00"),
    row("December", "21 - 31", "6:45", "1:00", "3:30", "8:00"),
  ];
}

function row(
  month: string,
  dates: string,
  fajr: string,
  zuhr: string,
  asr: string,
  isha: string,
  highlight = false
): YearlyPeriodRow {
  return {
    month,
    dates,
    fajr,
    zuhr,
    asr,
    maghrib: "Sunset",
    isha,
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
