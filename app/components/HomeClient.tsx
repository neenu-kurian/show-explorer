"use client";
import { useCallback, useMemo, useState } from "react";
import Card from "./Card.tsx";
import { useSearchShows } from "../queries/index.ts";
import { Show } from "../types/index.ts";
import { useObserverRef } from "../hooks/useObserverRef.ts";
import Link from "next/link";
import SearchInput from "./SearchInput.tsx";
import { categorizeShows, sortShows } from "../utilities/normaliser.ts";
import { debounce } from "../utilities/debounce.ts";
import DropDown from "./DropDown.tsx";
import { sortOptions } from "../constants.ts";

const HomeClient = ({ shows }: { shows: Show[] }) => {
  const [itemsToShow, setItemsToShow] = useState(4);
  const [searchText, setSearchText] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortOption, setSortOption] = useState("rating-desc");

  const setObserverRef = useObserverRef(() => {
    setItemsToShow((prev) => prev + 4);
  });

  const updateSearchResults = useCallback((query: string) => {
    setSearchText(query.trim() ? query : "");
    debounce(() => setDebouncedQuery(query), 500);
  }, []);

  const {
    searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchShows(debouncedQuery);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.currentTarget.value);
  };

  const categorisedShows = useMemo(() => categorizeShows(shows), [shows]);

  const sortedShows = useMemo(
    () => sortShows(categorisedShows, sortOption),
    [categorisedShows, sortOption]
  );

  const showsToDisplay = useMemo(() => {
    if (!sortedShows || Object.keys(sortedShows).length === 0) {
      return [];
    }
    return Object.entries(sortedShows).slice(0, itemsToShow);
  }, [sortedShows, itemsToShow]);

  if (searchError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-600">Error loading shows</p>
      </div>
    );
  }

  const renderSearchResults = () => {
    if (!searchResults) return null;
    if (searchResults.length === 0)
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">No results found</p>
        </div>
      );

    if (isSearchLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Searching...</p>
        </div>
      );
    }

    return (
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        <div className="flex gap-5 flex-wrap">
          {searchResults.map((show: Show) => (
            <Link href={`/show/${show.id}`} key={show.id}>
              <Card {...show} index={show.id} />
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderShowsByGenre = () => {
    if (!showsToDisplay || showsToDisplay.length === 0) return null;

    return (
      <div className="flex flex-col gap-8">
        {showsToDisplay.map(([genre, shows]) => (
          <div key={genre}>
            <h3 className="text-2xl font-bold mb-4">{genre}</h3>
            <div className="flex flex-row gap-6 overflow-x-scroll">
              {shows?.map((eachShow: Show) => (
                <Link
                  href={`/show/${eachShow.id}`}
                  key={eachShow.id}
                  className="relative"
                >
                  <Card {...eachShow} index={eachShow.id} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-4 px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Movie Explorer
        </h1>
        <div className="flex justify-between">
          <SearchInput
            searchText={searchText}
            handleUpdate={updateSearchResults}
          />
          <DropDown options={sortOptions} onDropDownChange={handleSortChange} />
        </div>
        {searchText ? renderSearchResults() : renderShowsByGenre()}
        <div
          ref={setObserverRef}
          className="h-16 w-full bg-transparent border-0"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};
export default HomeClient;
