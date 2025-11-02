import { Link, useLocation } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", emoji: "🏠" },
    { path: "/admin/parcels", label: "Parcels", emoji: "📦" },
    { path: "/admin/users", label: "Users", emoji: "👥" },
    { path: "/admin/reports", label: "Reports", emoji: "📊" },
    { path: "/admin/tracking", label: "Tracking", emoji: "🔍" },
    { path: "/admin/settings", label: "Settings", emoji: "⚙️" },
  ];

  return (
    <aside className="w-64 h-screen bg-[#1a1f37] border-r border-[#2a3351] flex flex-col overflow-y-auto">
      <div className="p-5">
        {/* Close button for mobile */}
        {onClose && (
          <button 
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg z-10"
          >
            <X size={20} />
          </button>
        )}
        
        {/* Brand */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-lg bg-[#FF6B00] flex items-center justify-center">
            <span className="text-white font-bold text-lg">EL</span>
          </div>
          <div>
            <h1 className="font-bold text-base text-white">Excel Logistics</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-[#2a3351]"
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-[#2a3351] transition-all mt-4 w-full"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;