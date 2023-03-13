import { Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import images from "../../../assets/images";
import routeConfig from "../../../config/routeConfig";

function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 2, borderTop: "1px solid rgba(0,0,0,0.3)" }} component="footer">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={3} justifyContent="center" alignContent="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Box
              component="img"
              sx={{
                mr: 1
              }}
              src={images.logo}
              width={20}
            />

            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={routeConfig.home}
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              MEDRE
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Email:
            <Box
              component={Link}
              color="inherit"
              underline="always"
              sx={{
                ml: 1
              }}
            >
              info@example.com
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Phone:
            <Box
              component={Link}
              color="inherit"
              underline="always"
              sx={{
                ml: 1
              }}
            >
              +123456789
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Website:
            <Box
              component={Link}
              color="inherit"
              underline="always"
              sx={{
                ml: 1
              }}
            >
              https://example.com
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Address:
            <br />
            123 Example Street
            <br />
            Example City, 12345
            <br />
            Example Country
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Box component={Link} to={routeConfig.home} color="inherit" underline="always">
              Điều khoản dịch vụ
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Box component={Link} to={routeConfig.home} color="inherit" underline="always">
              Chính sách bảo mật
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Box component={Link} to={routeConfig.home} color="inherit" underline="always">
              Quy định sử dụng
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Box component={Link} to={routeConfig.home} color="inherit" underline="always">
              Liên hệ
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box component={Link} to={routeConfig.home} color="inherit" underline="always">
            <Box
              component="img"
              sx={{
                mr: 1
              }}
              src={images.notifiedToMinistryIndustryAndTrade}
            />
          </Box>
          <Box component={Link} to={routeConfig.home} color="inherit" underline="always">
            <Box
              component="img"
              sx={{
                mr: 1
              }}
              src={images.registeredWithMinistryIndustryAndTrade}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
