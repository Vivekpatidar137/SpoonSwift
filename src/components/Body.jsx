import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import { ShimmerRestaurantCard } from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import useRestaurant from "../utils/useRestaurants";
import DishesCarousel from "./RestaurantsCarousel";

const Body = () => {
  const {
    headerTitle,
    originalRestaurants,
    restaurants,
    searchText,
    carouselItems,
    setRestaurants,
    setSearchText,
  } = useRestaurant();

  const RestaurantCardVeg = withVegLabel(RestaurantCard);
  const offline = useOnline();

  if (!offline) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <h1 className="text-center text-red-600 font-bold text-2xl mb-2">
          🔴 No Internet Connection
        </h1>
        <p className="text-center text-gray-700">
          Please check your internet connection and try again.
        </p>
        <button
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return !originalRestaurants.length ? (
    <ShimmerRestaurantCard />
  ) : (
    <>
      <div className="flex justify-center py-4">
        <input
          type="text"
          data-testid="searchInput"
          className="border p-2 rounded-l-md"
          placeholder="search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded-r-md"
          onClick={() => {
            const data = filterData(searchText, originalRestaurants);
            setRestaurants(data);
          }}
        >
          Search
        </button>
      </div>

      <div>
        <DishesCarousel {...carouselItems} />
      </div>

      <div className="max-w-screen-xl mx-auto pt-10 px-4 sm:px-6">
        <h1 className="text-xl sm:text-2xl font-bold">{headerTitle}</h1>
      </div>

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 place-items-center">
        {restaurants.map((restaurant) => {
          return (
            <Link
              to={"/restaurant/" + restaurant.info.id}
              key={restaurant.info.id}
            >
              {restaurant.info.veg ? (
                <RestaurantCardVeg {...restaurant.info} />
              ) : (
                <RestaurantCard {...restaurant.info} />
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Body;
