export default function AdminPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 xl:mb-8">
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase xl:text-sm">{eyebrow}</p>
      ) : null}
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl xl:text-4xl">
        {title}
      </h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500 sm:text-base xl:text-lg">{description}</p>
    </div>
  );
}
