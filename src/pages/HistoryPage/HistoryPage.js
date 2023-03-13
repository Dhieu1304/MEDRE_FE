import { Route, Routes } from "react-router";
import { BookingList } from "../../features/booking";
import BookingDetail from "../../features/booking/BookingDetail";
import routes from "./routes";

export default function HistoryPage() {
  return (
    <Routes>
      <Route path={routes.list} element={<BookingList />} />
      <Route path={routes.detail} element={<BookingDetail />} />
    </Routes>
  );
}
