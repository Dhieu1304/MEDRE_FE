import { Navigate } from "react-router-dom";
import routeConfig from "../config/routeConfig";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import DoctorPage from "../pages/DoctorPage";

// Public routes
const publicRoutes = [
  { path: routeConfig.home, component: HomePage },
  { path: `${routeConfig.doctor}/*`, component: DoctorPage },
  { path: routeConfig.default, component: Navigate, props: { to: routeConfig.home }, layout: null }
];

const privateRoutes = [
  { path: routeConfig.home, component: HomePage },
  { path: `${routeConfig.auth}/*`, component: AuthPage, layout: null },
  { path: `${routeConfig.doctor}/*`, component: DoctorPage },
  { path: routeConfig.default, component: Navigate, props: { to: routeConfig.home }, layout: null }
];

export { publicRoutes, privateRoutes };
