import { Outlet } from "react-router-dom";
import Nav from "../../components/ui/Nav";
import Sidebar from "../../components/ui/Sidebar";
import { useState } from "react";

const Layout = () => {
  const [toggleBtn, setToggleBtn] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar toggleBtn={toggleBtn}  onToggleSidebar={() => setToggleBtn(!toggleBtn)}/>
      <Nav onToggleSidebar={() => setToggleBtn(!toggleBtn)} />
      <Outlet />
    </div>
  );
};

export default Layout;
