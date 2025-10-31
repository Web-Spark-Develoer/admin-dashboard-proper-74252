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
      navigate("/admin-auth-x7k9p2m4");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const navItems = [
    { path: "/admin-dashboard-x7k9p2m4", label: "Dashboard", emoji: "🏠" },
    { path: "/admin-parcels-x7k9p2m4", label: "Parcels", emoji: "📦" },
    { path: "/admin-users-x7k9p2m4", label: "Users", emoji: "👥" },
    { path: "/admin-reports-x7k9p2m4", label: "Reports", emoji: "📊" },
    { path: "/admin-tracking-x7k9p2m4", label: "Tracking", emoji: "🔍" },
    { path: "/admin-settings-x7k9p2m4", label: "Settings", emoji: "⚙️" },
  ];

  return (
    <aside className="w-64 h-screen border-r flex flex-col overflow-y-auto" style={{
      background: "var(--gradient-card)",
      borderColor: "hsl(var(--sidebar-border))"
    }}>
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
          <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">ES</span>
          </div>
          <div>
            <h1 className="font-bold text-base">Excel Secure</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
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
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all mt-4 w-full"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;