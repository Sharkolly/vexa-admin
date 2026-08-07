import React from "react";
import { Bell, Search, Menu, ChevronDown } from "lucide-react";

interface VendorNavbarProps {
  onToggleSidebar?: () => void;
  vendorStore?: string;
  vendorName?: string;
  avatarUrl?: string;
  unreadNotifications?: number;
}

const VendorNavbar: React.FC<VendorNavbarProps> = ({
  vendorStore = "Vexa Store",
  vendorName = "Vendor Admin",
  avatarUrl,
  unreadNotifications = 3,
  onToggleSidebar
}) => {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white/95 backdrop-blur-xs border-b border-gray-200/80 flex items-center justify-between px-4 sm:px-6 z-30 transition-all">
      {/* Left Section: Mobile Sidebar Toggle & Search Input */}
      <div className="flex items-center gap-2.5 sm:gap-4 flex-1 max-w-xl">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Drawer"
          className="lg:hidden p-2 -ml-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
        >
          <Menu size={22} />
        </button>

        {/* Enhanced Search Bar */}
        <div className="relative w-full max-w-xs sm:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products, orders..."
            className="w-full bg-gray-50/80 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Right Section: Notifications & Vendor Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell size={20} />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          )}
        </button>

        {/* Vertical Divider */}
        <div className="h-5 w-px bg-gray-200 hidden sm:block" />

        {/* Vendor Profile Info */}
        <div className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={vendorStore}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                {vendorStore.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-gray-900 truncate max-w-[130px]">
              {vendorStore}
            </span>
            <span className="text-[10px] font-medium text-gray-500 truncate max-w-[130px]">
              {vendorName}
            </span>
          </div>

          <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default VendorNavbar;