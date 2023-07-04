import { Route, Routes } from "react-router";
import SupportList from "../../features/ticket/TicketList";
import routes from "./routes";
import { TicketDetail } from "../../features/ticket";

export default function SchedulePage() {
  return (
    <Routes>
      <Route path={routes.list} element={<SupportList />} />
      <Route path={routes.detail} element={<TicketDetail />} />
    </Routes>
  );
}
