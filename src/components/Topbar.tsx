import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TopbarProps {
  onMenuClick?: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "admin");
      }
    };
    getUser();
  }, []);

  return (
    <div className="border-b border-[#2a3351] bg-[#1a1f37] px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-[#2a3351] rounded-lg text-gray-300"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#2a3351] px-3 py-2 rounded-lg max-w-md flex-1">
        <Search size={16} className="text-gray-400" />
        <Input
          placeholder="Search parcels or user..."
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-white placeholder:text-gray-500"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 lg:gap-4">
        <button className="p-2 hover:bg-[#2a3351] rounded-lg transition-colors text-gray-300">
          <Bell size={20} />
        </button>
        <div className="text-sm hidden sm:block">
          <p className="text-gray-400 text-xs">Signed in as</p>
          <p className="font-medium truncate max-w-[150px] text-white">{userEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default Topbar;