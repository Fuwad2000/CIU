import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { aboutPreviewContent } from "@/content/HomeContent";
import { ArrowRightIcon } from "@/components/home/icons";

export default function AboutPreview() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <SectionContainer>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-sm">
            <Image
              src={aboutPreviewContent.imageSrc}
              alt={aboutPreviewContent.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <SectionHeading
              align="left"
              label={aboutPreviewContent.label}
              heading={aboutPreviewContent.heading}
            />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
              {aboutPreviewContent.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Link
              href={aboutPreviewContent.button.href}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base"
            >
              {aboutPreviewContent.button.label}
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
