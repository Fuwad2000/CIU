"use client";

import Image from "next/image";
import SectionContainer from "@/components/home/SectionContainer";
import { homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import {
  mediaGalleryItems,
  mediaImagesPageContent,
  type MediaGalleryCategory,
} from "@/content/MediaContent";
import { Images } from "lucide-react";
import { useMemo, useState } from "react";

export default function MediaGalleryGrid() {
  const { filters, note } = mediaImagesPageContent;
  const [activeFilter, setActiveFilter] = useState<MediaGalleryCategory>("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return mediaGalleryItems;
    return mediaGalleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter.id
                  ? "border-brand bg-brand text-white shadow-sm"
                  : "border-border bg-surface text-foreground hover:border-brand/25 hover:bg-brand/5"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm text-muted sm:text-base">{note}</p>

        <MotionStagger className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {filteredItems.map((item, index) => (
            <MotionItem
              key={item.id}
              className={`group relative overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium transition duration-500 hover:shadow-premium-xl ${
                item.featured && index === 0
                  ? "col-span-2 aspect-[16/10] lg:col-span-2"
                  : "aspect-square"
              }`}
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes={
                  item.featured && index === 0
                    ? "(max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 640px) 50vw, 33vw"
                }
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-brand-light uppercase sm:text-xs">
                  {item.category}
                </p>
                <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">{item.title}</h3>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">{item.dateLabel}</p>
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                <Images className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
