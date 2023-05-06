import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import routeConfig from "../../../config/routeConfig";
import authRoutes from "../../../pages/AuthPage/routes";

function SentEmailInfo() {
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

export default SentEmailInfo;
