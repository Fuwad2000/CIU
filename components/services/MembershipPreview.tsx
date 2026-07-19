"use client";

import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import {
  homeBtnPrimaryClass,
  homeCardInteractiveClass,
  homeSectionClass,
} from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { membershipPreviewContent } from "@/content/ServicesContent";

export default function MembershipPreview() {
  const { heading, intro, benefits, note, button } = membershipPreviewContent;

  return (
    <section className={`${homeSectionClass} border-y border-border/80 bg-surface`}>
      <SectionContainer>
        <SectionHeading heading={heading} subheading={intro} />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <MotionItem key={benefit.title}>
              <article className={`h-full ${homeCardInteractiveClass} p-6`}>
                <div className="inline-flex rounded-2xl bg-brand/10 p-3 text-brand">
                  <UserPlus className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground sm:text-lg">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {benefit.description}
                </p>
              </article>
            </MotionItem>
          ))}
        </MotionStagger>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted sm:text-base">
          {note}
        </p>

        <div className="mt-8 text-center">
          <Link href={button.href} className={homeBtnPrimaryClass}>
            {button.label}
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
