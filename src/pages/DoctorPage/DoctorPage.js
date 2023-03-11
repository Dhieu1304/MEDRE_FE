import { Route, Routes, Navigate } from "react-router";
import { DoctorDetail, DoctorList } from "../../features/doctor";
import { FetchingApiProvider } from "../../store/FetchingApiStore";
import routes from "./routes";

function DoctorPage() {
  return (
    <Routes>
      <Route
        path={routes.list}
        element={
          <FetchingApiProvider>
            <DoctorList />
          </FetchingApiProvider>
        }
      />
      <Route
        path={routes.detail}
        element={
          <FetchingApiProvider>
            <DoctorDetail />
          </FetchingApiProvider>
        }
      />
      <Route path={routes.default} element={<Navigate to={routes.list} />} />
    </Routes>
  );
}

export default DoctorPage;
