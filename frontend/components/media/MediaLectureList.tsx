"use client";

import SectionContainer from "@frontend/components/home/SectionContainer";
import { homeSectionClass } from "@frontend/components/home/homeUi";
import { MotionItem, MotionStagger } from "@frontend/components/motion";
import { mediaLectureItems, mediaLecturesPageContent } from "@frontend/content/MediaContent";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function MediaLectureList() {
  const { note } = mediaLecturesPageContent;

  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <p className="text-sm text-muted sm:text-base">{note}</p>

        <MotionStagger className="mt-10 grid gap-6 lg:grid-cols-2">
          {mediaLectureItems.map((lecture) => (
            <MotionItem
              key={lecture.id}
              className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface shadow-premium"
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  src={lecture.embedSrc}
                  title={lecture.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-border/70 p-5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {lecture.title}
                </h3>
                <Link
                  href={lecture.watchHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-brand-dark"
                >
                  Watch on YouTube
                  <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </SectionContainer>
    </section>
  );
}
