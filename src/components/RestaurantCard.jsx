import { IMG_CDN_URL } from "./config";
import label from "/src/myAssets/veg.png";

const RestaurantCard = ({
  name,
  cloudinaryImageId,
  avgRatingString,
  cuisines,
  costForTwo,
}) => {
  return (
    <div
      data-testid="resCard"
      className="w-72 border border-gray-200 rounded-lg bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-lg m-4"
    >
      {/* Image Section */}
      <img
        src={IMG_CDN_URL + cloudinaryImageId}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Content Section */}
      <div className="p-5">
        <h2 className="text-lg font-semibold truncate">{name}</h2>
        <div className="flex items-center justify-between mt-2">
          {/* Rating Section */}
          <span className="flex items-center bg-green-600 text-white text-sm font-medium px-2 py-1 rounded">
            ⭐ {avgRatingString}
          </span>
          <span className="text-sm text-gray-600">{costForTwo}</span>
        </div>
        <p className="text-sm text-gray-500 mt-3 leading-tight truncate">
          {cuisines?.join(", ")}
        </p>
      </div>
    </div>
  );
};

export const withVegLabel = (RestaurantCard) => {
  return (props) => (
    <div className="relative">
      {/* Veg Label */}
      <label className="absolute top-3 left-3 z-10">
        <img
          src={label}
          alt="veg label"
          className="w-7 h-7 bg-white p-1 rounded-full shadow-sm"
        />
      </label>
      <RestaurantCard {...props} />
    </div>
  );
};

export default RestaurantCard;
