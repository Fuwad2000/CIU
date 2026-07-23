import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "public/images/CIU General Photo");
const DEST = join(ROOT, "public/media/ciu-general");
const MANIFEST_PATH = join(ROOT, "content/ciu-general-manifest.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm"]);

/** Source files excluded from the public media gallery or git (size/policy). */
const EXCLUDED_VIDEO_BASENAMES = new Set(["IMG_5649.MOV", "IMG_2404.MOV"]);

function slugExt(file) {
  return extname(file).toLowerCase();
}

function copyFiles(srcDir, destDir, prefix, filter) {
  if (!existsSync(srcDir)) return [];
  mkdirSync(destDir, { recursive: true });
  const files = readdirSync(srcDir)
    .map((name) => join(srcDir, name))
    .filter((p) => statSync(p).isFile())
    .filter((p) => filter(slugExt(p)))
    .sort();

  return files.map((src, i) => {
    const ext = slugExt(src).slice(1);
    const destName = `${prefix}-${String(i + 1).padStart(2, "0")}.${ext}`;
    const dest = join(destDir, destName);
    cpSync(src, dest);
    return {
      srcRelative: relative(SRC, src).replace(/\\/g, "/"),
      publicPath: dest.replace(join(ROOT, "public"), "").replace(/\\/g, "/"),
    };
  });
}

function walkVideos(dir, results = []) {
  if (!existsSync(dir)) return results;

  for (const name of readdirSync(dir).sort()) {
    const fullPath = join(dir, name);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walkVideos(fullPath, results);
      continue;
    }
    const ext = slugExt(fullPath);
    if (!VIDEO_EXT.has(ext)) continue;
    results.push(fullPath);
  }

  return results;
}

function videoCategory(relativePath) {
  const normalized = relativePath.toLowerCase();
  if (normalized.includes("kids_program") || normalized.includes("kids program")) {
    return "kids";
  }
  if (normalized.includes("azhar")) {
    return "azhar";
  }
  if (normalized.includes("volunteer")) {
    return "volunteer";
  }
  return "general";
}

function videoAlbum(category) {
  if (category === "kids") return "CIU Kids Program Videos";
  return "CIU Community Videos";
}

if (existsSync(DEST)) rmSync(DEST, { recursive: true });

const manifest = {
  azhar: copyFiles(
    join(SRC, "Azhar Canada College"),
    join(DEST, "azhar"),
    "azhar",
    (ext) => IMAGE_EXT.has(ext),
  ).map((item) => item.publicPath),
  kids: copyFiles(
    join(SRC, "General /KIDS_Program"),
    join(DEST, "ciu-programs/kids"),
    "kids",
    (ext) => IMAGE_EXT.has(ext),
  ).map((item) => item.publicPath),
  kidsPosters: copyFiles(
    join(SRC, "General /KIDS_Program_Poster"),
    join(DEST, "ciu-programs/posters"),
    "poster",
    (ext) => IMAGE_EXT.has(ext),
  ).map((item) => item.publicPath),
  volunteer: copyFiles(
    join(SRC, "Volunteer"),
    join(DEST, "volunteer"),
    "volunteer",
    (ext) => IMAGE_EXT.has(ext),
  ).map((item) => item.publicPath),
  generalPhotos: copyFiles(
    join(SRC, "CIU"),
    join(DEST, "general/photos"),
    "general",
    (ext) => IMAGE_EXT.has(ext),
  ).map((item) => item.publicPath),
  videos: [],
};

const videoDir = join(DEST, "general/videos");
mkdirSync(videoDir, { recursive: true });

const allSourceVideos = walkVideos(SRC).sort();
let publishedIndex = 0;

for (const src of allSourceVideos) {
  const basename = src.split("/").pop() ?? src;
  const srcRelative = relative(SRC, src).replace(/\\/g, "/");
  const ext = slugExt(src);
  const category = videoCategory(srcRelative);
  const excluded = EXCLUDED_VIDEO_BASENAMES.has(basename);

  if (excluded) {
    manifest.videos.push({
      id: `excluded-${basename}`,
      title: basename.replace(/\.[^.]+$/, ""),
      album: videoAlbum(category),
      category,
      dateLabel: "2024–2025",
      videoSrc: "",
      sourceRelative: srcRelative,
      excludedFromGallery: true,
    });
    continue;
  }

  publishedIndex += 1;
  const destName = `video-${String(publishedIndex).padStart(2, "0")}${ext}`;
  const dest = join(videoDir, destName);
  cpSync(src, dest);

  manifest.videos.push({
    id: `ciu-video-${String(publishedIndex).padStart(2, "0")}`,
    title: basename.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "),
    album: videoAlbum(category),
    category,
    dateLabel: "2024–2025",
    videoSrc: `/media/ciu-general/general/videos/${destName}`,
    sourceRelative: srcRelative,
    excludedFromGallery: false,
  });
}

writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(JSON.stringify(manifest, null, 2));
console.error(
  `Synced ${Object.values(manifest).flat().length} assets. Videos: ${manifest.videos.length} (${manifest.videos.filter((v) => !v.excludedFromGallery).length} published).`,
);
