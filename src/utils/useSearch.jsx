import { useState, useEffect } from "react";
import useGeoLocation from "./useGeoLocation";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [activeTab, setActiveTab] = useState("DISH");

  const { lat, lng } = useGeoLocation();
  const defaultLat = 23.1793;
  const defaultLng = 75.7849;

  const getApiUrl = () => {
    if (
      typeof window !== "undefined" &&
      window.location.hostname === "localhost"
    ) {
      return "http://localhost:8888/.netlify/functions";
    }
    return "https://spoonswift-api.netlify.app/.netlify/functions";
  };

  useEffect(() => {
    setRecentSearches([]);
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    setIsLoadingSuggestions(true);
    setError(null);

    const latitude = lat || defaultLat;
    const longitude = lng || defaultLng;
    const apiBaseUrl = getApiUrl();
    const apiUrl = `${apiBaseUrl}/search-suggestions?lat=${latitude}&lng=${longitude}&str=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`API error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || "API returned an error");
      }

      setSuggestions(data?.data?.suggestions || []);
      setIsLoadingSuggestions(false);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setError(`Failed to load suggestions: ${err.message}`);
      setSuggestions([]);
      setIsLoadingSuggestions(false);
    }
  };

  const performSearch = async (
    query,
    metadata = "",
    queryUniqueId = "",
    submitAction = "ENTER"
  ) => {
    setIsLoadingResults(true);
    setError(null);
    setSearchResults(null);

    const latitude = lat || defaultLat;
    const longitude = lng || defaultLng;
    const apiBaseUrl = getApiUrl();

    let apiUrl = `${apiBaseUrl}/search-results?lat=${latitude}&lng=${longitude}&str=${encodeURIComponent(
      query
    )}&submitAction=${submitAction}`;

    if (queryUniqueId) {
      apiUrl += `&queryUniqueId=${queryUniqueId}`;
    }

    if (metadata) {
      apiUrl += `&metaData=${encodeURIComponent(metadata)}`;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`API error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || "API returned an error");
      }

      setSearchResults(data);
      setIsLoadingResults(false);
      addToRecentSearches(query);
    } catch (err) {
      console.error("Error performing search:", err);
      setError(`Failed to load search results: ${err.message}`);
      setSearchResults(null);
      setIsLoadingResults(false);
    }
  };

  const addToRecentSearches = (query) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q !== query);
      return [query, ...filtered].slice(0, 5);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const handleSuggestionClick = (suggestion) => {
    const metadata = suggestion.metadata || "";
    const queryUniqueId = suggestion.queryUniqueId || "";

    setSearchQuery(suggestion.text);
    setSuggestions([]);
    performSearch(suggestion.text, metadata, queryUniqueId, "SUGGESTION");
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      setSuggestions([]);
      performSearch(searchQuery, "", "", "ENTER");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setSearchResults(null);
    setError(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    suggestions,
    searchResults,
    isLoadingSuggestions,
    isLoadingResults,
    error,
    recentSearches,
    activeTab,
    setActiveTab,
    handleSuggestionClick,
    handleSearchSubmit,
    clearSearch,
    clearRecentSearches,
  };
};

export default useSearch;
