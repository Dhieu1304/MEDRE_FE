import { Navigate, Route, Routes } from "react-router";

import routes from "./routes";
import { NotificationDetail } from "../../features/notification";

function NotificationPage() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/" replace />} />
      <Route path={routes.detail} element={<NotificationDetail />} />
    </Routes>
  );
}

export default NotificationPage;
