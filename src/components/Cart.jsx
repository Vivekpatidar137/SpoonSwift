import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import CategoryItems from "./CategoryItems";
import { clearCart } from "../utils/cartSlice";
import CartTotal from "./CartTotal";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

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

  return (
    <motion.div
      className="container mx-auto mt-10 p-4"
      initial="hidden"
      animate="visible"
      variants={cartVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Cart ({totalItems} items)
          </h2>

          {cartItems.length === 0 ? (
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Your cart is empty.
            </motion.p>
          ) : (
            <>
              <motion.button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Cart
              </motion.button>

              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.card.info.id}
                      variants={itemVariants}
                      exit="exit"
                      layout // Smooth re-ordering
                    >
                      <CategoryItems itemCards={[item]} isCart={true} />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </>
          )}
        </div>

        <CartTotal cartItems={cartItems} />
      </div>
    </motion.div>
  );
};

export default Cart;
