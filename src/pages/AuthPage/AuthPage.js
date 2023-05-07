import { Navigate, Route, Routes } from "react-router-dom";

import routeConfig from "../../config/routeConfig";
import routes from "./routes";
import { Login, Register, ForgetPassword } from "../../features/auth";

export default function AuthPage() {
  return (
    <Routes>
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path={routes.forgetPassword} element={<ForgetPassword />} />
      <Route path={routes.default} element={<Navigate to={routeConfig.auth + routes.login} />} />
    </Routes>
  );
}
