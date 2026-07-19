import Link from "next/link";
import { Megaphone } from "lucide-react";
import { eventAnnouncementContent } from "@/content/EventsContent";

export default function EventAnnouncementBar() {
  const { message, buttonLabel, buttonHref } = eventAnnouncementContent;

  return (
    <div className="border-b border-brand/10 bg-brand/5">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="inline-flex items-start gap-3 text-sm text-foreground sm:text-base">
          <span className="inline-flex rounded-xl bg-brand/10 p-2 text-brand">
            <Megaphone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          {message}
        </p>
        <Link
          href={buttonHref}
          className="inline-flex w-fit items-center justify-center rounded-xl border border-brand/20 bg-surface px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand/35 hover:bg-brand/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
