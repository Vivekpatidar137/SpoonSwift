import { useState, useEffect } from "react";

const useRestaurantMenu = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantMenu, setRestaurantMenu] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);

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
    if (id) getRestaurantInfo();
  }, [id]);

  async function getRestaurantInfo() {
    setIsLoading(true);
    setError(null);
    setAttempts((prev) => prev + 1);

    const apiBaseUrl = getApiUrl();
    const apiUrl = `${apiBaseUrl}/restaurant-menu?id=${id}`;

    try {
      console.log("Fetching restaurant menu from Netlify Functions:", apiUrl);

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

      // Validate and process data
      if (
        !data ||
        !data.data ||
        !Array.isArray(data.data.cards) ||
        data.data.cards.length < 5
      ) {
        throw new Error("Invalid or incomplete menu data");
      }

      const info = data?.data?.cards?.[2]?.card?.card?.info;
      const menuCategories =
        data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      if (!info || !Array.isArray(menuCategories)) {
        throw new Error("Missing menu information or categories");
      }

      const categories = menuCategories.filter(
        (cat) =>
          cat.card.card["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

      setRestaurantMenu(info || {});
      setMenuItems(categories || []);
      setIsLoading(false);

      console.log(`Successfully loaded menu for ${info.name}`);
    } catch (err) {
      console.error("Error fetching restaurant menu:", err);
      setError(
        `Failed to load restaurant menu (Attempt ${attempts}): ${err.message}`
      );
      setRestaurantMenu({});
      setMenuItems([]);
      setIsLoading(false);
    }
  }

  const retryFetch = () => {
    if (!isLoading) getRestaurantInfo();
  };

  return {
    restaurantMenu,
    menuItems,
    isLoading,
    error,
    refetch: getRestaurantInfo,
    retry: retryFetch,
    attempts,
  };
};

export default useRestaurantMenu;
