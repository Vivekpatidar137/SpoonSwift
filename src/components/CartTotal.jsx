import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Confetti from "react-confetti";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearCart } from "../utils/cartSlice";

const CartTotal = ({ cartItems, onCheckoutComplete }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.card.info.price || item.card.info.defaultPrice;
      return total + price * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning(
        "Your cart is empty. Add items before proceeding to checkout!",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        }
      );
      return;
    }

    // Show confetti
    setShowConfetti(true);

    // Trigger the success message
    toast.success(
      "🎉 Your order is successful! Thank you for shopping with us!",
      {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
      }
    );

    // Dispatch action to clear the cart
    dispatch(clearCart());

    // Notify parent component
    onCheckoutComplete && onCheckoutComplete();

    // Hide confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <div className="w-full relative">
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
        <button
          onClick={handleCheckout}
          className="w-full mt-6 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Confetti animation */}
      {showConfetti && <Confetti />}

      {/* Toast container with fixed positioning */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10000,
        }}
        toastStyle={{
          marginTop: "20px",
          zIndex: 10000,
        }}
      />
    </div>
  );
};

export default CartTotal;
