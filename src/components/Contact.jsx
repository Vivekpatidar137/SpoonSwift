const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
      <p className="text-gray-600">
        We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
      </p>
      
      <h2 className="text-2xl font-semibold text-gray-700">Get in Touch</h2>
      <p className="text-gray-600">
        <strong>Email:</strong> support@spoonswift.com
      </p>
      <p className="text-gray-600">
        <strong>Phone:</strong> +1 (555) 123-4567
      </p>
      <p className="text-gray-600">
        <strong>Address:</strong> 123 Foodie Lane, Culinary City, FL 45678, USA
      </p>
      
      <h2 className="text-2xl font-semibold text-gray-700">Follow Us</h2>
      <ul className="flex space-x-4">
        <li><a href="#" className="text-blue-500 hover:underline">Facebook</a></li>
        <li><a href="#" className="text-blue-400 hover:underline">Twitter</a></li>
        <li><a href="#" className="text-pink-500 hover:underline">Instagram</a></li>
        <li><a href="#" className="text-blue-700 hover:underline">LinkedIn</a></li>
      </ul>
      
      <p className="text-gray-600">
        Stay connected and never miss out on the latest updates and promotions!
      </p>
    </div>
  );
};

export default Contact;
