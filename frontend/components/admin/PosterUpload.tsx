"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { readPosterFile } from "@frontend/portal/poster-file";
import { posterPreviewSrc, type PosterImageInput } from "@shared/poster-image";

export default function PosterUpload({
  label,
  hint,
  poster,
  fallbackSrc,
  onChange,
  onError,
}: {
  label: string;
  hint: string;
  poster: PosterImageInput | null;
  fallbackSrc?: string;
  onChange: (poster: PosterImageInput | null) => void;
  onError: (message: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = poster ? posterPreviewSrc(poster) : fallbackSrc || "";

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <p className="mb-3 text-sm text-muted">{hint}</p>
      {preview ? (
        <div className="mb-3 overflow-hidden rounded-2xl border border-border bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Poster preview" className="max-h-72 w-full object-contain bg-background" />
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
        >
          <ImagePlus className="h-4 w-4" strokeWidth={1.75} />
          {preview ? "Replace poster" : "Upload poster"}
        </button>
        {preview ? (
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
            Remove
          </button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          void readPosterFile(file).then((result) => {
            if (typeof result === "string") {
              onError(result);
              return;
            }
            onError("");
            onChange(result);
          });
        }}
      />
    </div>
  );
}
