import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutMePage from "../pages/AboutMePage.jsx";
import ContactPage from "../pages/ContactPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={MainLayout}>
        <Route path="/" Component={HomePage} />
        <Route path="/about" Component={AboutMePage} />
        <Route path="/contact" Component={ContactPage} />
      </Route>

      <Route path="/" Component={DashboardLayout}>
        <Route />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
