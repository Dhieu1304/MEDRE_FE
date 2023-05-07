import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import routeConfig from "../../../config/routeConfig";
import authRoutes from "../../../pages/AuthPage/routes";

function SentEmailInfo({ backToFirstStep, resendVerification }) {
  const { t } = useTranslation("verificationFeature", { keyPrefix: "SentEmailInfo" });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        p: 2
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t("title")}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {t("subTitle.askToCheckMail")}
      </Typography>
      <Grid container flexDirection="row" justifyContent="space-between">
        <Grid item>
          <Link to={routeConfig.auth + authRoutes.register}>
            <Box component="span" sx={{ color: "blue" }}>
              {t("link.signUp")}
            </Box>
          </Link>
        </Grid>
        <Grid item>
          <Box component="span" sx={{ color: "blue" }} onClick={backToFirstStep}>
            {t("link.back")}
          </Box>
          <Box component="span" sx={{ color: "blue", cursor: "pointer" }} onClick={resendVerification}>
            {t("link.resend")}
          </Box>
        </Grid>
        <Grid item>
          <Link to={routeConfig.auth + authRoutes.login}>
            <Box component="span" sx={{ color: "blue" }}>
              {t("link.signIn")}
            </Box>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

SentEmailInfo.propTypes = {
  backToFirstStep: PropTypes.func.isRequired,
  resendVerification: PropTypes.func.isRequired
};

export default SentEmailInfo;
