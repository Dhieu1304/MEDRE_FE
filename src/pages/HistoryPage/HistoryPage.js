import { Navigate, Route, Routes } from "react-router";
import routeConfig from "../../config/routeConfig";
import { BookingList } from "../../features/booking";
import routes from "./routes";

export default function HistoryPage() {
  return (
    <Routes>
      <Route path={routes.list} element={<BookingList />} />
      <Route path={routes.default} element={<Navigate to={routeConfig.auth + routes.list} />} />
    </Routes>
  );
}
