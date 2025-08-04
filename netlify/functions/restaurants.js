exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    // Get lat and lng from query parameters
    const { lat = "23.1793", lng = "75.7849" } =
      event.queryStringParameters || {};

    console.log(`Fetching restaurants for lat: ${lat}, lng: ${lng}`);

    const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${lat}&lng=${lng}&carousel=true&third_party_vendor=1`;

    // Fetch from Swiggy API
    const response = await fetch(swiggyUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Swiggy API returned ${response.status}`);
    }

    const data = await response.json();

    // Validate response
    const restaurantsData =
      data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    if (!Array.isArray(restaurantsData) || restaurantsData.length === 0) {
      throw new Error("No restaurant data found");
    }

    console.log(`Successfully fetched ${restaurantsData.length} restaurants`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching restaurants:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to fetch restaurants",
        message: error.message,
      }),
    };
  }
};
