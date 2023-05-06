import { Button, Grid, Typography, Box, useTheme } from "@mui/material";
// import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import routeConfig, { authRoutes } from "../../../config/routeConfig";
// import { authRoutes } from "../../../pages/AuthPage";
// import { authRoutes } from "../../../config/routeConfig";

import { useAuthStore } from "../../../store/AuthStore/hooks";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { userInputValidate } from "../../../entities/User/constant";

function RegisterForm() {
  const { handleSubmit, control, trigger, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "0375435896",
      email: "d.hieu.13.04@gmail.com",
      // name: "Nguyễn Đình Hiệu",
      // gender: "Male",
      // dob: formatDate.format(new Date(), "YYYY-MM-DD"),
      // address: "Tân Phú, TP.HCM",
      password: "111111",
      confirmPassword: "111111"
    },
    criteriaMode: "all"
  });

  const theme = useTheme();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const { t } = useTranslation("authFeature", { keyPrefix: "Register.registerForm" });
  const { t: tUser } = useTranslation("userEntity", { keyPrefix: "properties" });
  const { t: tInputValidate } = useTranslation("input", { keyPrefix: "validation" });

  const handleRegister = async ({ phoneNumber, email, name, gender, dob, address, password }) => {
    const result = await authStore.register({ phoneNumber, email, name, gender, dob: new Date(dob), address, password });
    if (result) {
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
      <Box component="form" noValidate onSubmit={handleSubmit(handleRegister)} sx={{ marginTop: 1 }}>
        <Box
          sx={{
            mb: 2
          }}
        >
          <CustomInput
            control={control}
            rules={{
              required: tInputValidate("required"),
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: tInputValidate("format")
              }
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
              required: tInputValidate("required"),
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: tInputValidate("format")
              },
              maxLength: {
                value: userInputValidate.EMAIL_MAX_LENGTH,
                message: tInputValidate("maxLength", {
                  maxLength: userInputValidate.EMAIL_MAX_LENGTH
                })
              }
            }}
            label={tUser("email")}
            trigger={trigger}
            name="email"
            type="email"
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
              required: tInputValidate("required"),
              minLength: {
                value: userInputValidate.PASSWORD_MIN_LENGTH,
                message: tInputValidate("minLength", {
                  minLength: userInputValidate.PASSWORD_MIN_LENGTH
                })
              },
              maxLength: {
                value: userInputValidate.PASSWORD_MAX_LENGTH,
                message: tInputValidate("maxLength", {
                  maxLength: userInputValidate.PASSWORD_MAX_LENGTH
                })
              },
              pattern: {
                value: /(?=.*[a-zA-Z])(?=.*[0-9])/,
                message: tInputValidate("passwordFormat")
              }
            }}
            label={tUser("password")}
            trigger={trigger}
            triggerTo="confirmPassword"
            name="password"
            type="password"
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
              required: tInputValidate("required"),
              validate: (value) =>
                value === watch("password") ||
                tInputValidate("same", {
                  left: tUser("confirmPassword"),
                  right: tUser("password")
                })
            }}
            label={tUser("confirmPassword")}
            trigger={trigger}
            name="confirmPassword"
            type="password"
            isCustomError
          />
        </Box>

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
            <Link to={routeConfig.auth + authRoutes.login}>
              {t("link.haveAnAccount")}
              <Box component="span" sx={{ color: "blue", ml: 1 }}>
                {t("link.signIn")}
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// RegisterForm.propTypes = {
//   prevStep: PropTypes.func.isRequired,
//   nextStep: PropTypes.func.isRequired
// };

export default RegisterForm;
