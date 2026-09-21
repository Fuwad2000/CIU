"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Loader2, X } from "lucide-react";
import { prefetchLightboxImage } from "@frontend/lib/lightboxPrefetch";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
  /** Smaller cached thumbnail shown blurred while the full image loads. */
  previewSrc?: string;
};

type LightboxContextValue = {
  openLightbox: (item: LightboxItem) => void;
  closeLightbox: () => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useLightbox must be used within LightboxProvider");
  }
  return context;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const openLightbox = useCallback((next: LightboxItem) => {
    prefetchLightboxImage(next.src);
    setLoaded(false);
    setFailed(false);
    setRetryKey(0);
    setItem(next);
  }, []);

  const closeLightbox = useCallback(() => {
    setItem(null);
    setLoaded(false);
    setFailed(false);
  }, []);

  useEffect(() => {
    if (!item) return;

    prefetchLightboxImage(item.src);
    if (item.previewSrc) {
      prefetchLightboxImage(item.previewSrc);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, closeLightbox]);

  const handleImageLoad = useCallback(() => {
    setLoaded(true);
    setFailed(false);
  }, []);

  const handleImageError = useCallback(() => {
    setFailed(true);
    setLoaded(false);
  }, []);

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      {item ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={item.alt || "Expanded image preview"}
          aria-busy={!loaded && !failed}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-[101] rounded-full border border-white/20 bg-white/10 p-2.5 text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
            aria-label="Close image preview"
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>

          <figure
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex min-h-[40vh] w-full items-center justify-center sm:min-h-[50vh]">
              {item.previewSrc && !loaded ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.previewSrc}
                  alt=""
                  aria-hidden="true"
                  className="absolute max-h-[85vh] w-auto max-w-full rounded-2xl object-contain opacity-40 blur-md"
                />
              ) : null}

              {!loaded && !failed ? (
                <div
                  className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3"
                  role="status"
                  aria-live="polite"
                >
                  <Loader2
                    className="h-10 w-10 animate-spin text-white/90"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-medium text-white/85 sm:text-base">Loading image…</p>
                </div>
              ) : null}

              {failed ? (
                <div className="flex flex-col items-center gap-3 px-4 text-center" role="alert">
                  <p className="text-sm text-white/90 sm:text-base">
                    This image could not be loaded. Please try again.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFailed(false);
                      setLoaded(false);
                      setRetryKey((key) => key + 1);
                      prefetchLightboxImage(item.src);
                    }}
                    className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${item.src}-${retryKey}`}
                  src={item.src}
                  alt={item.alt}
                  decoding="async"
                  fetchPriority="high"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={`relative z-[2] mx-auto max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </div>

            {(item.caption || item.alt) && loaded ? (
              <figcaption className="mt-4 text-center text-sm leading-relaxed text-white/88 sm:text-base">
                {item.caption || item.alt}
              </figcaption>
            ) : null}
          </figure>
        </div>
      ) : null}
    </LightboxContext.Provider>
  );
}
