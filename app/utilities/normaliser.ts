import type {
  Show,
  CategorizedShows,
  SearchResult,
} from "../types/index.ts";

export function categorizeShows(
  shows: Show[],
): CategorizedShows {
  const showsByCategory: CategorizedShows = {};
  shows.forEach((show: Show) => {
    show.genres?.forEach((genre: string) => {
      if (!showsByCategory[genre]) {
        showsByCategory[genre] = [];
      }
      showsByCategory[genre].push(show);
    });
  });
  return showsByCategory;
}

export function normaliseSearchResults(
  results: SearchResult[]
): Show[]{
  return results.map((result: SearchResult) => result.show);
}

export function sortShows(
  showsToSort: CategorizedShows,
  sortBy: string
): CategorizedShows {
  Object.entries(showsToSort).forEach(([genre, shows]) => {
    showsToSort[genre] = [...shows].sort((show1, show2) => {
      const ratingA = show1.rating?.average || 0;
      const ratingB = show2.rating?.average || 0;
      return sortBy === "rating-asc" ? ratingA - ratingB : ratingB - ratingA;
    });
  });
  return showsToSort;
}
