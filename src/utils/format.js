// YYYY-MM-DD 포맷 문자열로 변환
export function formatDate(value) {
  if (!value) return null;

  let dateObj = value;
  if (typeof value === "string") {
    dateObj = new Date(value); // "2024-07-15" 같은 문자열 대응
  }
  if (!(dateObj instanceof Date) || isNaN(dateObj)) return null;

  return dateObj.toISOString().slice(0, 10).replace(/-/g, "-");
}

// 오늘 날짜
export function getToday() {
  return formatDate(new Date());
}

// n개월 전 날짜
export function getMonthsAgo(months) {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return formatDate(date);
}

// 개봉일 D-Day
export function getDDay(releaseDate) {
  if (!releaseDate) return null;
  const today = new Date();
  const target = new Date(releaseDate);

  // 날짜 차이 계산 (UTC 시간 차이 보정)
  const diffTime = target.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  if (diffDays === 0) return "D-Day";
  return null;
}

// 런타임 포맷 (분 → h m)
export function formatRuntime(mins) {
  if (!mins && mins !== 0) return "-";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

// 국가별 영화 연령 등급 선택
export function pickCertification(releaseDates) {
  if (!releaseDates?.results) return null;

  const pick = (cc) => {
    const entry = releaseDates.results.find(
      (r) => r.iso_3166_1 === cc && r.release_dates?.length
    );
    if (!entry) return null;

    // certification이 비어 있지 않은 첫 release_date 항목
    const valid = entry.release_dates.find((d) => d.certification);
    return valid?.certification || null;
  };

  return pick("KR") || pick("US") || pick("GB") || null;
}

// 간단 통화 포맷 (USD, 0단위 반올림)
export const formatMoney = (num) => {
  if (typeof num !== "number" || !isFinite(num) || num <= 0) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
};

// 비율(%) 포맷
export const formatPercent = (ratio) => {
  if (typeof ratio !== "number" || !isFinite(ratio)) return null;
  return `${(ratio * 100).toFixed(1)}%`;
};

// ISO 639-1 언어코드 → 라벨 변환
export const languageLabel = (code) => {
  const map = {
    en: "English",
    ko: "Korean",
    ja: "Japanese",
    fr: "French",
    de: "German",
    es: "Spanish",
    zh: "Chinese",
    it: "Italian",
    ru: "Russian",
    hi: "Hindi",
  };
  return map[code] || code || "—";
};
