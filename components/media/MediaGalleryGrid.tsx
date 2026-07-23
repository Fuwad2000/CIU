"use client";

import Image from "next/image";
import SectionContainer from "@/components/home/SectionContainer";
import { homeSectionClass } from "@/components/home/homeUi";
import { MotionItem, MotionStagger } from "@/components/motion";
import {
  mediaGalleryItems,
  mediaImagesPageContent,
  mediaPhotoFilters,
  mediaVideoFilters,
  mediaVideoItems,
  type MediaGalleryCategory,
  type MediaGalleryItem,
  type MediaVideoCategory,
  type MediaVideoItem,
} from "@/content/MediaContent";
import { Film, Images, Play } from "lucide-react";
import { useMemo, useState } from "react";

type MediaView = "photos" | "videos";

function groupByAlbum<T extends { album: string }>(items: T[]) {
  const albums: { title: string; items: T[] }[] = [];
  const albumIndex = new Map<string, number>();

  for (const item of items) {
    const existingIndex = albumIndex.get(item.album);
    if (existingIndex !== undefined) {
      albums[existingIndex].items.push(item);
    } else {
      albumIndex.set(item.album, albums.length);
      albums.push({ title: item.album, items: [item] });
    }
  }

  return albums;
}

function GalleryCard({
  item,
  index,
}: {
  item: MediaGalleryItem;
  index: number;
}) {
  const isPoster = item.variant === "poster";
  const isFeaturedPhoto = item.featured && index === 0 && !isPoster;

  return (
    <MotionItem
      className={`group relative overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium transition duration-500 hover:shadow-premium-xl ${
        isFeaturedPhoto
          ? "col-span-2 aspect-[16/10] lg:col-span-2"
          : isPoster
            ? "aspect-[3/4]"
            : "aspect-square"
      }`}
    >
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        fill
        sizes={
          isFeaturedPhoto
            ? "(max-width: 1024px) 100vw, 66vw"
            : "(max-width: 640px) 50vw, 33vw"
        }
        className={`transition duration-700 group-hover:scale-[1.02] ${
          isPoster ? "object-contain bg-background p-3" : "object-cover group-hover:scale-110"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isPoster
            ? "bg-gradient-to-t from-black/55 via-transparent to-transparent"
            : "bg-gradient-to-t from-black/65 via-black/10 to-transparent"
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-brand-light uppercase sm:text-xs">
          {item.album}
        </p>
        <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">{item.title}</h3>
        <p className="mt-1 text-xs text-white/80 sm:text-sm">{item.dateLabel}</p>
      </div>
      <div className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
        <Images className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </div>
    </MotionItem>
  );
}

function VideoCard({ item }: { item: MediaVideoItem }) {
  return (
    <MotionItem className="group overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-premium transition duration-500 hover:shadow-premium-xl">
      <div className="relative aspect-video bg-black">
        <video
          controls
          preload="metadata"
          playsInline
          poster={item.posterSrc}
          className="h-full w-full object-cover"
        >
          <source src={item.videoSrc} />
          Your browser does not support embedded video playback.
        </video>
        {!item.posterSrc ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="rounded-full bg-white/15 p-3 text-white backdrop-blur-sm">
              <Play className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t border-border/70 p-4 sm:p-5">
        <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-brand uppercase">
          {item.album}
        </p>
        <h3 className="mt-1 text-base font-semibold text-foreground sm:text-lg">{item.title}</h3>
        <p className="mt-1 text-xs text-muted sm:text-sm">{item.dateLabel}</p>
      </div>
    </MotionItem>
  );
}

export default function MediaGalleryGrid() {
  const { viewTabs, note } = mediaImagesPageContent;
  const [mediaView, setMediaView] = useState<MediaView>("photos");
  const [photoFilter, setPhotoFilter] = useState<MediaGalleryCategory>("all");
  const [videoFilter, setVideoFilter] = useState<MediaVideoCategory | "all">("all");

  const filteredPhotos = useMemo(() => {
    if (photoFilter === "all") return mediaGalleryItems;
    return mediaGalleryItems.filter((item) => item.category === photoFilter);
  }, [photoFilter]);

  const filteredVideos = useMemo(() => {
    if (videoFilter === "all") return mediaVideoItems;
    return mediaVideoItems.filter((item) => item.category === videoFilter);
  }, [videoFilter]);

  const groupedPhotoAlbums = useMemo(() => groupByAlbum(filteredPhotos), [filteredPhotos]);
  const groupedVideoAlbums = useMemo(() => groupByAlbum(filteredVideos), [filteredVideos]);

  const showPhotoAlbumHeadings = photoFilter !== "all" && groupedPhotoAlbums.length > 1;
  const showVideoAlbumHeadings = videoFilter !== "all" && groupedVideoAlbums.length > 1;

  const activeFilters = mediaView === "photos" ? mediaPhotoFilters : mediaVideoFilters;
  const activeFilter = mediaView === "photos" ? photoFilter : videoFilter;

  return (
    <section className={`${homeSectionClass} bg-section-warm`}>
      <SectionContainer>
        <div className="flex flex-wrap gap-2">
          {viewTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMediaView(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                mediaView === tab.id
                  ? "border-brand bg-brand text-white shadow-sm"
                  : "border-border bg-surface text-foreground hover:border-brand/25 hover:bg-brand/5"
              }`}
            >
              {tab.id === "photos" ? (
                <Images className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Film className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => {
                if (mediaView === "photos") {
                  setPhotoFilter(filter.id as MediaGalleryCategory);
                } else {
                  setVideoFilter(filter.id as MediaVideoCategory | "all");
                }
              }}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter.id
                  ? "border-brand bg-brand text-white shadow-sm"
                  : "border-border bg-surface text-foreground hover:border-brand/25 hover:bg-brand/5"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm text-muted sm:text-base">{note}</p>

        {mediaView === "photos" ? (
          showPhotoAlbumHeadings ? (
            <div className="mt-10 space-y-12">
              {groupedPhotoAlbums.map((album) => (
                <div key={album.title}>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {album.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {album.items.length} photo{album.items.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <MotionStagger className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                    {album.items.map((item, index) => (
                      <GalleryCard key={item.id} item={item} index={index} />
                    ))}
                  </MotionStagger>
                </div>
              ))}
            </div>
          ) : (
            <MotionStagger className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {filteredPhotos.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} />
              ))}
            </MotionStagger>
          )
        ) : showVideoAlbumHeadings ? (
          <div className="mt-10 space-y-12">
            {groupedVideoAlbums.map((album) => (
              <div key={album.title}>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {album.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {album.items.length} video{album.items.length === 1 ? "" : "s"}
                  </p>
                </div>
                <MotionStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {album.items.map((item) => (
                    <VideoCard key={item.id} item={item} />
                  ))}
                </MotionStagger>
              </div>
            ))}
          </div>
        ) : (
          <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filteredVideos.map((item) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </MotionStagger>
        )}
      </SectionContainer>
    </section>
  );
}
