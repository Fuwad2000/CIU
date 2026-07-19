"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeCardInteractiveClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { eventCategoriesContent } from "@/content/EventsContent";

export default function EventCategories() {
  const { heading, categories } = eventCategoriesContent;

  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <SectionHeading heading={heading} />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <MotionItem key={category.id}>
              <Link
                href={category.href}
                className={`group block h-full ${homeCardInteractiveClass} p-6`}
              >
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {category.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:text-brand-dark">
                  Browse events
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
              </Link>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
