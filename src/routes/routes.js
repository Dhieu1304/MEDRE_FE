import { Navigate } from "react-router-dom";
import routeConfig from "../config/routeConfig";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import DoctorPage from "../pages/DoctorPage";
import SchedulePage from "../pages/SchedulePage";
import HistoryPage from "../pages/HistoryPage";
import ProfilePage from "../pages/ProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import AboutPage from "../pages/AboutPage";
import ForumPage from "../pages/ForumPage";
import PaymentPage from "../pages/PaymentPage";

// Public routes
const publicRoutes = [
  { path: routeConfig.home, component: HomePage },
  { path: `${routeConfig.about}/*`, component: AboutPage },
  { path: `${routeConfig.forum}/*`, component: ForumPage },
  { path: `${routeConfig.doctor}/*`, component: DoctorPage },
  // ------------ private-------------
  { path: `${routeConfig.schedule}/*`, component: SchedulePage },
  { path: `${routeConfig.history}/*`, component: HistoryPage },
  { path: `${routeConfig.profile}/*`, component: ProfilePage },
  { path: `${routeConfig.changePassword}/*`, component: ChangePasswordPage },
  { path: `${routeConfig.payment}/*`, component: PaymentPage },
  //---------------------------------
  { path: routeConfig.default, component: Navigate, props: { to: routeConfig.home }, layout: null }
];

const privateRoutes = [
  { path: routeConfig.home, component: HomePage },
  { path: `${routeConfig.auth}/*`, component: AuthPage, layout: null },
  { path: `${routeConfig.about}/*`, component: AboutPage },
  { path: `${routeConfig.forum}/*`, component: ForumPage },
  { path: `${routeConfig.doctor}/*`, component: DoctorPage },
  { path: `${routeConfig.schedule}/*`, component: SchedulePage },
  { path: `${routeConfig.history}/*`, component: HistoryPage },
  { path: `${routeConfig.profile}/*`, component: ProfilePage },
  { path: `${routeConfig.changePassword}/*`, component: ChangePasswordPage },
  { path: `${routeConfig.payment}/*`, component: PaymentPage },
  { path: routeConfig.default, component: Navigate, props: { to: routeConfig.home }, layout: null }
];

export { publicRoutes, privateRoutes };
