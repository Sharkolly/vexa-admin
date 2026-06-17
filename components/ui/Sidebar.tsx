import { LayoutDashboard, Package, ShoppingCart, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const VendorSidebar = () => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-300  flex-col">
      <div className="p-6">
        <h1 className="font-bold text-2xl text-blue-600">
          Vendor Portal
        </h1>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          <Link to='/product-form' className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link to='/product-form' className="flex items-center gap-3 p-3 rounded-md bg-blue-50 text-blue-600">
            <Package size={20} />
            Products
          </Link>

          <Link to='/product-form' className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100">
            <ShoppingCart size={20} />
            Orders
          </Link>

          <Link to='/product-form' className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100">
            <Settings size={20} />
            Settings
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default VendorSidebar;