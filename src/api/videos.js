import { get } from "./client";

// 트레일러 선택 유틸 (YouTube + Official/Trailer 우선 + 최신 공개일)
export function pickBestTrailer(videos = []) {
  const yt = videos.filter((v) => v.site === "YouTube");
  if (!yt.length) return null;

  const weight = (v) => {
    let w = 0;
    if (v.official) w += 2;
    if (v.type === "Trailer") w += 2;
    else if (v.type === "Teaser") w += 1;
    const ts = v.published_at ? new Date(v.published_at).getTime() : 0;
    return [w, ts];
  };

  yt.sort((a, b) => {
    const [wa, ta] = weight(a);
    const [wb, tb] = weight(b);
    if (wb !== wa) return wb - wa;
    return tb - ta;
  });

  const best = yt[0];
  return best
    ? `https://www.youtube.com/embed/${best.key}?autoplay=1&mute=1`
    : null;
}

export async function getBestTrailerUrl(movieId) {
  const data = await get(`/movie/${movieId}/videos`);
  return pickBestTrailer(data.results || []);
}
