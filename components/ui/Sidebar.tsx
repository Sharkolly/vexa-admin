import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface VendorSidebarProps {
  onLogout?: () => void;
  toggleBtn: boolean
  onToggleSidebar: () => void;
}

const VendorSidebar: React.FC<VendorSidebarProps> = ({ onLogout, toggleBtn, onToggleSidebar }) => {
  // const [isMobileOpen, setIsMobileOpen] = useState(false);

  // const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  // const closeMobileMenu = () => setIsMobileOpen(false);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/product-form", label: "Add Product", icon: PlusCircle },
    { to: "/my-product", label: "My Products", icon: Package },
    { to: "/order", label: "Orders", icon: ShoppingCart },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* ========================================== */}
      {/* 1. MOBILE TOP HEADER (Visible < lg)       */}
      {/* ========================================== */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4">
        <h1 className="font-bold text-xl text-nav-blue-active">
          Vendor Portal
        </h1>
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Menu"
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
        >
          {toggleBtn ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* ========================================== */}
      {/* 2. MOBILE BACKDROP OVERLAY                 */}
      {/* ========================================== */}
      {toggleBtn && (
        <div
          onClick={onToggleSidebar}
          className="lg:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* ========================================== */}
      {/* 3. SIDEBAR (Fixed Desktop & Drawer Mobile) */}
      {/* ========================================== */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          toggleBtn ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header / Brand */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100 lg:border-none">
          <h1 className="font-bold text-2xl text-nav-blue-active">
            Vendor Portal
          </h1>
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-4 flex flex-col justify-between overflow-y-auto">
          <ul className="space-y-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onToggleSidebar}
                    className={({ isActive }) =>
                      `text-[13px] uppercase tracking-wider flex items-center gap-3 px-3.5 py-3 rounded-lg font-semibold transition-all ${
                        isActive
                          ? "bg-blue-50 border-r-4 border-nav-blue-active text-nav-blue-active"
                          : "text-slate-500 hover:bg-gray-100 hover:text-slate-800"
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Logout Action */}
          <div className="pt-4 border-t border-gray-100 mb-2">
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 px-4 font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer active:scale-98"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default VendorSidebar;