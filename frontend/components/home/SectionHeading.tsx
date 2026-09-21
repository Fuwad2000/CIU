export default function SectionHeading({
  heading,
  subheading,
  label,
  align = "center",
  light = false,
}: {
  heading: string;
  subheading?: string;
  label?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const alignClass = align === "left" ? "text-left" : "mx-auto max-w-4xl text-center";
  const accentAlignClass = align === "left" ? "mr-auto" : "mx-auto";

  return (
    <div className={alignClass}>
      {label ? (
        <p
          className={`text-xs font-semibold tracking-[0.22em] uppercase sm:text-sm ${
            light ? "text-brand-light/90" : "text-brand"
          }`}
        >
          {label}
        </p>
      ) : null}
      <div
        className={`gold-accent-bar gold-accent-bar-lg ${label ? "mt-4 sm:mt-5" : ""} ${accentAlignClass} ${
          light ? "opacity-90" : ""
        }`}
        aria-hidden="true"
      />
      <h2
        className={`mt-5 text-balance text-3xl font-semibold tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {heading}
      </h2>
      {subheading ? (
        <p
          className={`mt-5 max-w-3xl text-base leading-relaxed sm:text-lg lg:text-xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/88" : "text-muted"}`}
        >
          {subheading}
        </p>
      ) : null}
    </div>
  );
}
