import ZoomableImage from "@/components/lightbox/ZoomableImage";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import { homeBtnPrimaryClass, homeSectionClass } from "@/components/home/homeUi";
import { featuredEventContent } from "@/content/EventsContent";

export default function FamilyPicnicPage() {
  const { title, dateLabel, time, location, description, chips, primaryButton, imageSrc, imageAlt, note } =
    featuredEventContent;

  return (
    <div className={`${homeSectionClass} bg-background`}>
      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">Special Event</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>

          <div className="mt-5 space-y-2 text-base text-muted">
            <p className="inline-flex items-center gap-2 font-medium text-foreground">
              <Clock className="h-4 w-4 text-brand" strokeWidth={1.75} aria-hidden="true" />
              {dateLabel} · {time}
            </p>
            <p className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-brand" strokeWidth={1.75} aria-hidden="true" />
              {location}
            </p>
          </div>

          <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-3xl border border-border/80 bg-section-warm shadow-premium-lg sm:aspect-[4/5]">
            <ZoomableImage
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-contain p-4"
            />
          </div>

          <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">{description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-sm font-medium text-brand"
              >
                {chip}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">{note}</p>

          <Link href={primaryButton.href} className={`${homeBtnPrimaryClass} mt-8 inline-flex`}>
            {primaryButton.label}
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
}
