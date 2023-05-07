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
import MeetingPage from "../pages/MeetingPage";
import VerificationPage from "../pages/VerificationPage";
import AuthLayout from "../layouts/AuthLayout";

// Public routes
const publicRoutes = [
  { path: routeConfig.home, component: HomePage },
  { path: `${routeConfig.auth}/*`, component: AuthPage, layout: AuthLayout },
  { path: `${routeConfig.about}/*`, component: AboutPage },
  { path: `${routeConfig.forum}/*`, component: ForumPage },
  { path: `${routeConfig.verification}/*`, component: VerificationPage, layout: AuthLayout },
  // ------------ private-------------
  // { path: `${routeConfig.doctor}`, component: NotFoundPage, layout: null },
  { path: `${routeConfig.doctor}`, component: Navigate, props: { replace: true, to: "/auth/login" }, layout: null },
  { path: `${routeConfig.schedule}`, component: Navigate, props: { replace: true, to: "/auth/login" }, layout: null },
  { path: `${routeConfig.history}`, component: Navigate, props: { replace: true, to: "/auth/login" }, layout: null },
  { path: `${routeConfig.profile}`, component: Navigate, props: { replace: true, to: "/auth/login" }, layout: null },
  { path: `${routeConfig.changePassword}/*`, component: ChangePasswordPage, layout: AuthLayout },
  { path: `${routeConfig.payment}/*`, component: PaymentPage },
  { path: `${routeConfig.meeting}/*`, component: MeetingPage, layout: null },
  //---------------------------------
  { path: routeConfig.default, component: Navigate, props: { to: routeConfig.home }, layout: null }
];

const privateRoutes = [
  { path: routeConfig.home, component: HomePage },
  { path: `${routeConfig.about}/*`, component: AboutPage },
  { path: `${routeConfig.forum}/*`, component: ForumPage },
  { path: `${routeConfig.doctor}/*`, component: DoctorPage },
  { path: `${routeConfig.schedule}/*`, component: SchedulePage },
  { path: `${routeConfig.history}/*`, component: HistoryPage },
  { path: `${routeConfig.profile}/*`, component: ProfilePage },
  { path: `${routeConfig.changePassword}/*`, component: ChangePasswordPage },
  { path: `${routeConfig.payment}/*`, component: PaymentPage },
  { path: `${routeConfig.meeting}/*`, component: MeetingPage, layout: null },
  { path: `${routeConfig.verification}/*`, component: VerificationPage, layout: AuthLayout },
  { path: routeConfig.default, component: Navigate, props: { to: routeConfig.home }, layout: null }
];

export { publicRoutes, privateRoutes };
