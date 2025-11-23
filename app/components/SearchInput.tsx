const SearchInput = ({ handleUpdate, searchText }: { handleUpdate: (query: string) => void, searchText: string }) => {
  return (
    <div
      role="search"
      className="flex align-center gap-6 rounded-md border-transparent px-1 py-2 md:w-[60%] max-w-full bg-gray-100 width-full"
    >
      <input
        onChange={(e) => handleUpdate(e.currentTarget?.value)}
        onInput={(e) => handleUpdate(e.currentTarget?.value)}
        name="search-input"
        type="search"
        value={searchText}
        aria-label="Search shows"
        placeholder="Search for shows..."
        className="border-none outline-none bg-white w-full text-base text-black p-4 leading-none rounded-md mb-8"
      />
    </div>
  );
};

export default SearchInput;
