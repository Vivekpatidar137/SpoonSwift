import { useRef } from "react";
import { IMG_CDN_URL } from "./config";

const DishesCarousel  = ({ imageGridCards, header }) => {
  const carouselRef = useRef(null);
  const carouselImages = imageGridCards.info;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 py-6">
      <div className="relative max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-gray-900">{header.title}</h1>
          <div className="flex gap-2">
            <button
              className="bg-gray-800 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 transition-colors"
              onClick={scrollLeft}
              aria-label="Scroll Left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 14.707a1 1 0 010-1.414L9.414 10l3.293-3.293a1 1 0 00-1.414-1.414l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className="bg-gray-800 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 transition-colors"
              onClick={scrollRight}
              aria-label="Scroll Right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {carouselImages.map((carouselImage) => (
            <div
              key={carouselImage.id}
              className="flex-shrink-0 w-52 h-60 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={IMG_CDN_URL + carouselImage.imageId}
                alt="carousel-item"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishesCarousel;
