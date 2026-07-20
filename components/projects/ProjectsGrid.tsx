"use client";

import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeading from "@/components/home/SectionHeading";
import { homeBtnGhostClass, homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { projects, projectsGridContent, type ProjectStatus } from "@/content/ProjectsContent";
import { ArrowUpRight } from "lucide-react";

function statusClassName(status: ProjectStatus) {
  switch (status) {
    case "active":
      return "border-brand/20 bg-brand/8 text-brand";
    case "upcoming":
      return "border-gold/25 bg-gold/10 text-gold-dark";
    case "completed":
      return "border-border bg-background text-muted";
  }
}

export default function ProjectsGrid() {
  const { id, heading, subheading } = projectsGridContent;

  return (
    <section id={id} className={`${homeSectionClass} bg-surface`}>
      <SectionContainer>
        <SectionHeading heading={heading} subheading={subheading} />

        <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <MotionItem
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium transition duration-500 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-premium-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                <span
                  className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[0.65rem] font-semibold tracking-wide uppercase ${statusClassName(project.status)}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                  {project.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {project.summary}
                </p>
                {project.goalLabel ? (
                  <p className="mt-4 text-xs font-semibold tracking-wide text-foreground/70 uppercase">
                    {project.goalLabel}
                  </p>
                ) : null}
                <Link href={project.href} className={`${homeBtnGhostClass} mt-5`}>
                  View project
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
