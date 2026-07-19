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

  return (
    <div className={alignClass}>
      {label ? (
        <p
          className={`text-sm font-semibold tracking-[0.14em] uppercase ${
            light ? "text-brand-light" : "text-brand"
          }`}
        >
          {label}
        </p>
      ) : null}
      <h2
        className={`${label ? "mt-3" : ""} text-2xl font-semibold tracking-tight sm:text-3xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {heading}
      </h2>
      {subheading ? (
        <p
          className={`mt-4 text-sm leading-relaxed sm:text-base lg:text-lg ${
            light ? "text-white/90" : "text-muted"
          }`}
        >
          {subheading}
        </p>
      ) : null}
    </div>
  );
}
