const CartTotal = ({ cartItems }) => {
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.card.info.price || item.card.info.defaultPrice;
      return total + price;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="w-full">
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
        <p className="text-gray-600 mb-6">
          Your total amount includes all taxes and fees. You can proceed to
          checkout or continue shopping for more items.
        </p>
        <div className="border-t border-gray-300 pt-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Total Amount:
          </h4>
          <h2 className="text-md font-semibold">₹{totalPrice / 100}</h2>
        </div>
        <button className="w-full mt-6 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
