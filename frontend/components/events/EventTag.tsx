export default function EventTag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-2.5 py-1 text-xs font-semibold text-brand">
      {label}
    </span>
  );
}
