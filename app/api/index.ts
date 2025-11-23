import type {
  CategorizedShows,
  CastMember,
  Show,
} from "../types/index.ts";
import { API_URL } from "../constants.ts";
import {
  categorizeShows,
  normaliseSearchResults,
} from "../utilities/normaliser.ts";

export async function fetchShowsByCategory(): Promise<CategorizedShows> {
  const response = await fetch(`${API_URL}/shows`)
    .then((res) => res.json())
    .then((data) => categorizeShows(data));
  return response;
}

export async function fetchShowData(id: string): Promise<Show> {
  const response = await fetch(`${API_URL}/shows/${id}`)
    .then((res) => res.json())
  return response;
}

export async function fetchCastData(
  id: number
): Promise<CastMember[]> {
  const response = await fetch(`${API_URL}/shows/${id}/cast`)
    .then((res) => res.json())
    .catch(() => ({
      hasError: true,
      id,
    }));
  return response;
}

export async function searchShows(
  query: string
): Promise<Show[]> {
  const response = await fetch(`${API_URL}/search/shows?q=${query}`)
    .then((res) => res.json())
    .then((data) => normaliseSearchResults(data))
  return response;
}
