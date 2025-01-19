import { useSelector, useDispatch } from "react-redux";
import CategoryItems from "./CategoryItems";
import { clearCart, removeItem } from "../utils/cartSlice";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId)); // Remove the item with the given id
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out mb-4"
            >
              Clear Cart
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CategoryItems
                itemCards={cartItems}
                isCart={true} // Indicate this is for the cart
                onRemove={handleRemoveItem} // Pass the remove function
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
