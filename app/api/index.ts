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
 try {
    const res = await fetch(`${API_URL}/shows`);
    if (!res.ok) {
      throw new Error(`Failed to fetch shows: ${res.status}`);
    }
    const data = await res.json();
    return categorizeShows(data);
  } catch (err) {
    console.error("fetchShowsByCategory error", err);
    throw err;
  }
}

export async function fetchShowData(id: string): Promise<Show> {
  try {
    const res = await fetch(`${API_URL}/shows/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch show ${id}: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`fetchShowData error for id=${id}`, err);
    throw err;
  }
}

export async function fetchCastData(
  id: number
): Promise<CastMember[]> {
 try {
    const res = await fetch(`${API_URL}/shows/${id}/cast`);
    if (!res.ok) {
      throw new Error(`Failed to fetch cast for show ${id}: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`fetchCastData error for id=${id}`, err);
    // Return empty array to allow callers to gracefully handle missing cast data
    return [];
  }
}

export async function searchShows(
  query: string
): Promise<Show[]> {
  try {
    const res = await fetch(`${API_URL}/search/shows?q=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error(`Failed to search shows: ${res.status}`);
    }
    const data = await res.json();
    return normaliseSearchResults(data);
  } catch (err) {
    console.error("searchShows error", err);
    throw err;
  }
}
