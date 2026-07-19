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
  const alignClass = align === "left" ? "text-left" : "mx-auto max-w-3xl text-center";
  const accentAlignClass = align === "left" ? "mr-auto" : "mx-auto";

  return (
    <div className={alignClass}>
      {label ? (
        <p
          className={`text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm ${
            light ? "text-brand-light/90" : "text-brand"
          }`}
        >
          {label}
        </p>
      ) : null}
      <div
        className={`gold-accent-bar ${label ? "mt-4" : ""} ${accentAlignClass} ${
          light ? "opacity-90" : ""
        }`}
        aria-hidden="true"
      />
      <h2
        className={`mt-5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {heading}
      </h2>
      {subheading ? (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed sm:text-base lg:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/88" : "text-muted"}`}
        >
          {subheading}
        </p>
      ) : null}
    </div>
  );
}
