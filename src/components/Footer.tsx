import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1f37] text-white py-12 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#FF6B00]">Excel Logistics</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner for fast, reliable shipping and logistics solutions worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/track-parcel" className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm">
                  Track Parcel
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm">
                  Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/support" className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/customer-auth" className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/ship-guest" className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm">
                  Ship as Guest
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 1-800-EXCEL-LOG</li>
              <li>📧 support@excellogistics.com</li>
              <li>📍 123 Logistics Way, Shipping City, SC 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Excel Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;