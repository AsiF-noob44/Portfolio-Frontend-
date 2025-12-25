import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutMePage from "../pages/AboutMePage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import ServicePage from "../pages/ServicePage.jsx";
import BlogPage from "../pages/BlogPage.jsx";
import BlogDetailsPage from "../pages/BlogDetailsPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={MainLayout}>
        <Route path="/" Component={HomePage} />
        <Route path="/about" Component={AboutMePage} />
        <Route path="/contact" Component={ContactPage} />
        <Route path="/service" Component={ServicePage} />
        <Route path="/blogs" Component={BlogPage} />
        <Route path="/blogs/:id" Component={BlogDetailsPage} />
      </Route>

      <Route path="/" Component={DashboardLayout}>
        <Route />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
