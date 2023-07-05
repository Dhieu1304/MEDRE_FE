import { Route, Routes } from "react-router";
import TicketList from "../../features/ticket/TicketList";
import TicketDetail from "../../features/ticket/TicketDetail";
import routes from "./routes";

export default function SchedulePage() {
  return (
    <Routes>
      <Route path={routes.list} element={<TicketList />} />
      <Route path={routes.detail} element={<TicketDetail />} />
    </Routes>
  );
}
