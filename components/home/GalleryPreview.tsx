"use client";

import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeBtnOutlineClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { galleryContent } from "@/content/HomeContent";
import { Images } from "lucide-react";

export default function GalleryPreview() {
  return (
    <section className={`${homeSectionClass} bg-surface`}>
      {/*
        Parental or guardian consent must be confirmed before publishing
        identifiable images of children in the gallery.
      */}
      <SectionContainer>
        <SectionHeading
          heading={galleryContent.heading}
          subheading={galleryContent.subheading}
        />

        <MotionStagger className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {galleryContent.items.map((item, index) => (
            <MotionItem
              key={item.imageSrc}
              className={`group relative overflow-hidden rounded-2xl border border-border/80 shadow-premium transition duration-500 hover:shadow-premium-lg ${
                index === 0
                  ? "col-span-2 row-span-2 aspect-[16/10] lg:col-span-2 lg:row-span-2"
                  : "aspect-square"
              }`}
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                }
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 transition duration-500 group-hover:opacity-100 sm:p-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <Images className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  Community Moment
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>

        <div className="mt-12 text-center">
          <Link href={galleryContent.viewAllHref} className={homeBtnOutlineClass}>
            <Images className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {galleryContent.viewAllLabel}
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
