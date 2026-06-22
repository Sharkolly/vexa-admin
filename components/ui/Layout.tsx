import { Outlet } from "react-router-dom";
import Nav from "../../components/ui/Nav";
import Sidebar from "../../components/ui/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Nav />
      <Outlet />
    </div>
  );
};

export default Layout;
