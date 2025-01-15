import { useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./config";
import { ShimmerMenu } from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategories from "./RestaurantCategories";

const RestaurantMenu = () => {
  const { id } = useParams();

  const { restaurantMenu, menuItems, isLoading } = useRestaurantMenu(id);
  const [showIndex, setShowIndex] = useState(0);
  if (isLoading) {
    return <ShimmerMenu />; // Show shimmer effect while loading
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="restaurant-details mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {restaurantMenu.name}
        </h1>
        <img
          src={IMG_CDN_URL + restaurantMenu.cloudinaryImageId}
          alt="Restaurant"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h4 className="text-lg text-gray-600 mb-2">
          {restaurantMenu?.costForTwoMessage}
        </h4>
        <h4 className="text-lg text-gray-600 mb-2">
          {restaurantMenu?.cuisines?.join(", ")}
        </h4>
        <h4 className="text-lg text-gray-600 mb-2">
          {restaurantMenu?.avgRating} Stars
        </h4>
        <h4 className="text-lg text-gray-600 mb-2">
          {restaurantMenu?.areaName}
        </h4>
        <h4 className="text-lg text-gray-600 mb-4">{restaurantMenu?.city}</h4>
      </div>

      <div className=" text-center">
        {menuItems?.length > 0 ? (
          menuItems.map((category, index) => {
            return (
              <div key={category?.card?.card?.title}>
                <RestaurantCategories
                  {...category?.card?.card}
                  isOpen={index === showIndex && true}
                  setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
                />
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">
            Menu not available for this restaurant.
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
