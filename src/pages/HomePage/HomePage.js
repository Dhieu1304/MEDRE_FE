import { TablePagination } from "@mui/material";
import { useAppConfigStore } from "../../store/AppConfigStore";

function HomePage() {
  const { mode, locale } = useAppConfigStore();
  return (
    <div>
      <div>
        HomePage
        <p>mode: {mode}</p>
        <p>locale: {locale}</p>
      </div>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={200}
        rowsPerPage={5}
        page={2}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </div>
  );
}

export default HomePage;
