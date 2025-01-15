const Footer = () => {
  return (
    <div className="bg-gray-800 text-white p-5">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between p-5">
        <div className="footer-section mb-4">
          <h3 className="font-bold text-lg mb-2">About SpoonSwift</h3>
          <p className="text-sm text-gray-300">
            SpoonSwift is your one-stop solution for discovering the best
            restaurants around you. We offer curated menus and top-rated dishes
            from the finest eateries in your city.
          </p>
        </div>
        <div className="footer-section mb-4">
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p className="text-sm text-gray-300">Email: support@spoonswift.com</p>
          <p className="text-sm text-gray-300">Phone: +1 234 567 890</p>
          <p className="text-sm text-gray-300">Address: 123 Food Street, Gourmet City, GC 12345</p>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        &copy; 2024 SpoonSwift | All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
