import { useState, useEffect } from "react";
import useGeoLocation from "./useGeoLocation";

const useRestaurants = () => {
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const { lat, lng, loading: geoLoading, error: geoError } = useGeoLocation();

  const defaultLat = 23.1793;
  const defaultLng = 75.7849;

  // Get API URL based on environment
  const getApiUrl = () => {
    // For local development with netlify dev
    if (
      typeof window !== "undefined" &&
      window.location.hostname === "localhost"
    ) {
      return "http://localhost:8888/.netlify/functions";
    }
    // For production - my actual Netlify functions URL
    return "https://spoonswift-api.netlify.app/.netlify/functions";
  };

  useEffect(() => {
    if (!geoLoading) {
      getRestaurant();
    }
  }, [geoLoading, lat, lng]);

  async function getRestaurant() {
    setIsLoading(true);
    setError(null);
    setAttempts((prev) => prev + 1);

    const latitude = lat || defaultLat;
    const longitude = lng || defaultLng;
    const apiBaseUrl = getApiUrl();
    const apiUrl = `${apiBaseUrl}/restaurants?lat=${latitude}&lng=${longitude}`;

    try {
      console.log("Fetching restaurants from Netlify Functions:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Response Error:", errorText);
        throw new Error(`API error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if API returned an error
      if (data.error) {
        throw new Error(data.message || "API returned an error");
      }

      // Process the data
      const carouselData = data?.data?.cards?.[0]?.card?.card || [];
      const title = data?.data?.cards?.[1]?.card?.card?.header?.title || "";
      const restaurantsData =
        data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      if (!Array.isArray(restaurantsData) || restaurantsData.length === 0) {
        throw new Error("No restaurant data found");
      }

      setCarouselItems(carouselData);
      setHeaderTitle(title);
      setRestaurants(restaurantsData);
      setOriginalRestaurants(restaurantsData);
      setIsLoading(false);

      console.log(`Successfully loaded ${restaurantsData.length} restaurants`);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError(
        `Failed to load restaurants (Attempt ${attempts}): ${err.message}`
      );
      setIsLoading(false);
    }
  }

  const retryFetch = () => {
    if (!isLoading) getRestaurant();
  };

  return {
    headerTitle,
    originalRestaurants,
    restaurants,
    searchText,
    carouselItems,
    isLoading: isLoading || geoLoading,
    error: geoError || error,
    setSearchText,
    setRestaurants,
    refetch: getRestaurant,
    retry: retryFetch,
    attempts,
  };
};

export default useRestaurants;
