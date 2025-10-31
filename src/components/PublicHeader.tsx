import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

const PublicHeader = () => {
  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-xl">E</span>
          </div>
          <span className="font-bold text-lg md:text-xl">EXCEL-LOGISTICS</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link to="/shipping" className="hover:underline font-medium">Shipping</Link>
          <Link to="/track-parcel" className="hover:underline font-medium">Tracking</Link>
          <Link to="/locations" className="hover:underline font-medium">Locations</Link>
          <Link to="/support" className="hover:underline font-medium">Support</Link>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
};

export default PublicHeader;
