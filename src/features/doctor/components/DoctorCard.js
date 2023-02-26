import { MoreVert } from "@mui/icons-material";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import routeConfig from "../../../config/routeConfig";

function DoctorCard() {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`${routeConfig.doctor}/1`)}
      sx={{ height: "100%", maxWidth: 345, display: "flex", flexDirection: "column", p: 0, cursor: "pointer" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Keegan"
        subheader="September 14, 2016"
      />
      {/* <CardMedia
        component="img"
        sx={{
          // 16:9
          // pt: "56.25%"
          p: 0
        }}
        image="https://source.unsplash.com/random"
        alt="random"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          Heading
        </Typography>
        <Typography>This is a media card. You can use this section to describe the content.</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Edit</Button>
      </CardActions> */}
    </Card>
  );
}

export default DoctorCard;
