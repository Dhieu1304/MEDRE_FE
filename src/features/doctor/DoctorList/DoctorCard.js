import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import routeConfig from "../../../config/routeConfig";
import ExpertiseButton from "../components/ExpertiseButton";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const { t } = useTranslation("doctorFeature", { keyPrefix: "DoctorList.DoctorCard" });

  return (
    <Card sx={{ height: "100%", maxWidth: 500, display: "flex", flexDirection: "column", p: 0, cursor: "pointer" }}>
      <CardHeader
        avatar={<Avatar alt={doctor?.name} src={doctor?.image} />}
        title={doctor?.name}
        subheader={doctor?.certificate && `(${doctor?.certificate})`}
      />
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Box>
          {doctor?.expertises?.map((expertise) => (
            <ExpertiseButton key={expertise?.id} label={expertise?.name} />
          ))}
        </Box>
        {doctor?.description && <Typography>{doctor?.description}</Typography>}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="contained" size="small" onClick={() => navigate(`${routeConfig.doctor}/${doctor?.id}`)}>
          {t("button.book")}
        </Button>
      </CardActions>
    </Card>
  );
}

DoctorCard.propTypes = {
  doctor: PropTypes.object.isRequired
};

export default DoctorCard;
