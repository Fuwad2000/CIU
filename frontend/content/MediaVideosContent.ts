const PLAYLIST_ID = "PLJZcQN9Su51RTWCGbEM44K_VaN-v3aA-h";

export const youtubeShorts = [
  { id: "short-quran-error-free", title: "Quran Is Error Free", videoId: "W5TEgnnmWKM" },
  { id: "short-quran-conflict-free", title: "Quran Is Conflict Free", videoId: "R8vgX8wmx48" },
  { id: "short-sahaba-elders", title: "How Sahaba Respected Elders", videoId: "3AHDuxwZcak" },
  { id: "short-islam-is-easy", title: "Islam Is Easy", videoId: "6rAeKa10838" },
  { id: "short-what-is-zakah", title: "What Is Zakah?", videoId: "mbz5rQXT28M" },
  { id: "short-motivate-kids", title: "How to Motivate Kids", videoId: "J7tnMoAVKVs" },
  { id: "short-respect-in-islam", title: "Respect in Islam", videoId: "7TSsR2mUtvc" },
  { id: "short-witness", title: "Witness", videoId: "0aZzabNtP4g" },
  { id: "short-sunni-or-shia", title: "Are We Sunni or Shia?", videoId: "gyyo1BylCJg" },
  { id: "short-islam-fearless", title: "Islam Makes You Fearless", videoId: "MG8xbM_GpFM" },
] as const;

/** Known video IDs for playlist entries; others use playlist index embed */
const lectureVideoIds: Partial<Record<number, string>> = {
  1: "HN2VQSAYK7c",
  2: "F4mZ9BhkB-M",
  3: "KZgBUG0hUcg",
  28: "s4nmfb4RWiI",
};

export function youtubeShortEmbed(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0&modestbranding=1`;
}

export function youtubeShortWatchHref(videoId: string) {
  return `https://www.youtube.com/shorts/${videoId}`;
}

export function youtubeLectureEmbed(index: number) {
  const videoId = lectureVideoIds[index];
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?list=${PLAYLIST_ID}`;
  }
  return `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&index=${index}`;
}

export function youtubeLectureWatchHref(index: number) {
  const videoId = lectureVideoIds[index];
  if (videoId) {
    const indexParam = index > 1 ? `&index=${index}` : "";
    return `https://www.youtube.com/watch?v=${videoId}&list=${PLAYLIST_ID}${indexParam}`;
  }
  return `https://www.youtube.com/watch?v=${lectureVideoIds[1] ?? "HN2VQSAYK7c"}&list=${PLAYLIST_ID}&index=${index}`;
}

export const youtubeLectures = Array.from({ length: 28 }, (_, index) => {
  const episode = index + 1;
  return {
    id: `lecture-${episode}`,
    title: `CIU Lecture ${episode}`,
    embedSrc: youtubeLectureEmbed(episode),
    watchHref: youtubeLectureWatchHref(episode),
  };
});

export const youtubeShortItems = youtubeShorts.map((item) => ({
  id: item.id,
  title: item.title,
  embedSrc: youtubeShortEmbed(item.videoId),
  watchHref: youtubeShortWatchHref(item.videoId),
}));
