"use client";

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-500">Thikana Logistics</h3>
            <p className="text-gray-400">
              Your trusted partner for reliable truck booking and cargo transportation services.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-orange-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#booking" className="text-gray-400 hover:text-orange-500">
                  Book Truck
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-gray-400 hover:text-orange-500">
                  Reviews
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +880 123 456 789</li>
              <li>📧 info@thikanalogistics.com</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 Thikana Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}