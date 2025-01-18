import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons from react-icons
import CategoryItems from "./CategoryItems";

const RestaurantCategories = ({ title, itemCards, isOpen, setShowIndex }) => {
  const clickedItem = () => {
    setShowIndex();
  };

  return (
    <div>
      <div className="ml-2 my-5 p-5 bg-white rounded-lg shadow-lg">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={clickedItem}
        >
          <h1 className="font-bold text-lg text-gray-800">
            {title} ({itemCards.length})
          </h1>
          <span className="transition-transform">
            {isOpen ? (
              <FaChevronUp className="text-gray-600" /> // Upward arrow when open
            ) : (
              <FaChevronDown className="text-gray-600" /> // Downward arrow when closed
            )}
          </span>
        </div>

        {/* Conditionally render CategoryItems */}
        {isOpen && <CategoryItems itemCards={itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategories;
