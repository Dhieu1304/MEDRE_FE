const routeConfig = {
  home: "/",
  auth: "/auth",
  doctor: "/doctor",
  schedule: "/schedule",
  history: "/history",
  forum: "/forum",
  about: "/about",
  profile: "/profile",
  changePassword: "/change-password",
  payment: "/payment",
  meeting: "/meeting",
  verification: "/verification",
  notification: "/notification",
  default: "/*"
};

export const authRoutes = {
  login: "/login",
  register: "/register",
  forgetPassword: "/forget-password",
  default: "/*"
};

export default routeConfig;
