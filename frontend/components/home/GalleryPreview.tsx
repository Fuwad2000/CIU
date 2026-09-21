"use client";

import ZoomableImage from "@frontend/components/lightbox/ZoomableImage";
import Link from "next/link";
import SectionContainer from "@frontend/components/home/SectionContainer";
import SectionHeading from "@frontend/components/home/SectionHeading";
import { homeSectionClass } from "@frontend/components/home/homeUi";
import { MotionItem, MotionStagger } from "@frontend/components/motion";
import { galleryContent, type GalleryItem } from "@frontend/content/HomeContent";
import { ArrowUpRight, Images, Sparkles } from "lucide-react";

const layoutByIndex = [
  "col-span-2 row-span-2 min-h-[280px] sm:min-h-[340px] lg:col-span-7 lg:row-span-2 lg:min-h-[420px]",
  "min-h-[180px] sm:min-h-[200px] lg:col-span-5 lg:row-span-1 lg:min-h-0",
  "min-h-[180px] sm:min-h-[200px] lg:col-span-5 lg:row-span-1 lg:min-h-0",
  "min-h-[160px] sm:min-h-[180px] lg:col-span-3 lg:row-span-1 lg:min-h-0",
  "min-h-[160px] sm:min-h-[180px] lg:col-span-3 lg:row-span-1 lg:min-h-0",
  "min-h-[160px] sm:min-h-[180px] lg:col-span-3 lg:row-span-1 lg:min-h-0",
  "min-h-[160px] sm:min-h-[180px] lg:col-span-3 lg:row-span-1 lg:min-h-0",
  "min-h-[160px] sm:min-h-[180px] lg:col-span-4 lg:row-span-1 lg:min-h-0",
  "min-h-[160px] sm:min-h-[180px] lg:col-span-4 lg:row-span-1 lg:min-h-0",
  "min-h-[160px] sm:min-h-[180px] lg:col-span-4 lg:row-span-1 lg:min-h-0",
];

function GalleryTile({
  item,
  index,
  featured = false,
}: {
  item: GalleryItem;
  index: number;
  featured?: boolean;
}) {
  return (
    <MotionItem
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-premium transition duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_24px_60px_-12px_rgba(184,137,31,0.35)] sm:rounded-[2rem] ${layoutByIndex[index] ?? layoutByIndex[3]}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-gold/20 via-transparent to-brand/10 opacity-0 transition duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 z-[2] h-1 origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />

      <ZoomableImage
        src={item.imageSrc}
        alt={item.imageAlt}
        caption={item.title}
        fill
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 60vw"
            : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        }
        className="object-cover transition duration-700 group-hover:scale-[1.06]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />

      <div className="pointer-events-none absolute right-4 top-4 z-[2] flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-white/90 uppercase opacity-0 backdrop-blur-md transition duration-500 group-hover:opacity-100 sm:text-xs">
        <Sparkles className="h-3 w-3 text-gold-light" strokeWidth={1.75} aria-hidden="true" />
        CIU
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-4 sm:p-5">
        <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-light uppercase sm:text-xs">
          {item.label ?? "Community Moment"}
        </p>
        <h3
          className={`mt-1 font-semibold tracking-tight text-white ${featured ? "text-lg sm:text-xl lg:text-2xl" : "text-sm sm:text-base"}`}
        >
          {item.title}
        </h3>
      </div>

      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/20 blur-2xl transition duration-700 group-hover:bg-gold/30"
        aria-hidden="true"
      />
    </MotionItem>
  );
}

export default function GalleryPreview() {
  const { label, heading, subheading, items, viewAllHref, viewAllLabel } = galleryContent;

  return (
    <section className={`${homeSectionClass} relative overflow-hidden`}>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-section-warm via-background to-surface"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.18)_0,transparent_22%),radial-gradient(circle_at_80%_12%,rgba(27,94,63,0.12)_0,transparent_20%),radial-gradient(circle_at_50%_100%,rgba(212,175,55,0.1)_0,transparent_28%)]"
        aria-hidden="true"
      />

      <SectionContainer className="relative">
        <SectionHeading label={label} heading={heading} subheading={subheading} />

        <MotionStagger className="mt-12 grid auto-rows-fr grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-12 lg:gap-5">
          {items.map((item, index) => (
            <GalleryTile key={`${item.title}-${index}`} item={item} index={index} featured={index === 0} />
          ))}
        </MotionStagger>

        <div className="mt-12 flex justify-center sm:mt-14">
          <Link
            href={viewAllHref}
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-gold/30 bg-gradient-to-r from-brand to-brand-dark px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_40px_-12px_rgba(27,94,63,0.55)] transition duration-300 hover:border-gold/50 hover:shadow-[0_16px_48px_-10px_rgba(184,137,31,0.45)] sm:text-base"
          >
            <Images className="h-4 w-4 transition group-hover:scale-110" strokeWidth={1.75} aria-hidden="true" />
            {viewAllLabel}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
