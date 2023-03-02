import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import routeConfig from "../../../config/routeConfig";
import ExpertiseButton from "./ExpertiseButton";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: "100%", maxWidth: 500, display: "flex", flexDirection: "column", p: 0, cursor: "pointer" }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" alt={doctor?.name} src={doctor?.image} />}
        title={doctor?.name}
        subheader={`(${doctor?.certificate})`}
      />
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Box>
          {doctor?.doctorExpertises?.map((expertise) => (
            <ExpertiseButton key={expertise?.id} label={expertise?.name} />
          ))}
        </Box>
        <Typography>{doctor?.description}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="contained" size="small" onClick={() => navigate(`${routeConfig.doctor}/${doctor?.id}`)}>
          Book
        </Button>
      </CardActions>
    </Card>
  );
}

DoctorCard.propTypes = {
  doctor: PropTypes.object.isRequired
};

export default DoctorCard;
