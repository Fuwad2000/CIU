/** Labeled placeholder — replace with Cloudinary URL when uploaded. */
export function imagePlaceholder(
  slot: string,
  width = 1200,
  height = 800,
): string {
  const label = slot.replace(/^\/(?:media|images)\//, "").replace(/\.[^.]+$/, "");
  return `https://placehold.co/${width}x${height}/1B5E3F/D4AF37/png?text=${encodeURIComponent(`UPLOAD: ${label}`)}`;
}

/** Portrait posters and flyers */
export function posterPlaceholder(slot: string): string {
  return imagePlaceholder(slot, 900, 1200);
}
