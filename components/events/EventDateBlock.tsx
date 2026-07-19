export default function EventDateBlock({
  dateLabel,
  compact = false,
}: {
  dateLabel: string;
  compact?: boolean;
}) {
  const parts = dateLabel.split(",").map((part) => part.trim());
  const primary = parts[0] ?? dateLabel;
  const secondary = parts[1];

  if (compact && secondary) {
    return (
      <div className="flex min-w-[4.5rem] flex-col items-center justify-center rounded-2xl border border-brand/15 bg-brand/5 px-3 py-3 text-center">
        <p className="text-xs font-semibold tracking-wide text-brand uppercase">{secondary}</p>
        <p className="mt-1 text-lg font-semibold leading-none text-foreground">{primary.replace(/^[A-Za-z]+\s/, "")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brand/15 bg-brand/5 px-4 py-3">
      <p className="text-sm font-semibold text-brand sm:text-base">{dateLabel}</p>
    </div>
  );
}
