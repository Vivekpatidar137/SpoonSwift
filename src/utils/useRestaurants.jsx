import { useState, useEffect } from "react";

const useRestaurants = () => {
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    getRestaurant();
  }, []);

  async function getRestaurant() {
    setIsLoading(true);
    setError(null);
    setAttempts((prev) => prev + 1);

    const swiggyUrl =
      "https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=19.0759837&lng=72.8776559&carousel=true&third_party_vendor=1";

    // Updated proxy services with backup options
    const proxyServices = [
      {
        name: "corsio",
        url: "https://corsproxy.io/?" + encodeURIComponent(swiggyUrl),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json",
          Referer: "https://www.swiggy.com/",
        },
      },
      {
        name: "allorigins",
        url:
          "https://api.allorigins.win/raw?url=" + encodeURIComponent(swiggyUrl),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
      },
      {
        name: "thingproxy",
        url: "https://thingproxy.freeboard.io/fetch/" + swiggyUrl,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json",
          Origin: "https://www.swiggy.com",
        },
      },
    ];

    // Function to validate response data is actually valid and contains restaurants
    const validateResponse = (json) => {
      if (!json || !json.data) {
        throw new Error("Invalid response format");
      }

      const restaurantsData =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      if (
        !restaurantsData ||
        !Array.isArray(restaurantsData) ||
        restaurantsData.length === 0
      ) {
        throw new Error("No restaurant data found in response");
      }

      return true;
    };

    // Helper function to process successful response
    const processData = (json) => {
      try {
        // Validate the response first
        validateResponse(json);

        // If validation passed, process the data
        const carouselData = json?.data?.cards[0]?.card?.card || [];
        const title = json?.data?.cards[1]?.card?.card?.header?.title || "";
        const restaurantsData =
          json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];

        console.log(
          `Found ${restaurantsData.length} restaurants in the response`
        );

        setCarouselItems(carouselData);
        setHeaderTitle(title);
        setRestaurants(restaurantsData);
        setOriginalRestaurants(restaurantsData);
        return true;
      } catch (validationError) {
        console.error("Response validation failed:", validationError);
        return false;
      }
    };

    // Function to fetch with timeout
    const fetchWithTimeout = (resource, options = {}) => {
      const { timeout = 10000 } = options;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      return fetch(resource, {
        ...options,
        signal: controller.signal,
      }).finally(() => clearTimeout(id));
    };

    // Try each proxy service
    for (const proxy of proxyServices) {
      try {
        console.log(`Attempting to fetch with ${proxy.name}...`);

        const response = await fetchWithTimeout(proxy.url, {
          headers: proxy.headers,
          timeout: 15000, // Increased timeout
        });

        if (!response.ok) {
          console.warn(`${proxy.name} returned status ${response.status}`);
          continue; // Try next proxy
        }

        const data = await response.json();
        console.log(`Received response from ${proxy.name}, validating data...`);

        if (processData(data)) {
          console.log(
            `Successfully loaded restaurant data using ${proxy.name}`
          );
          setIsLoading(false);
          return; // Exit after successful processing
        } else {
          console.warn(`${proxy.name} returned invalid data structure`);
        }
      } catch (err) {
        console.error(`Error with ${proxy.name}:`, err.message);
        // Continue to next proxy
      }
    }

    // If we reach here, all proxies failed
    console.error("All proxy attempts failed");
    setError(
      `Failed to load restaurants after ${attempts} attempts. Please try again later.`
    );
    setIsLoading(false);
  }

  // Function to manually retry
  const retryFetch = () => {
    if (!isLoading) {
      getRestaurant();
    }
  };

  return {
    headerTitle,
    originalRestaurants,
    restaurants,
    searchText,
    carouselItems,
    isLoading,
    error,
    setSearchText,
    setRestaurants,
    refetch: getRestaurant,
    retry: retryFetch,
    attempts,
  };
};

export default useRestaurants;
