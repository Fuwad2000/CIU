import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { ArrowRightIcon } from "@/components/home/icons";
import { featuredProgramsContent } from "@/content/HomeContent";

export default function FeaturedPrograms() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <SectionContainer>
        <SectionHeading
          heading={featuredProgramsContent.heading}
          subheading={featuredProgramsContent.subheading}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProgramsContent.programs.map((program) => (
            <article
              key={program.title}
              className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={program.imageSrc}
                  alt={program.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-foreground sm:text-lg">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {program.description}
                </p>
                <Link
                  href={program.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base"
                >
                  Learn More
                  <ArrowRightIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={featuredProgramsContent.viewAllHref}
            className="inline-flex items-center justify-center rounded-xl border border-brand/20 bg-brand/5 px-6 py-3 text-sm font-semibold text-brand transition hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base"
          >
            {featuredProgramsContent.viewAllLabel}
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
