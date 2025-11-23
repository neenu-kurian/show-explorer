import { useQuery } from "@tanstack/react-query";
import { fetchShowData, fetchShowsByCategory, searchShows } from "../api/index.ts";
import { Show } from "../types/index.ts";

export const useShowsByCategory = () => {
  const {
    data: showsByGenre,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["showsByGenre"],
    queryFn: fetchShowsByCategory,
  });
  return { showsByGenre, isLoading, error };
};

export const useShowDetails = (id?: string) => {
  const {
    data: show,
    isLoading,
    error,
  } = useQuery<Show, Error, Show, ["show", string]>({
    queryKey: ["show", id as string],
    queryFn: ({ queryKey }) => {
      const [, showId] = queryKey;
      return fetchShowData(showId);
    },
    enabled: !!id?.trim(),
  });
  return { show, isLoading, error };
};

export const useSearchShows = ( query: string ) => {
  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchShows(query),
    enabled: !!query?.trim(),
  });
  return { searchResults, isLoading, error };
}