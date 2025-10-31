import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Package, MapPin, HelpCircle, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Shipping", path: "/shipping", icon: Package },
    { label: "Tracking", path: "/track-parcel", icon: Package },
    { label: "Locations", path: "/locations", icon: MapPin },
    { label: "Support", path: "/support", icon: HelpCircle },
  ];

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 bg-white">
          <div className="flex flex-col gap-4 mt-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
