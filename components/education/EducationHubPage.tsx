"use client";

import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeBtnOutlineClass, homeBtnPrimaryClass, homeSectionClass } from "@/components/home/homeUi";
import MediaHero from "@/components/media/MediaHero";
import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import { educationHubContent } from "@/content/EducationHubContent";
import { ArrowUpRight } from "lucide-react";

export default function EducationHubPage() {
  const { hero, cards } = educationHubContent;

  return (
    <div className="overflow-x-hidden bg-background">
      <MediaHero {...hero} />

      <section className={`${homeSectionClass} bg-section-warm`}>
        <SectionContainer>
          <MotionSection>
            <SectionHeading
              heading="Choose Your Learning Path"
              subheading="Azhar Canada college programs and CIU-hosted weekend Quran and kids classes."
            />
          </MotionSection>

          <MotionStagger className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {cards.map((card) => (
              <MotionItem key={card.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium transition duration-500 hover:-translate-y-1 hover:shadow-premium-xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{card.title}</h2>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="flex-1 text-sm leading-relaxed text-muted sm:text-base">
                      {card.description}
                    </p>
                    <Link href={card.href} className={`${homeBtnPrimaryClass} mt-6 w-fit`}>
                      {card.buttonLabel}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionStagger>
        </SectionContainer>
      </section>

      <section className={`${homeSectionClass} border-t border-border/80 bg-surface`}>
        <SectionContainer>
          <MotionSection className="mx-auto max-w-3xl text-center">
            <SectionHeading
              heading="Questions About Registration?"
              subheading="Contact CIU for CIU weekend programs, or visit Azhar Canada for diploma and course registration."
            />
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/Contact" className={homeBtnPrimaryClass}>
                Contact CIU
              </Link>
              <Link href="/Education/azhar" className={homeBtnOutlineClass}>
                Azhar Programs
              </Link>
              <Link href="/Education/ciu" className={homeBtnOutlineClass}>
                CIU Programs
              </Link>
            </div>
          </MotionSection>
        </SectionContainer>
      </section>
    </div>
  );
}
