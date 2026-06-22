import { LayoutDashboard, Package, ShoppingCart, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const VendorSidebar = () => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-300  flex-col">
      <div className="p-6">
        <h1 className="font-bold text-2xl text-nav-blue-active">Vendor Portal</h1>
      </div>

      <nav className="flex-1 px-4 flex  flex-col justify-between">
        <ul className="space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              ` text-[14px] hover:bg-gray-100 transition-colors uppercase tracking-widest  flex items-center gap-3 p-3 rounded-xs font-medium  ${isActive ? "bg-blue-800/20 border-r-5 border-nav-blue-active   text-nav-blue-active" : "text-slate-400 "}`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/product-form"
            className={({ isActive }) =>
              ` text-[14px] hover:bg-gray-100 transition-colors uppercase tracking-widest  flex items-center gap-3 p-3 rounded-xs  font-medium  ${isActive ? "bg-blue-800/20 border-r-4 border-nav-blue-active   text-nav-blue-active" : "text-slate-400 "}`
            }
          >
            <Package size={20} />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              ` text-[14px] hover:bg-gray-100 transition-colors uppercase tracking-widest  flex items-center gap-3 p-3 rounded-xs font-medium  ${isActive ? "bg-blue-800/20 border-r-4 border-nav-blue-active   text-nav-blue-active" : "text-slate-400 "}`
            }
          >
            <ShoppingCart size={20} />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              ` text-[14px] hover:bg-gray-100 transition-colors uppercase tracking-widest  flex items-center gap-3 p-3 rounded-xs font-medium  ${isActive ? "bg-blue-800/20 border-r-4 border-nav-blue-active   text-nav-blue-active" : "text-slate-400 "}`
            }
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </ul>


        <ul className='mb-5 w-full'>
          <button className='bg-red-700 w-full flex items-center justify-center gap-3 text-white rounded-xs  py-2 font-medium px-5  cursor-pointer'>
            <span className='w-4 h-4'><BiLogOut /></span>
            <span>Logout</span>
          </button>
        </ul>
      </nav>
    </aside>
  );
};

export default VendorSidebar;
