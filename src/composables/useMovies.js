const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMG_BASE = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export function useMovies() {
  const fetchMovies = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
  };

  return { fetchMovies };
}
