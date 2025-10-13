// YYYY-MM-DD 포맷 문자열로 변환
export function formatDate(date) {
  return date.toISOString().split("T")[0];
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
  return "개봉";
}
