import Image from "next/image";
import type { ImagePlaceholderContent } from "@/content/AboutContent";

type ImagePlaceholderProps = ImagePlaceholderContent & {
  aspect?: "video" | "square" | "wide" | "banner" | "fill";
  className?: string;
};

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[4/3]",
  banner: "aspect-[21/9] min-h-48 sm:min-h-64",
  fill: "h-full min-h-72",
};

function PlaceholderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="mx-auto h-10 w-10 text-brand/50 sm:h-12 sm:w-12"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="M21 16l-5.5-5.5a1.5 1.5 0 00-2.12 0L7 17" />
    </svg>
  );
}

export default function ImagePlaceholder({
  label,
  caption,
  imageSrc,
  imageAlt,
  imagePosition = "center",
  aspect = "video",
  className = "",
}: ImagePlaceholderProps) {
  if (imageSrc) {
    return (
      <figure
        className={`relative overflow-hidden rounded-2xl border border-border/80 bg-background shadow-premium ${aspectClasses[aspect]} ${className}`}
      >
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={imageAlt ?? caption}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
        </div>
      </figure>
    );
  }

  return (
    <figure
      className={`overflow-hidden rounded-2xl border-2 border-dashed border-brand/25 bg-brand/[0.04] ${aspectClasses[aspect]} ${className}`}
    >
      <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
        <PlaceholderIcon />
        <figcaption className="mt-4 space-y-1">
          <p className="text-sm font-semibold text-brand sm:text-base">{label}</p>
          <p className="max-w-md text-sm italic text-muted sm:text-base">{caption}</p>
        </figcaption>
      </div>
    </figure>
  );
}
