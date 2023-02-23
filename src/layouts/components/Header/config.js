import routeConfig from "../../../config/routeConfig";
import { authRoutes } from "../../../pages/AuthPage";

export const headerLeftItems = [
  {
    to: routeConfig.home,
    label: "forum_label"
  },
  {
    to: routeConfig.home,
    label: "booking_label"
  },
  {
    to: routeConfig.home,
    label: "online_label"
  }
];

export const headerRightItems = [
  {
    to: routeConfig.auth + authRoutes.login,
    label: "sign_in_label"
  },
  {
    to: routeConfig.auth + authRoutes.register,
    label: "sign_up_label"
  }
];

export const headerDropdownMenu = [
  {
    to: routeConfig.home,
    label: "profile_label"
  },
  {
    to: routeConfig.home,
    label: "change_password_label"
  }
];

export const drawerWidth = 240;
