import { Outlet } from "react-router-dom";
import Nav from '../../components/ui/Nav'
const LayoutNoFooter = () => {
  return (
    <div>
<Nav/>
      <Outlet />
    </div>
  );
};

export default LayoutNoFooter;
