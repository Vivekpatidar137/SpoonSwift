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
    // Get restaurant ID from query parameters
    const { id } = event.queryStringParameters || {};

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Restaurant ID is required" }),
      };
    }

    console.log(`Fetching menu for restaurant ID: ${id}`);

    const swiggyUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.1793&lng=75.7849&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

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
    if (
      !data ||
      !data.data ||
      !Array.isArray(data.data.cards) ||
      data.data.cards.length < 5
    ) {
      throw new Error("Invalid or incomplete menu data");
    }

    const info = data?.data?.cards?.[2]?.card?.card?.info;
    const menuCategories =
      data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    if (!info || !Array.isArray(menuCategories)) {
      throw new Error("Missing menu information or categories");
    }

    console.log(`Successfully fetched menu for ${info.name}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching restaurant menu:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to fetch restaurant menu",
        message: error.message,
      }),
    };
  }
};
