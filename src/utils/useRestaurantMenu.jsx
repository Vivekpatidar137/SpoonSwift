import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../components/config";

const useRestaurantMenu = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantMenu, setRestaurantMenu] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, [id]); // Added id dependency to re-fetch if id changes

  async function getRestaurantInfo() {
    setIsLoading(true);
    try {
      const swiggyUrl = FETCH_MENU_URL + id;

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
      setRestaurantMenu(json?.data?.cards?.[2]?.card?.card?.info || {});

      const categories =
        json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (category) =>
            category.card.card["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );

      setMenuItems(categories || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching restaurant menu:", err);
      setError("Failed to load restaurant menu. Please try again later.");
      setRestaurantMenu({});
      setMenuItems([]);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    restaurantMenu,
    menuItems,
    isLoading,
    error,
    refetch: getRestaurantInfo,
  };
};

export default useRestaurantMenu;
