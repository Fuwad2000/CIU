import type { LucideIcon } from "lucide-react";

export default function AdminEmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center sm:py-24 xl:py-28">
      <div className="relative">
        <div className="absolute inset-0 scale-125 rounded-3xl bg-brand/5" aria-hidden="true" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/15 bg-surface text-brand shadow-sm xl:h-20 xl:w-20">
          <Icon className="h-7 w-7 xl:h-8 xl:w-8" strokeWidth={1.6} />
        </div>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-foreground xl:text-xl">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted xl:text-base">{description}</p>
    </div>
  );
}
