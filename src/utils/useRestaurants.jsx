import { useState, useEffect } from "react";

const useRestaurants = () => {
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getRestaurant();
  }, []);

  async function getRestaurant() {
    const data = await fetch(
      "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=19.0759837&lng=72.8776559&carousel=true&third_party_vendor=1"
    );

    const json = await data.json();
    setCarouselItems(json?.data?.cards[0]?.card?.card || []);

    setHeaderTitle(json?.data?.cards[1]?.card?.card?.header?.title || "");
    const restaurantsData =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setRestaurants(restaurantsData || []);
    setOriginalRestaurants(restaurantsData || []);
  }

  return {
    headerTitle,
    originalRestaurants,
    restaurants,
    searchText,
    carouselItems,
    setSearchText,
    setRestaurants,
  };
};

export default useRestaurants;
