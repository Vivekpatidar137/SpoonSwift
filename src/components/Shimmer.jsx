export const ShimmerRestaurantCard = () => {
  const shimmerItems = Array.from({ length: 6 }).map((_, index) => (
    <div
      key={index}
      className="flex-shrink-0 w-52 h-60 bg-gray-200 rounded-lg shadow-md animate-pulse"
    >
      <div className="w-full h-full bg-gray-300 rounded-lg"></div>
    </div>
  ));

  const shimmerCards = Array.from({ length: 8 }).map((_, index) => (
    <div
      key={index}
      className="w-72 border border-gray-200 rounded-lg bg-gray-100 shadow-md animate-pulse p-4"
    >
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-300 rounded-t-lg mb-4"></div>

      {/* Title Placeholder */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

      {/* Rating and Cost Placeholder */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
      </div>

      {/* Cuisines Placeholder */}
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  ));

  return (
    <div className="bg-gray-50 py-6">
      {/* Shimmer Carousel */}
      <div className="relative max-w-screen-xl mx-auto mb-10">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-300 rounded w-48"></div>
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {shimmerItems}
        </div>
      </div>

      {/* Shimmer Restaurant Cards */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 place-items-center">
        {shimmerCards}
      </div>
    </div>
  );
};

export const ShimmerMenu = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md animate-pulse">
      {/* Restaurant Details Shimmer */}
      <div className="mb-6">
        <div className="w-48 h-8 bg-gray-300 mb-4 rounded-md"></div>
        <div className="w-full h-64 bg-gray-200 rounded-md mb-4"></div>
        <div className="w-32 h-6 bg-gray-300 mb-2 rounded-md"></div>
        <div className="w-48 h-6 bg-gray-300 mb-2 rounded-md"></div>
        <div className="w-24 h-6 bg-gray-300 mb-2 rounded-md"></div>
        <div className="w-36 h-6 bg-gray-300 mb-4 rounded-md"></div>
      </div>

      {/* Accordion Menu Shimmer */}
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="p-5 bg-gray-200 rounded-lg shadow-md">
            {/* Accordion Header Shimmer */}
            <div className="flex justify-between items-center mb-2">
              <div className="w-48 h-6 bg-gray-300 rounded-md"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>

            {/* Accordion Items Shimmer */}
            <div className="space-y-4">
              {[...Array(2)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-start p-4 bg-gray-100 rounded-lg shadow"
                >
                  {/* Item Info Shimmer */}
                  <div className="flex-1 space-y-2 mr-6">
                    <div className="w-48 h-6 bg-gray-300 rounded-md"></div>
                    <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
                    <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
                    <div className="w-full h-12 bg-gray-200 rounded-md"></div>
                  </div>

                  {/* Item Image Shimmer */}
                  <div className="relative w-24 h-24 bg-gray-300 rounded-lg">
                    <div className="absolute top-2 right-2 w-12 h-6 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
