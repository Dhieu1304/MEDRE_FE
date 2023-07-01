import routeConfig, { authRoutes } from "../../../config/routeConfig";

export const headerLeftItemsNotLogin = [
  {
    to: routeConfig.about,
    label: "about_label"
  },
  {
    to: routeConfig.support,
    label: "support_label"
  },
  {
    to: routeConfig.doctor,
    label: "doctor_label"
  },
  // ------------ private-------------
  {
    to: routeConfig.schedule,
    label: "schedule_label"
  },
  {
    to: routeConfig.history,
    label: "history_label"
  }

  // ------------ private-------------
];

export const headerLeftItemsLogined = [
  {
    to: routeConfig.about,
    label: "about_label"
  },
  {
    to: routeConfig.support,
    label: "support_label"
  },
  {
    to: routeConfig.doctor,
    label: "doctor_label"
  },
  {
    to: routeConfig.schedule,
    label: "schedule_label"
  },
  {
    to: routeConfig.history,
    label: "history_label"
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
    to: routeConfig.profile,
    label: "profile_label"
  },
  {
    to: routeConfig.changePassword,
    label: "change_password_label"
  }
];

export const drawerWidth = 240;
