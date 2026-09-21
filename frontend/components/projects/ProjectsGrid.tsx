"use client";

import { useState } from "react";
import ZoomableImage from "@frontend/components/lightbox/ZoomableImage";
import SectionContainer from "@frontend/components/home/SectionContainer";
import SectionHeading from "@frontend/components/home/SectionHeading";
import { homeSectionClass } from "@frontend/components/home/homeUi";
import { MotionItem, MotionStagger } from "@frontend/components/motion";
import { projects, projectsGridContent, type ProjectStatus } from "@frontend/content/ProjectsContent";
import { Check, ChevronDown, Clock } from "lucide-react";

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

function statusLabel(status: ProjectStatus) {
  switch (status) {
    case "active":
      return "Active";
    case "upcoming":
      return "Upcoming";
    case "completed":
      return "Completed";
  }
}

export default function ProjectsGrid() {
  const { id, heading, subheading } = projectsGridContent;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (projectId: string) => {
    setExpandedId((current) => (current === projectId ? null : projectId));
  };

  return (
    <section id={id} className={`${homeSectionClass} bg-surface`}>
      <SectionContainer>
        <SectionHeading heading={heading} subheading={subheading} />

        <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const expanded = expandedId === project.id;

            return (
              <MotionItem key={project.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium transition duration-300 hover:border-brand/20 hover:shadow-premium-lg">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ZoomableImage
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                    <span
                      className={`pointer-events-none absolute left-4 top-4 rounded-full border px-3 py-1 text-[0.65rem] font-semibold tracking-wide uppercase ${statusClassName(project.status)}`}
                    >
                      {statusLabel(project.status)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                      {project.summary}
                    </p>
                    {project.goalLabel ? (
                      <p className="mt-4 text-xs font-semibold tracking-wide text-foreground/70 uppercase">
                        {project.goalLabel}
                      </p>
                    ) : null}

                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`project-details-${project.id}`}
                      onClick={() => toggleExpanded(project.id)}
                      className="mt-5 inline-flex w-full items-center justify-between gap-2 rounded-xl border border-border/80 bg-background px-4 py-3 text-sm font-semibold text-brand transition hover:border-brand/25 hover:bg-brand/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      {expanded ? "Show less" : "More details"}
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </button>

                    {expanded ? (
                      <div
                        id={`project-details-${project.id}`}
                        className="mt-4 space-y-4 border-t border-border/70 pt-4"
                      >
                        <p className="text-sm leading-relaxed text-muted sm:text-base">
                          {project.details.description}
                        </p>

                        <ul className="space-y-2">
                          {project.details.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-sm leading-relaxed text-muted"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                                strokeWidth={1.75}
                                aria-hidden="true"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>

                        {project.details.timeline ? (
                          <div className="rounded-xl border border-border/70 bg-background px-4 py-3">
                            <p className="inline-flex items-start gap-2 text-sm leading-relaxed text-muted">
                              <Clock
                                className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                                strokeWidth={1.75}
                                aria-hidden="true"
                              />
                              <span>
                                <span className="font-semibold text-foreground">Timeline: </span>
                                {project.details.timeline}
                              </span>
                            </p>
                          </div>
                        ) : null}

                        {project.details.supportNote ? (
                          <p className="text-sm leading-relaxed text-muted italic">
                            {project.details.supportNote}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </article>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
