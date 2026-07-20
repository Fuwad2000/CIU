import type { PrayerTime } from "@/content/PrayerTimesContent";
import { formatTodayDate } from "@/lib/prayerSchedule";

export function parseTime(time: string) {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

export function getNextPrayer(times: PrayerTime[]) {
  const now = new Date();
  const torontoTime = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);

  const hour = Number(torontoTime.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(torontoTime.find((part) => part.type === "minute")?.value ?? "0");
  const currentMinutes = hour * 60 + minute;

  const prayerMinutes = times
    .map((prayer) => ({
      name: prayer.name,
      minutes: parseTime(prayer.time),
    }))
    .filter(
      (prayer): prayer is { name: string; minutes: number } => prayer.minutes !== null
    );

  const upcoming = prayerMinutes.find((prayer) => prayer.minutes > currentMinutes);
  return upcoming?.name ?? prayerMinutes[0]?.name ?? "Fajr";
}

export { formatTodayDate };
