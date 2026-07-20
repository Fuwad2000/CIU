"use client";

import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/home/SectionContainer";
import { homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import { mediaLectureItems, mediaLecturesPageContent } from "@/content/MediaContent";
import { Clock3, Play, UserRound } from "lucide-react";
import { useMemo, useState } from "react";

export default function MediaLectureList() {
  const { filters, note } = mediaLecturesPageContent;
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return mediaLectureItems;
    return mediaLectureItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "border-brand bg-brand text-white shadow-sm"
                  : "border-border bg-surface text-foreground hover:border-brand/25 hover:bg-brand/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm text-muted sm:text-base">{note}</p>

        <MotionStagger className="mt-10 grid gap-6 lg:grid-cols-2">
          {filteredItems.map((lecture) => (
            <MotionItem
              key={lecture.id}
              className="group overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface shadow-premium transition duration-500 hover:-translate-y-1 hover:shadow-premium-xl"
            >
              <div className="grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="relative min-h-[220px] sm:min-h-full">
                  <Image
                    src={lecture.imageSrc}
                    alt={lecture.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand shadow-premium-lg transition group-hover:scale-105">
                      <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-6">
                  <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                    {lecture.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    {lecture.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {lecture.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <UserRound className="h-4 w-4 text-brand" strokeWidth={1.75} aria-hidden="true" />
                      {lecture.speaker}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4 text-brand" strokeWidth={1.75} aria-hidden="true" />
                      {lecture.duration}
                    </span>
                  </div>

                  <p className="mt-3 text-xs font-semibold tracking-wide text-foreground/70 uppercase">
                    {lecture.dateLabel}
                  </p>

                  <Link
                    href={lecture.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark"
                  >
                    Watch sample layout
                  </Link>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
