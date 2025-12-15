import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const MainLayout = () => {
  return (
    <div className="flex flex-col gap-2 max-w-screen-2xl mx-auto p-4">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
