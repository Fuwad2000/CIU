"use client";

import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeBtnOutlineClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { pastEventsContent } from "@/content/EventsContent";

export default function PastEvents() {
  /*
    // Do not publish identifiable images of children without confirmed parent or guardian consent.
  */
  const { id, heading, subheading, items, viewGalleryLabel, viewGalleryHref } = pastEventsContent;

  return (
    <section id={id} className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
      <SectionContainer>
        <SectionHeading heading={heading} subheading={subheading} />

        <MotionStagger className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <MotionItem
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-border/80 shadow-premium transition hover:shadow-premium-lg"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-xs font-semibold tracking-wide text-brand-light uppercase">
                  {item.category}
                </p>
                <h3 className="mt-1 text-sm font-semibold sm:text-base">{item.title}</h3>
                <p className="mt-1 text-xs text-white/85 sm:text-sm">{item.dateLabel}</p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>

        <div className="mt-10 text-center">
          <Link href={viewGalleryHref} className={homeBtnOutlineClass}>
            <Images className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {viewGalleryLabel}
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
