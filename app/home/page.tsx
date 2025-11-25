"use client"
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSearchShows } from "../queries/index.ts";
import { Show } from "../types/index.ts";
import { useObserverRef } from "../hooks/useObserverRef.ts";
import Link from "next/link";
import SearchInput from "../components/SearchInput";
import { categorizeShows } from "../utilities/normaliser.ts";

const Home = ({shows}: {shows: Show[]}) => {
  const [itemsToShow, setItemsToShow] = useState(4);
  const [showsToDisplay, setShowsToDisplay] = useState<[string, Show[]][]>([]);
  const [searchText, setSearchText] = useState("");

  const setObserverRef = useObserverRef(() => {
    setItemsToShow((prev) => prev + 4);
  });

   const updateSearchResults = (searchInput: string) => {
    setSearchText(searchInput);
  };

  const {
    searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchShows(searchText);

  useEffect(() => {
    const showsByGenre = categorizeShows(shows);
    if (showsByGenre) {
      setShowsToDisplay(Object.entries(showsByGenre).slice(0, itemsToShow));
    }
  }, [shows, itemsToShow]);

  if (searchError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-600">Error loading shows</p>
      </div>
    );
  }
  if (isSearchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const renderSearchResults = () => {
    if (!searchResults || searchResults.length === 0) return null;

    return (
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        <div className="flex flex-row gap-4 overflow-x-scroll">
          {searchResults.map((show: Show) => (
            <Link href={`/show/${show.id}`} key={show.id}>
              <Card {...show} />
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderShowsByGenre = () => {
    if (!showsToDisplay || showsToDisplay.length === 0) return null;

    return (
      <div className="flex flex-col gap-4">
        {showsToDisplay.map(([genre, shows]) => (
          <div key={genre}>
            <h3 className="text-2xl font-bold mb-4">{genre}</h3>
            <div className="flex flex-row gap-4 overflow-x-scroll">
              {shows?.map((eachShow: Show) => (
                <Link href={`/show/${eachShow.id}`} key={eachShow.id}>
                  <Card {...eachShow} />
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
        <SearchInput searchText={searchText} handleUpdate={updateSearchResults} />
        {searchText ? renderSearchResults() : renderShowsByGenre()}
        <div
          ref={setObserverRef}
          className="h-16 w-full bg-transparent border-0"
        ></div>
      </div>
    </div>
  );
};
export default Home;
