export function parseGenres(params) {
  const raw = params.get("genres") || "";
  return raw ? raw.split(",").filter(Boolean) : [];
}

export function writeGenres(params, ids) {
  const next = new URLSearchParams(params);
  if (!ids.length) next.delete("genres");
  else next.set("genres", ids.join(",")); // , 고정 (AND)
  next.set("page", "1"); // 필터 바꾸면 1페이지로
  return next;
}

export function toggleGenreParam(params, id) {
  const ids = parseGenres(params);
  const set = new Set(ids);
  const k = String(id);
  set.has(k) ? set.delete(k) : set.add(k);
  return writeGenres(params, Array.from(set));
}

export function clearGenresParam(params) {
  const next = new URLSearchParams(params);
  next.delete("genres");
  next.set("page", "1");
  return next;
}
