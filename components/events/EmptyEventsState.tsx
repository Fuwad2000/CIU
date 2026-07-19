import { CalendarX } from "lucide-react";
import { homeBtnOutlineClass } from "@/components/home/homeUi";

export default function EmptyEventsState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-background px-6 py-12 text-center sm:px-10">
      <div className="mx-auto inline-flex rounded-2xl bg-brand/10 p-3 text-brand">
        <CalendarX className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <p className="mt-4 text-lg font-semibold text-foreground">No events match your current filters.</p>
      <p className="mt-2 text-sm text-muted sm:text-base">
        Try adjusting your search or clearing the filters to see more events.
      </p>
      <button type="button" onClick={onClearFilters} className={`${homeBtnOutlineClass} mt-6`}>
        Clear Filters
      </button>
    </div>
  );
}
