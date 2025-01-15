import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Title = () => {
  return (
    <a
      href="/"
      className="flex items-center text-white hover:text-yellow-400 transition-all duration-200"
    >
      <img
        src="https://www.creativefabrica.com/wp-content/uploads/2020/02/11/Food-Logo-Graphics-1-71-580x386.jpg"
        alt="Logo"
        className="w-14 h-14 mr-4 rounded-full"
      />
      <h1 className="text-2xl font-bold tracking-wide">SpoonSwift</h1>
    </a>
  );
};

const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 shadow-lg relative z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Title />
        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {/* Navigation */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 text-white absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent z-50`}
        >
          <Link
            className="block text-center md:inline-block hover:text-yellow-400 transition-colors duration-200 px-4 py-2 md:p-0"
            to="/"
          >
            Home
          </Link>
          <Link
            className="block text-center md:inline-block hover:text-yellow-400 transition-colors duration-200 px-4 py-2 md:p-0"
            to="/about"
          >
            About
          </Link>
          <Link
            className="block text-center md:inline-block hover:text-yellow-400 transition-colors duration-200 px-4 py-2 md:p-0"
            to="/contact"
          >
            Contact
          </Link>
          <Link
            className="block text-center md:inline-block hover:text-yellow-400 transition-colors duration-200 px-4 py-2 md:p-0"
            to="/expressMart"
          >
            ExpressMart
          </Link>
          <div className="relative block text-center md:inline-block">
            <Link
              to="/cart"
              className="flex justify-center items-center text-yellow-400 font-bold hover:text-yellow-500 transition-all duration-200 px-4 py-2 md:p-0"
            >
              <svg
                className="w-6 h-6 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2m0 0h13.2l.4-2M5.4 5l1.5 9h10.2l1.5-9M9 13h6m-9 4h12a1 1 0 001-1v-7a1 1 0 00-1-1H6a1 1 0 00-1 1v7a1 1 0 001 1z"
                />
              </svg>
              <div data-testid="cart-item-count">
                {cartItems.length > 0 ? <span>{cartItems.length}</span> : 0}
              </div>
            </Link>
            {cartItems.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </div>
            )}
          </div>
          <span className="block text-center md:inline-block font-bold text-sm text-green-400 px-4 py-2 md:p-0">
            {loggedInUser ? `Hi, ${loggedInUser}` : "Guest"}
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
