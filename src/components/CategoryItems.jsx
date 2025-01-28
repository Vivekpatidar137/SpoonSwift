import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "./config";
import {
  addItems,
  increaseQuantity,
  decreaseQuantity,
} from "../utils/cartSlice";

const CategoryItems = ({ itemCards, isCart, onRemove }) => {
  const dispatch = useDispatch();

  const handleItems = (items) => {
    dispatch(addItems(items));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <div className="mt-4 space-y-8">
      {itemCards.map((items) => {
        const item = items?.card?.info;
        const itemInCart = isCart ? items : null; // Check if the item is in the cart

        return (
          <div
            data-testid="categoryItems"
            className="flex justify-between items-start p-6 bg-slate-100 rounded-lg shadow-lg"
            key={item.id}
          >
            {/* Item info */}
            <div className="flex-1 mr-6 text-left">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h2>
              {item.price ? (
                <h2 className="text-lg text-gray-900 font-bold mt-2">
                  ₹{item.price / 100}
                </h2>
              ) : (
                <h2 className="text-lg text-gray-900 font-bold mt-2">
                  ₹{item.defaultPrice / 100}
                </h2>
              )}
              {item.ratings?.aggregatedRating?.rating && (
                <h4 className="text-md text-green-600 font-medium mt-2">
                  {item.ratings.aggregatedRating.rating} ★ (
                  {item.ratings.aggregatedRating.ratingCountV2})
                </h4>
              )}
              {item.description && (
                <p className="text-md text-gray-600 mt-4">{item.description}</p>
              )}
            </div>

            {/* Item image or action buttons */}
            <div className="relative ml-6 w-40 h-40 flex-shrink-0 flex items-center justify-center">
              {item.imageId ? (
                <>
                  <img
                    className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                    src={IMG_CDN_URL + item.imageId}
                    alt={item.name}
                  />
                  {isCart ? (
                    /* Quantity selector for cart */
                    <div className="absolute top-2 right-2 bg-white rounded-full shadow-md flex items-center">
                      <button
                        className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-l-full"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="px-2 text-sm font-semibold">
                        {itemInCart?.quantity || 0}
                      </span>
                      <button
                        className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-r-full"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    /* ADD button for other views */
                    <button
                      className="absolute top-2 right-2 bg-green-600 text-white text-sm px-4 py-1 rounded-full shadow-md hover:bg-green-700"
                      onClick={() => handleItems(items)}
                    >
                      ADD
                    </button>
                  )}
                </>
              ) : (
                /* Centered button if no image */
                <button
                  className={`w-24 h-10 ${
                    isCart ? "bg-red-600" : "bg-green-600"
                  } text-white text-lg font-semibold rounded-lg shadow-md hover:${
                    isCart ? "bg-red-700" : "bg-green-700"
                  } flex items-center justify-center`}
                  onClick={() =>
                    isCart ? onRemove(item.id) : handleItems(items)
                  }
                >
                  {isCart ? "REMOVE" : "ADD"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryItems;
