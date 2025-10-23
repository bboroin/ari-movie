const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";
export const LANGUAGE = "ko-KR";
export const REGION = "KR";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_TOKEN}`,
};

export function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  const baseParams = { language: LANGUAGE, ...params };
  Object.entries(baseParams).forEach(([k, v]) => {
    if (v != null && v !== "") url.searchParams.set(k, v);
  });
  return url.toString();
}

export async function get(path, params = {}) {
  const res = await fetch(buildUrl(path, params), { method: "GET", headers });
  if (!res.ok) throw new Error(`TMDB ${path} ${res.status} ${res.statusText}`);
  return res.json();
}
