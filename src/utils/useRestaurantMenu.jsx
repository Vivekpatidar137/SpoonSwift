import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../components/config";

const useRestaurantMenu = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantMenu, setRestaurantMenu] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (id) getRestaurantInfo();
  }, [id]);

  async function getRestaurantInfo() {
    setIsLoading(true);
    setError(null);
    setAttempts((prev) => prev + 1);

    const swiggyUrl = FETCH_MENU_URL + id;

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

    const fetchWithTimeout = (resource, options = {}) => {
      const { timeout = 10000 } = options;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      return fetch(resource, {
        ...options,
        signal: controller.signal,
      }).finally(() => clearTimeout(id));
    };

    const validateResponse = (json) => {
      if (
        !json ||
        !json.data ||
        !Array.isArray(json.data.cards) ||
        json.data.cards.length < 5
      ) {
        throw new Error("Invalid or incomplete menu data");
      }

      const info = json?.data?.cards?.[2]?.card?.card?.info;
      const menuCategories =
        json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      if (!info || !Array.isArray(menuCategories)) {
        throw new Error("Missing menu information or categories");
      }

      return true;
    };

    const processData = (json) => {
      try {
        validateResponse(json);

        const info = json.data.cards[2].card.card.info;
        const categories =
          json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(
            (cat) =>
              cat.card.card["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          );

        setRestaurantMenu(info || {});
        setMenuItems(categories || []);
        return true;
      } catch (err) {
        console.error("Validation failed:", err);
        return false;
      }
    };

    for (const proxy of proxyServices) {
      try {
        console.log(`Trying ${proxy.name}...`);

        const response = await fetchWithTimeout(proxy.url, {
          headers: proxy.headers,
          timeout: 15000,
        });

        if (!response.ok) {
          console.warn(`${proxy.name} returned status ${response.status}`);
          continue;
        }

        const data = await response.json();
        if (processData(data)) {
          console.log(`Successfully fetched menu from ${proxy.name}`);
          setIsLoading(false);
          return;
        } else {
          console.warn(`${proxy.name} returned invalid data`);
        }
      } catch (err) {
        console.error(`Error using ${proxy.name}:`, err.message);
      }
    }

    // All proxies failed
    setError(
      `Failed to load restaurant menu after ${attempts} attempts. Please try again later.`
    );
    setRestaurantMenu({});
    setMenuItems([]);
    setIsLoading(false);
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
