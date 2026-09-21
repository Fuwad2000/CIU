import {
  POSTER_MAX_BYTES,
  isPosterContentType,
  parsePosterImage,
  type PosterImageInput,
} from "@shared/poster-image";

export async function readPosterFile(file: File): Promise<PosterImageInput | string> {
  if (!isPosterContentType(file.type)) return "Choose a JPEG, PNG, WebP, or GIF poster.";
  if (file.size > POSTER_MAX_BYTES) return "The poster must be 1.5 MB or smaller.";
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("The poster file could not be read."));
    reader.readAsDataURL(file);
  });
  const comma = dataUrl.indexOf(",");
  const contentInBase64 = comma >= 0 ? dataUrl.slice(comma + 1) : "";
  return (
    parsePosterImage({
      name: file.name,
      contentType: file.type,
      contentInBase64,
    }) ?? "The poster file could not be read."
  );
}
