import { useState, useEffect } from "react";

const useRestaurants = () => {
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRestaurant();
  }, []);

  async function getRestaurant() {
    setIsLoading(true);
    try {
      // First try with CORS Anywhere (requires temporary access)
      const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
      const swiggyUrl =
        "https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=19.0759837&lng=72.8776559&carousel=true&third_party_vendor=1";

      // Try multiple proxies in sequence if one fails
      let data;
      let json;

      try {
        // Try allorigins first
        data = await fetch(
          "https://api.allorigins.win/raw?url=" + encodeURIComponent(swiggyUrl),
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
          }
        );

        if (data.ok) {
          json = await data.json();
        } else {
          throw new Error("First proxy failed");
        }
      } catch (firstProxyError) {
        console.log("First proxy failed, trying thingproxy...");
        // Try thingproxy as fallback 
        data = await fetch(
          "https://thingproxy.freeboard.io/fetch/" + swiggyUrl,
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
          }
        );

        if (!data.ok) {
          throw new Error(`Failed to fetch: ${data.status}`);
        }

        json = await data.json();
      }

      // Process the data
      setCarouselItems(json?.data?.cards[0]?.card?.card || []);
      setHeaderTitle(json?.data?.cards[1]?.card?.card?.header?.title || "");
      const restaurantsData =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setRestaurants(restaurantsData || []);
      setOriginalRestaurants(restaurantsData || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching restaurant data:", err);
      setError("Failed to load restaurants. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

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
  };
};

export default useRestaurants;
