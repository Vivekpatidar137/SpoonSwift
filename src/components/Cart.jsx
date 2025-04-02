import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import CategoryItems from "./CategoryItems";
import { clearCart } from "../utils/cartSlice";
import CartTotal from "./CartTotal";
import { useState } from "react";

const EmptyCartIllustration = () => (
  <svg
    width="300"
    height="200"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto mb-6"
  >
    <path
      d="M176 176C185.6 176 192.8 168.8 192.8 159.2C192.8 149.6 185.6 142.4 176 142.4H108.8C99.2 142.4 92 149.6 92 159.2C92 168.8 99.2 176 108.8 176H176ZM176 176H400C409.6 176 416.8 183.2 416.8 192.8C416.8 202.4 409.6 209.6 400 209.6H176C166.4 209.6 159.2 202.4 159.2 192.8C159.2 183.2 166.4 176 176 176ZM176 209.6H400C409.6 209.6 416.8 216.8 416.8 226.4C416.8 236 409.6 243.2 400 243.2H176C166.4 243.2 159.2 236 159.2 226.4C159.2 216.8 166.4 209.6 176 209.6ZM176 243.2H400C409.6 243.2 416.8 250.4 416.8 260C416.8 269.6 409.6 276.8 400 276.8H176C166.4 276.8 159.2 269.6 159.2 260C159.2 250.4 166.4 243.2 176 243.2ZM108.8 276.8H176C185.6 276.8 192.8 269.6 192.8 260C192.8 250.4 185.6 243.2 176 243.2H108.8C99.2 243.2 92 250.4 92 260C92 269.6 99.2 276.8 108.8 276.8Z"
      fill="#E5E7EB"
    />
    <path
      d="M416 352L384 96H128L96 352H416Z"
      stroke="#9CA3AF"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M160 416C160 433.673 174.327 448 192 448C209.673 448 224 433.673 224 416M352 416C352 433.673 366.327 448 384 448C401.673 448 416 433.673 416 416"
      stroke="#9CA3AF"
      strokeWidth="16"
      strokeLinecap="round"
    />
    <path
      d="M320 176L304 96M256 176L272 96M192 176L208 96"
      stroke="#9CA3AF"
      strokeWidth="8"
      strokeLinecap="round"
    />
  </svg>
);

const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center py-12"
  >
    <EmptyCartIllustration />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Your cart is empty
    </h3>
    <p className="text-gray-500 mb-6 text-center max-w-md">
      Looks like you haven't added anything to your cart yet. Let's get some
      delicious food in here!
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2 bg-amber-500 text-white rounded-full shadow-md hover:bg-amber-600 transition-colors"
      onClick={() => (window.location.href = "/")}
    >
      Browse Restaurants
    </motion.button>
  </motion.div>
);

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Animation variants
  const cartVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const handleCheckoutComplete = () => {
    setShowCheckoutSuccess(true);
    setTimeout(() => setShowCheckoutSuccess(false), 5000);
  };

  return (
    <motion.div
      className="container mx-auto mt-10 p-4"
      initial="hidden"
      animate="visible"
      variants={cartVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md min-h-[500px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Cart {totalItems > 0 && `(${totalItems} items)`}
          </h2>

          {cartItems.length === 0 && !showCheckoutSuccess ? (
            <EmptyCart />
          ) : (
            <>
              {totalItems > 0 && (
                <motion.button
                  onClick={handleClearCart}
                  className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out mb-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Cart
                </motion.button>
              )}

              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.card.info.id}
                      variants={itemVariants}
                      exit="exit"
                      layout
                    >
                      <CategoryItems itemCards={[item]} isCart={true} />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Always render CartTotal but control its visibility */}
        <div
          className={`bg-gray-50 p-6 rounded-lg shadow-md h-fit sticky top-4 ${
            showCheckoutSuccess ? "block" : totalItems > 0 ? "block" : "hidden"
          }`}
        >
          <CartTotal
            cartItems={cartItems}
            onCheckoutComplete={handleCheckoutComplete}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
