import { Route, Routes } from "react-router";
import SupportList from "./SupportList";
import SupportDetail from "./SupportDetail";
import routes from "./routes";

export default function SchedulePage() {
  return (
    <Routes>
      <Route path={routes.list} element={<SupportList />} />

      <Route path={routes.detail} element={<SupportDetail />} />
    </Routes>
  );
}
