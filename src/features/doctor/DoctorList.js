import { Container, Grid } from "@mui/material";
import DoctorCard from "./components/DoctorCard";

function DoctorList() {
  return (
    <Container sx={{ py: 2, px: 0 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4} p={0}>
        {[1, 2, 3, 4].map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4} p={0}>
            <DoctorCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DoctorList;
