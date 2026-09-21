"use client";

import ZoomableImage from "@frontend/components/lightbox/ZoomableImage";
import Link from "next/link";
import SectionContainer from "@frontend/components/home/SectionContainer";
import SectionHeading from "@frontend/components/home/SectionHeading";
import { ArrowRightIcon } from "@frontend/components/home/icons";
import {
  homeBtnGhostClass,
  homeBtnOutlineClass,
  homeCardInteractiveClass,
  homeSectionClass,
} from "@frontend/components/home/homeUi";
import { MotionItem, MotionStagger } from "@frontend/components/motion";
import { featuredProgramsContent } from "@frontend/content/HomeContent";

export default function FeaturedPrograms() {
  return (
    <section className={homeSectionClass}>
      <SectionContainer>
        <SectionHeading
          heading={featuredProgramsContent.heading}
          subheading={featuredProgramsContent.subheading}
        />

        <MotionStagger className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {featuredProgramsContent.programs.map((program) => (
            <MotionItem key={program.title}>
              <article className={`group h-full overflow-hidden ${homeCardInteractiveClass}`}>
                <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
                  <ZoomableImage
                    src={program.imageSrc}
                    alt={program.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100" />
                  <h3 className="pointer-events-none absolute bottom-5 left-5 right-5 text-xl font-semibold text-white drop-shadow-md sm:text-2xl">
                    {program.title}
                  </h3>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-base leading-relaxed text-muted sm:text-lg">
                    {program.description}
                  </p>
                  <Link href={program.href} className={`${homeBtnGhostClass} mt-5`}>
                    Learn More
                    <ArrowRightIcon />
                  </Link>
                </div>
              </article>
            </MotionItem>
          ))}
        </MotionStagger>

        <div className="mt-12 text-center">
          <Link href={featuredProgramsContent.viewAllHref} className={homeBtnOutlineClass}>
            {featuredProgramsContent.viewAllLabel}
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
