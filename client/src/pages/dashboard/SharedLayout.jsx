import DropDown from "../../components/sharedLayout/DropDown";
import Footer from "../../components/sharedLayout/Footer";
import SidebarDashboard from "../../components/sharedLayout/SidebarDashboard";
import { Outlet } from "react-router-dom";
const SharedLayout = () => {
  return (
    <>
      <main className="dashboard bg-gray-400 flex">
        <SidebarDashboard />
        <div className="flex-1 mx-4 mt-4">
          <Outlet />
        </div>
        <div>
          <DropDown />
        </div>
      </main>
      <Footer />
    </>
  );
};
export default SharedLayout;
