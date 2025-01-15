const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-gray-600 mb-4">
        Welcome to SpoonSwift, your go-to app for discovering the best
        restaurants around you. Our mission is to make food discovery and
        ordering simple, fun, and personalized. Whether you're in the mood for
        a quick bite or a gourmet experience, we have something for everyone.
      </p>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Our Story</h2>
      <p className="text-gray-600 mb-4">
        Founded in 2024, SpoonSwift started with a simple idea: to connect
        people with great food. Over the years, we've grown from a small
        startup to a leading platform in the food-tech industry. Our dedicated
        team works tirelessly to bring you the best dining experiences, all at
        your fingertips.
      </p>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">What We Offer</h2>
      <ul className="list-disc pl-5 mb-4 text-gray-600">
        <li>Wide variety of cuisines from local restaurants</li>
        <li>Personalized recommendations based on your taste</li>
        <li>Easy and secure payment options</li>
        <li>Exclusive deals and discounts</li>
      </ul>
      <p className="text-gray-600">
        Join us on this delicious journey and explore a world of flavors with
        SpoonSwift!
      </p>
    </div>
  );
};

export default About;
