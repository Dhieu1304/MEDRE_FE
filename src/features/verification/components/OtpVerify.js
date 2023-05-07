import { Button, Grid, Typography, Box, useTheme, FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import { MuiOtpInput } from "mui-one-time-password-input";
import routeConfig from "../../../config/routeConfig";
import authRoutes from "../../../pages/AuthPage/routes";
import { useAuthStore } from "../../../store/AuthStore/hooks";

function OtpVerify({ handleVerifyOtp, backToFirstStep, resendVerification }) {
  const { control, handleSubmit } = useFormContext();

  const theme = useTheme();
  const authStore = useAuthStore();

  const { t } = useTranslation("verificationFeature", { keyPrefix: "OtpVerify" });
  const { t: tInputValidate } = useTranslation("input", { keyPrefix: "validation" });

  return (
    <Box
      sx={{
        minWidth: 250,
        width: "100%",
        // px: {
        //   sm: 4,
        //   xs: 0
        // },
        px: 2,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        sx={{
          fontSize: 25,
          fontWeight: 600,
          mb: 2,
          textAlign: "center"
        }}
      >
        {t("title")}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleVerifyOtp)}
        sx={{
          marginTop: 1,
          px: {
            sm: 8,
            xs: 2
          }
        }}
      >
        <Box
          sx={{
            mb: 2
          }}
        >
          <Controller
            name="otp"
            control={control}
            rules={{
              validate: (value) =>
                value.length === 6 ||
                tInputValidate("length", {
                  label: "OTP",
                  length: 6
                })
            }}
            render={({ field, fieldState }) => (
              <Box>
                <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
                {fieldState.invalid ? <FormHelperText error>{fieldState.error?.message}</FormHelperText> : null}
              </Box>
            )}
          />
        </Box>

        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, p: 1, fontSize: 10 }}>
          {t("button.verifyOtp")}
        </Button>
        {authStore.isFetchApiError && (
          <Typography component="h3" color={theme.palette.error[theme.palette.mode]}>
            {authStore.fetchApiError}
          </Typography>
        )}

        <Grid container flexDirection="row" justifyContent="space-between">
          <Grid item>
            <Link to={routeConfig.auth + authRoutes.register}>
              <Box component="span" sx={{ color: "blue" }}>
                {t("link.signUp")}
              </Box>
            </Link>
          </Grid>
          <Grid item>
            <Box component="span" sx={{ color: "blue", cursor: "pointer" }} onClick={backToFirstStep}>
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
    </Box>
  );
}

OtpVerify.propTypes = {
  handleVerifyOtp: PropTypes.func.isRequired,
  backToFirstStep: PropTypes.func.isRequired,
  resendVerification: PropTypes.func.isRequired
};

export default OtpVerify;
