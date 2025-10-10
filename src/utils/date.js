// YYYY-MM-DD 포맷 문자열로 변환
function formatDate(date) {
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
