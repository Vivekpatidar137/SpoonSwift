exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const {
      lat = "23.1793",
      lng = "75.7849",
      str = "",
      trackingId = "undefined",
      queryUniqueId = "",
      metaData = "",
      submitAction = "ENTER",
    } = event.queryStringParameters || {};

    if (!str || str.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Search string is required" }),
      };
    }

    console.log(`Fetching search results for: ${str}`);

    let swiggyUrl = `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${encodeURIComponent(
      str
    )}&trackingId=${trackingId}&submitAction=${submitAction}`;

    if (queryUniqueId) {
      swiggyUrl += `&queryUniqueId=${queryUniqueId}`;
    }

    if (metaData) {
      swiggyUrl += `&metaData=${encodeURIComponent(metaData)}`;
    }

    const response = await fetch(swiggyUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
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

    if (!data || !data.data) {
      throw new Error("Invalid search results data");
    }

    console.log(`Successfully fetched search results for: ${str}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching search results:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to fetch search results",
        message: error.message,
      }),
    };
  }
};
