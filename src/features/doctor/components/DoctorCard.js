import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import routeConfig from "../../../config/routeConfig";
import ExpertiseButton from "./ExpertiseButton";

function DoctorCard({ isLiked = true }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: "100%", maxWidth: 500, display: "flex", flexDirection: "column", p: 0, cursor: "pointer" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {isLiked ? <FavoriteIcon color="red" /> : <FavoriteBorderIcon color="red" />}
          </IconButton>
        }
        title="Keegan"
      />
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Box>
          {["Tâm lý", "Răng hàm mặt", "Tai mũi họng"].map((expertise) => (
            <ExpertiseButton key={expertise} label={expertise} />
          ))}
        </Box>
        <Typography>
          Hơn 20 năm kinh nghiệm làm việc chuyên sâu trong lĩnh vực trị liệu tâm lý, tham vấn tâm lý và giáo cho trẻ em và vị
          thành niên
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="contained" size="small" onClick={() => navigate(`${routeConfig.doctor}/1`)}>
          Book
        </Button>
      </CardActions>
    </Card>
  );
}

DoctorCard.propTypes = {
  isLiked: PropTypes.bool.isRequired
};

export default DoctorCard;
