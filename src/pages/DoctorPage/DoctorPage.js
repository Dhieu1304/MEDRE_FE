import { Route, Routes, Navigate } from "react-router";
import { DoctorDetail, DoctorList } from "../../features/doctor";

import routes from "./routes";

function DoctorPage() {
  return (
    <Routes>
      <Route path={routes.list} element={<DoctorList />} />
      <Route path={routes.detail} element={<DoctorDetail />} />
      <Route path={routes.default} element={<Navigate to={routes.list} />} />
    </Routes>
  );
}

export default DoctorPage;
