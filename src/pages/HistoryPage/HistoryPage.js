import { Navigate, Route, Routes } from "react-router";
import routeConfig from "../../config/routeConfig";
import { BookingList } from "../../features/booking";
import BookingDetail from "../../features/booking/BookingDetail";
import routes from "./routes";

export default function HistoryPage() {
  return (
    <Routes>
      <Route path={routes.list} element={<BookingList />} />
      <Route path={routes.detail} element={<BookingDetail />} />
      <Route path={routes.default} element={<Navigate to={routeConfig.history + routes.list} />} />
    </Routes>
  );
}
