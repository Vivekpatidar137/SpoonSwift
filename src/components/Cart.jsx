import { useSelector, useDispatch } from "react-redux";
import CategoryItems from "./CategoryItems";
import { clearCart, removeItem } from "../utils/cartSlice";
import CartTotal from "./CartTotal";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Cart ({totalItems} items)
          </h2>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryItems
                  itemCards={cartItems}
                  isCart={true}
                  onRemove={(itemId) => dispatch(removeItem(itemId))}
                />
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-xl mx-auto">
          <CartTotal cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
