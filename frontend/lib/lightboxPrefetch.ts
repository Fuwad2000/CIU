const prefetched = new Set<string>();

/** Warm the browser cache for a lightbox image before the user opens it. */
export function prefetchLightboxImage(src: string) {
  if (!src || prefetched.has(src)) return;

  prefetched.add(src);
  const img = new Image();
  img.decoding = "async";
  img.src = src;
}
