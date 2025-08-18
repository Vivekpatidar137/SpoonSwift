import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "./config";
import { FaCheck } from "react-icons/fa";
import {
  addItems,
  increaseQuantity,
  decreaseQuantity,
} from "../utils/cartSlice";

const CategoryItems = ({ itemCards, isCart }) => {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState({});

  const handleItems = (items) => {
    dispatch(addItems(items));
    setAddedItems((prev) => ({ ...prev, [items.card.info.id]: true }));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="mt-4 space-y-8">
      {itemCards.map((items) => {
        const item = items?.card?.info;
        const itemInCart = isCart ? items : null;
        const isAdded = addedItems[item.id];

        return (
          <motion.div
            key={item.id}
            data-testid="categoryItems"
            className="flex justify-between items-start p-6 bg-slate-100 rounded-lg shadow-lg"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            {/* Item info */}
            <div className="flex-1 mr-6 text-left">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h2>
              {item.price || item.defaultPrice ? (
                <h2 className="text-lg text-gray-900 font-bold mt-2">
                  ₹{(item.price || item.defaultPrice) / 100}
                </h2>
              ) : null}
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

            {/* Image or Button */}
            <div className="relative ml-6 w-40 h-40 flex-shrink-0 flex items-center justify-center">
              {item.imageId ? (
                <>
                  <img
                    className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                    src={IMG_CDN_URL + item.imageId}
                    alt={item.name}
                  />
                  {isCart ? (
                    <motion.div
                      className="absolute top-2 right-2 bg-white rounded-full shadow-md flex items-center"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
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
                    </motion.div>
                  ) : (
                    <motion.button
                      className={`absolute top-2 right-2 text-sm px-4 py-1 rounded-full shadow-md flex items-center justify-center gap-2 ${
                        isAdded
                          ? "bg-gray-600 text-white pointer-events-none"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                      onClick={() => handleItems(items)}
                      variants={buttonVariants}
                      whileHover={!isAdded ? "hover" : {}}
                      whileTap={!isAdded ? "tap" : {}}
                    >
                      {isAdded ? (
                        <>
                          <FaCheck className="inline-block animate-bounce" />
                          <span>Added</span>
                        </>
                      ) : (
                        "ADD"
                      )}
                    </motion.button>
                  )}
                </>
              ) : (
                // Fallback for no image
                <div className="w-full flex flex-col items-center justify-center">
                  {!itemInCart ? (
                    <motion.button
                      className={`w-full py-2 px-4 text-lg rounded-md font-semibold ${
                        isAdded
                          ? "bg-gray-600 text-white pointer-events-none"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                      onClick={() => handleItems(items)}
                      variants={buttonVariants}
                      whileHover={!isAdded ? "hover" : {}}
                      whileTap={!isAdded ? "tap" : {}}
                    >
                      {isAdded ? (
                        <div className="flex items-center justify-center gap-2">
                          <FaCheck className="animate-bounce" />
                          <span>Added</span>
                        </div>
                      ) : (
                        "ADD"
                      )}
                    </motion.button>
                  ) : (
                    <motion.div
                      className="flex justify-center items-center space-x-4"
                      variants={buttonVariants}
                    >
                      <button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 text-xl"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="px-4 text-lg font-semibold">
                        {itemInCart?.quantity || 0}
                      </span>
                      <button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 text-xl"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CategoryItems;
