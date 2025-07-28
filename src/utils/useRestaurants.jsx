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

  useEffect(() => {
    // Only try fetching once location is ready or fallback to default
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

    const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${latitude}&lng=${longitude}&carousel=true&third_party_vendor=1`;

    const proxyServices = [
      {
        name: "corsio",
        url: "https://corsproxy.io/?" + encodeURIComponent(swiggyUrl),
        headers: { Accept: "application/json" },
      },
      {
        name: "allorigins",
        url:
          "https://api.allorigins.win/raw?url=" + encodeURIComponent(swiggyUrl),
        headers: { Accept: "application/json" },
      },
      {
        name: "thingproxy",
        url: "https://thingproxy.freeboard.io/fetch/" + swiggyUrl,
        headers: {
          Accept: "application/json",
          Origin: "https://www.swiggy.com",
        },
      },
    ];

    const validateResponse = (json) => {
      if (!json || !json.data) throw new Error("Invalid response format");

      const restaurantsData =
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      if (!Array.isArray(restaurantsData) || restaurantsData.length === 0) {
        throw new Error("No restaurant data found");
      }

      return true;
    };

    const processData = (json) => {
      try {
        validateResponse(json);

        const carouselData = json?.data?.cards?.[0]?.card?.card || [];
        const title = json?.data?.cards?.[1]?.card?.card?.header?.title || "";
        const restaurantsData =
          json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];

        setCarouselItems(carouselData);
        setHeaderTitle(title);
        setRestaurants(restaurantsData);
        setOriginalRestaurants(restaurantsData);
        return true;
      } catch (err) {
        console.error("Response validation failed:", err);
        return false;
      }
    };

    const fetchWithTimeout = (resource, options = {}) => {
      const { timeout = 10000 } = options;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      return fetch(resource, {
        ...options,
        signal: controller.signal,
      }).finally(() => clearTimeout(id));
    };

    for (const proxy of proxyServices) {
      try {
        console.log(`Attempting to fetch with ${proxy.name}...`);
        const response = await fetchWithTimeout(proxy.url, {
          headers: proxy.headers,
          timeout: 5000,
        });

        if (!response.ok) {
          console.warn(`${proxy.name} returned status ${response.status}`);
          continue;
        }

        const data = await response.json();
        console.log(`Received data from ${proxy.name}, validating...`);

        if (processData(data)) {
          console.log(`Successfully loaded data using ${proxy.name}`);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error(`Error with ${proxy.name}:`, err.message);
      }
    }

    setError(
      `Failed to load restaurants after ${attempts} attempts. Please try again later.`
    );
    setIsLoading(false);
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
