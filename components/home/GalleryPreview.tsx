import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { ArrowRightIcon } from "@/components/home/icons";
import { galleryContent } from "@/content/HomeContent";
import { Images } from "lucide-react";

export default function GalleryPreview() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      {/*
        Parental or guardian consent must be confirmed before publishing
        identifiable images of children in the gallery.
      */}
      <SectionContainer>
        <SectionHeading
          heading={galleryContent.heading}
          subheading={galleryContent.subheading}
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {galleryContent.items.map((item, index) => (
            <div
              key={item.imageSrc}
              className={`group relative overflow-hidden rounded-2xl border border-border shadow-sm ${
                index === 0 ? "col-span-2 row-span-2 aspect-[16/10] lg:col-span-2 lg:row-span-2" : "aspect-square"
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
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={galleryContent.viewAllHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand/20 bg-brand/5 px-6 py-3 text-sm font-semibold text-brand transition hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base"
          >
            <Images className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {galleryContent.viewAllLabel}
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
