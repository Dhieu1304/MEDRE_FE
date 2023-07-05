import { Grid, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import images from "../../../assets/images";
import routeConfig from "../../../config/routeConfig";

function Footer() {
  const { t } = useTranslation("layout", { keyPrefix: "footer" });
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
            {t("email_label")}:
            <Box
              component={Link}
              color="inherit"
              underline="always"
              sx={{
                ml: 1
              }}
            >
              {t("email_value")}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {t("phone_label")}:
            <Box
              component={Link}
              color="inherit"
              underline="always"
              sx={{
                ml: 1
              }}
            >
              {t("phone_value")}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {t("website_label")}:
            <Box
              component={Link}
              color="inherit"
              underline="always"
              sx={{
                ml: 1
              }}
            >
              {process.env.REACT_APP_FE_URL || "https://medre.site/"}
            </Box>
          </Typography>
          <Typography
            component="a"
            variant="body2"
            color="text.secondary"
            gutterBottom
            href="https://goo.gl/maps/9j8cE2qaWyEVehNZ6"
          >
            {t("address_label")}: {t("address_value_p1")}:
            <br />
            {t("address_value_p2")}:
            <br />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Box component={Link} to={routeConfig.home} color="inherit" underline="always">
              {t("terms_of_service")}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Box component={Link} to={routeConfig.home} color="inherit" underline="always">
              {t("privacy_policy")}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Box component={Link} to={routeConfig.home} color="inherit" underline="always">
              {t("usage_rules")}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Box component={Link} to={routeConfig.home} color="inherit" underline="always">
              {t("contact")}
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
