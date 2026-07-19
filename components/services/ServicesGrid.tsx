"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import {
  homeBtnGhostClass,
  homeCardInteractiveClass,
  homeSectionClass,
} from "@/components/home/homeUi";
import { ServiceIcon } from "@/components/services/icons";
import { MotionItem, MotionStagger } from "@/components/motion";
import { coreServicesContent } from "@/content/ServicesContent";

export default function ServicesGrid() {
  const { id, heading, subheading, services } = coreServicesContent;

  return (
    <section id={id} className={homeSectionClass}>
      <SectionContainer>
        <SectionHeading heading={heading} subheading={subheading} />

        <MotionStagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <MotionItem key={service.id}>
              <article
                id={service.id}
                className={`group flex h-full flex-col ${homeCardInteractiveClass} overflow-hidden`}
              >
                <div className="h-1 w-full origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="inline-flex w-fit rounded-2xl bg-brand/10 p-3.5 text-brand shadow-sm transition group-hover:bg-brand group-hover:text-white">
                    <ServiceIcon name={service.icon} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-foreground sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {service.description}
                  </p>

                  <details className="group/details mt-4 rounded-xl border border-border/80 bg-background/70 open:shadow-sm">
                    <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-brand marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="inline-flex items-center gap-2">
                        View service details
                        <ArrowRight className="h-4 w-4 transition group-open/details:rotate-90" />
                      </span>
                    </summary>
                    <ul className="space-y-2 border-t border-border/70 px-4 py-3 text-sm leading-relaxed text-muted">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </details>

                  <Link href={service.href} className={`${homeBtnGhostClass} mt-5`}>
                    {service.buttonLabel}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </Link>

                  {service.disclaimer ? (
                    <p className="mt-4 border-t border-border/70 pt-4 text-xs leading-relaxed text-muted">
                      {service.disclaimer}
                    </p>
                  ) : null}
                </div>
              </article>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
