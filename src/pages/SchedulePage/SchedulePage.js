import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router";
import { BookingList } from "../../features/booking";
import BookingDetail from "../../features/booking/BookingDetail";
import routes from "./routes";

export default function SchedulePage() {
  const { t } = useTranslation("schedulePage");
  return (
    <Routes>
      <Route path={routes.list} element={<BookingList title={t("title")} bookingListType="schedule" />} />

      <Route path={routes.detail} element={<BookingDetail />} />
    </Routes>
  );
}
