import { Button, Checkbox, FormControlLabel, Grid, Typography, Box } from "@mui/material";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { useTranslation } from "react-i18next";
import routeConfig, { authRoutes } from "../../config/routeConfig";
// import { authRoutes } from "../../pages/AuthPage";

import { useAuthStore } from "../../store/AuthStore/hooks";
import CustomInput from "../../components/CustomInput/CustomInput";
// import { useEffect } from "react";

function Login() {
  const { handleSubmit, control, trigger } = useForm({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      password: ""
    },
    criteriaMode: "all"
  });

  const theme = useTheme();

  const authStore = useAuthStore();
  const navigate = useNavigate();

  const { t } = useTranslation("authFeature", { keyPrefix: "Login" });
  const { t: tUser } = useTranslation("userEntity", { keyPrefix: "properties" });
  const { t: tInputValidate } = useTranslation("input", { keyPrefix: "validation" });

  const onLogin = async ({ phoneNumber, password }) => {
    const result = await authStore.loginByPhoneNumber(phoneNumber, password);
    if (result.success) {
      navigate(routeConfig.home);
    }
  };

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
      <Box component="form" noValidate onSubmit={handleSubmit(onLogin)} sx={{ marginTop: 1 }}>
        <Box
          sx={{
            mb: 2
          }}
        >
          <CustomInput
            control={control}
            rules={{
              required: tInputValidate("required")
            }}
            label={tUser("phoneNumber")}
            trigger={trigger}
            name="phoneNumber"
            type="tel"
          />
        </Box>

        <Box
          sx={{
            mb: 2
          }}
        >
          <CustomInput
            control={control}
            rules={{
              required: tInputValidate("required")
            }}
            label={tUser("password")}
            trigger={trigger}
            name="password"
            type="password"
          />
        </Box>

        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label={t("subTitle.remember")} />
        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, p: 1, fontSize: 10 }}>
          {t("button.login")}
        </Button>
        {authStore.isFetchApiError && (
          <Typography component="h3" color={theme.palette.error[theme.palette.mode]}>
            {authStore.fetchApiError}
          </Typography>
        )}

        <Grid container>
          <Grid item xs>
            <Link to={routeConfig.auth + authRoutes.forgetPassword}>{t("link.forgotPassword")}</Link>
          </Grid>
          <Grid item>
            <Link to={routeConfig.auth + authRoutes.register}>
              {t("link.dontHaveAnAccount")}
              <Box component="span" sx={{ color: "blue", ml: 1 }}>
                {t("link.signUp")}
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Login;
