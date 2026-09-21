export function formatEventDateLabel(date: string) {
  const match = date.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return "";
  const value = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(value.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export function toTimeInputValue(label: string) {
  const text = label.trim();
  if (/^\d{2}:\d{2}$/.test(text)) return text;
  const match = text.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return "";
  let hours = Number(match[1]);
  const minutes = match[2];
  const mer = match[3].toUpperCase();
  if (mer === "PM" && hours < 12) hours += 12;
  if (mer === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

export function fromTimeInputValue(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return "";
  const hours = Number(match[1]);
  const minutes = match[2];
  if (hours > 23 || Number(minutes) > 59) return "";
  const mer = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${mer}`;
}

export function formatEventTime(start: string, end = "") {
  const startLabel = fromTimeInputValue(start);
  const endLabel = end ? fromTimeInputValue(end) : "";
  if (!startLabel) return "";
  return endLabel ? `${startLabel} – ${endLabel}` : startLabel;
}

export function parseStoredEventTime(value: string) {
  const parts = value.split(/\s*[–-]\s*/).map((part) => part.trim()).filter(Boolean);
  return {
    start: toTimeInputValue(parts[0] ?? ""),
    end: toTimeInputValue(parts[1] ?? ""),
  };
}

export function buildEventSchedule(
  date: string,
  startTime: string,
  endTime = ""
): { error: string } | { date: string; dateLabel: string; time: string } {
  const dateLabel = formatEventDateLabel(date);
  const time = formatEventTime(startTime, endTime);
  if (!dateLabel) return { error: "Choose a valid date." };
  if (!time) return { error: "Choose a valid start time." };
  return { date, dateLabel, time };
}
