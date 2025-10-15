import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX, FiClock, FiTrendingUp } from "react-icons/fi";
import { IMG_CDN_URL } from "./config";
import useSearch from "../utils/useSearch";
import SearchResults from "./SearchResults";
import { SearchShimmer } from "./Shimmer";

const Search = () => {
  const {
    searchQuery,
    setSearchQuery,
    suggestions,
    searchResults,
    isLoadingSuggestions,
    isLoadingResults,
    error,
    recentSearches,
    handleSuggestionClick,
    handleSearchSubmit,
    clearSearch,
    clearRecentSearches,
  } = useSearch();

  const [inputFocused, setInputFocused] = useState(false);

  const showSuggestions =
    inputFocused && (suggestions.length > 0 || recentSearches.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Search Header Section */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md">
              <FiSearch className="text-gray-400 text-xl ml-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setTimeout(() => setInputFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                    setInputFocused(false);
                  }
                }}
                placeholder="Search for restaurants, dishes, cuisines..."
                className="flex-1 bg-transparent px-4 py-4 outline-none text-gray-700 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="p-2 mr-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <FiX className="text-gray-500 text-xl" />
                </button>
              )}
              <button
                onClick={() => {
                  handleSearchSubmit();
                  setInputFocused(false);
                }}
                disabled={!searchQuery.trim()}
                className="bg-orange-500 text-white px-6 py-4 rounded-r-xl hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Search
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto z-50">
                {/* Recent Searches */}
                {recentSearches.length > 0 && !searchQuery && (
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                        <FiClock className="mr-2" />
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSearchQuery(search)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center text-gray-600"
                      >
                        <FiClock className="mr-3 text-gray-400" />
                        {search}
                      </button>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="p-2">
                    {isLoadingSuggestions && (
                      <div className="text-center py-4 text-gray-400">
                        Loading suggestions...
                      </div>
                    )}
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-orange-50 rounded-lg transition-all duration-150 flex items-center justify-between group"
                      >
                        <div className="flex items-center flex-1">
                          {suggestion.cloudinaryId && (
                            <img
                              src={IMG_CDN_URL + suggestion.cloudinaryId}
                              alt={suggestion.text}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span
                                className="text-gray-800 font-medium"
                                dangerouslySetInnerHTML={{
                                  __html: suggestion.highlightedText
                                    ?.replace(
                                      /{{/g,
                                      '<span class="text-orange-500 font-bold">'
                                    )
                                    .replace(/}}/g, "</span>"),
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  suggestion.type === "DISH"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {suggestion.type === "DISH"
                                  ? "Dish"
                                  : "Restaurant"}
                              </span>
                              {suggestion.subCategory && (
                                <span className="text-xs text-gray-500">
                                  {suggestion.subCategory}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <FiTrendingUp className="text-gray-300 group-hover:text-orange-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoadingResults ? (
          <SearchShimmer />
        ) : searchResults ? (
          <SearchResults
            searchResults={searchResults}
            searchQuery={searchQuery}
          />
        ) : (
          <EmptySearchState />
        )}
      </div>
    </div>
  );
};

const EmptySearchState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-64 h-64 mb-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
          alt="Search for food"
          className="w-full h-full object-contain"
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Search for Delicious Food
      </h2>
      <p className="text-gray-500 text-center max-w-md">
        Discover restaurants, dishes, and cuisines. Start typing to see
        suggestions!
      </p>
      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        {["Pizza", "Burger", "Biryani", "Chinese", "Sweets"].map((term) => (
          <span
            key={term}
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-500 hover:text-orange-500 cursor-pointer transition-all"
          >
            {term}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Search;
