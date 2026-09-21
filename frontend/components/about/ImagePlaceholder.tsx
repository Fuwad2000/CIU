import ZoomableImage from "@frontend/components/lightbox/ZoomableImage";
import type { ImagePlaceholderContent } from "@frontend/content/AboutContent";

type ImagePlaceholderProps = ImagePlaceholderContent & {
  aspect?: "video" | "square" | "wide" | "banner" | "collage" | "landscape" | "poster" | "feature" | "fill";
  /** Designed posters / flyers — edge-to-edge, no inner padding or decorative frame */
  graphic?: boolean;
  /** No border or background — image only with optional outer className styling */
  bare?: boolean;
  className?: string;
};

const aspectClasses: Record<NonNullable<ImagePlaceholderProps["aspect"]>, string> = {
  video: "aspect-video w-full",
  square: "aspect-square w-full",
  wide: "aspect-[4/3] w-full",
  banner: "aspect-[21/9] w-full",
  collage: "aspect-[16/9] w-full",
  /** Wide promotional posters (3:2) */
  landscape: "aspect-[3/2] w-full",
  poster: "aspect-[3/4] w-full",
  feature: "aspect-[5/4] w-full max-w-xl mx-auto",
  fill: "h-full min-h-full w-full",
};

export default function ImagePlaceholder({
  label,
  caption,
  imageSrc,
  imageAlt,
  imagePosition = "center",
  imageFit = "cover",
  aspect = "video",
  graphic = false,
  bare = false,
  className = "",
}: ImagePlaceholderProps) {
  if (imageSrc) {
    const isContained = imageFit === "contain";
    const padding = isContained && !graphic && !bare ? "p-3 sm:p-4" : isContained && graphic ? "p-1" : "";

    const frameClass = bare
      ? "overflow-hidden rounded-3xl"
      : graphic
        ? "overflow-hidden rounded-2xl border border-border/50 bg-white shadow-premium"
        : "overflow-hidden rounded-3xl border border-border/80 bg-section-warm shadow-premium-lg";

    return (
      <figure
        className={`relative ${frameClass} ${aspectClasses[aspect]} ${className}`}
      >
        <ZoomableImage
          src={imageSrc}
          alt={imageAlt ?? caption}
          fill
          sizes={
            aspect === "landscape"
              ? "(max-width: 1024px) 100vw, 50vw"
              : aspect === "poster"
                ? "(max-width: 640px) 88vw, 420px"
                : aspect === "feature"
                  ? "(max-width: 1024px) 80vw, 576px"
                  : "(max-width: 1024px) 100vw, 50vw"
          }
          quality={90}
          className={`${isContained ? `object-contain ${padding}` : "object-cover"}`}
          style={{ objectPosition: imagePosition }}
        />
      </figure>
    );
  }

  return (
    <figure
      className={`overflow-hidden rounded-2xl border-2 border-dashed border-brand/25 bg-brand/[0.04] ${aspectClasses[aspect]} ${className}`}
    >
      <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
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
        <figcaption className="mt-4 space-y-1">
          <p className="text-sm font-semibold text-brand sm:text-base">{label}</p>
          <p className="max-w-md text-sm italic text-muted sm:text-base">{caption}</p>
        </figcaption>
      </div>
    </figure>
  );
}
