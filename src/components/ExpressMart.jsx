const ExpressMart = () => {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">
          Express🛵Mart🛒
        </h1>
        <h3 className="text-lg text-gray-700 mb-6 text-center">
          Need groceries ASAP? ExpressMart is your go-to app for lightning-fast
          delivery. With just a few taps, you can order everything from fresh
          produce to pantry staples and have them delivered right to your
          doorstep in minutes. Enjoy the convenience of shopping from the comfort
          of your home and never worry about running out of essentials again.
        </h3>
  
        <h2 className="text-2xl font-semibold text-indigo-500 mb-2">
          Features:
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
          <li>
            <strong className="font-medium">Real-Time Tracking:</strong> Track
            your delivery in real-time and know exactly when your order will
            arrive.
          </li>
          <li>
            <strong className="font-medium">Wide Range of Products:</strong> From
            fresh fruits and vegetables to dairy, bakery, and household
            essentials, we've got you covered.
          </li>
          <li>
            <strong className="font-medium">Express Checkout:</strong> Save time
            with our quick and easy checkout process.
          </li>
          <li>
            <strong className="font-medium">Instant Discounts:</strong> Avail
            exclusive discounts and offers on your favorite brands.
          </li>
          <li>
            <strong className="font-medium">Multiple Payment Options:</strong>{" "}
            Choose from various payment methods including credit/debit cards, UPI,
            and cash on delivery.
          </li>
          <li>
            <strong className="font-medium">24/7 Availability:</strong> Order
            anytime, anywhere with our round-the-clock service.
          </li>
        </ul>
  
        <h2 className="text-2xl font-semibold text-indigo-500 mb-2">
          How It Works:
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
          <li>Browse through our extensive range of products.</li>
          <li>Add items to your cart with just a tap.</li>
          <li>Select your preferred delivery time.</li>
          <li>Complete your purchase with our express checkout.</li>
          <li>Sit back and relax while we deliver your order in minutes.</li>
        </ol>
  
        <h2 className="text-2xl font-semibold text-indigo-500 mb-2">
          Customer Testimonials:
        </h2>
        <div className="space-y-4 mb-6">
          <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-600">
            "ExpressMart has changed the way I shop for groceries. The speed and
            convenience are unmatched!"
          </blockquote>
          <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-600">
            "I love how I can track my order in real-time and the delivery is
            always on point."
          </blockquote>
        </div>
  
        <h2 className="text-2xl font-semibold text-indigo-500 mb-2">
          Contact Us:
        </h2>
        <p className="text-gray-700">
          Have any questions or need help with your order? Reach out to our
          customer support team available 24/7.
        </p>
      </div>
    );
  };
  
  export default ExpressMart;
  