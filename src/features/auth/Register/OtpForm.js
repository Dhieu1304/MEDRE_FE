import { Button, Grid, Typography, Box, useTheme, FormHelperText } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { MuiOtpInput } from "mui-one-time-password-input";
import routeConfig, { authRoutes } from "../../../config/routeConfig";
// import { authRoutes } from "../../../pages/AuthPage";
import { useAuthStore } from "../../../store/AuthStore/hooks";

function OtpForm() {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    defaultValues: {
      otp: ""
    },
    criteriaMode: "all"
  });

  const theme = useTheme();
  const authStore = useAuthStore();
  // const navigate = useNavigate();

  const { t } = useTranslation("authFeature", { keyPrefix: "Register.otpForm" });
  const { t: tInputValidate } = useTranslation("input", { keyPrefix: "validation" });

  const handleVerifyOtp = async (formData) => {
    // write haphazardly to commit
    const success = formData;
    return success;
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
            <Link to={routeConfig.auth + authRoutes.login}>
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
    </Box>
  );

  // return (
  //   <>
  //     <Typography component="h1" variant="h5">
  //       Phone number
  //     </Typography>
  //     <Box component="form" noValidate onSubmit={handleSubmit(onVerifyOtp)} sx={{ marginTop: 1 }}>
  //       <Controller
  //         control={control}
  //         rules={{
  //           required: requireErrorMessage,
  //           // https://ihateregex.io/expr/phone/
  //           pattern: {
  //             value: /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/,
  //             message: "is wrong format"
  //           }
  //         }}
  //         render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
  //           const label = "Phone";
  //           return (
  //             <Box
  //               component={TextField}
  //               sx={{ mb: 2 }}
  //               required
  //               error={error?.message}
  //               value={value}
  //               label={<Box component="span">{label}</Box>}
  //               type="tel"
  //               fullWidth
  //               helperText={<Box component="span">{inputErrorFormat(label, error?.message)}</Box>}
  //               variant="outlined"
  //               onBlur={() => {
  //                 trigger(name, { shouldFocus: true });
  //                 onBlur();
  //               }}
  //               onChange={onChange}
  //             />
  //           );
  //         }}
  //         name="phone"
  //       />

  //       <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, p: 1, fontSize: 10 }}>
  //         Send Otp
  //       </Button>
  //       <Grid container>
  //         <Grid item xs>
  //           <Link variant="body2" to={routeConfig.auth + authRoutes.login}>
  //             <Box component="span" sx={{ color: "blue" }}>
  //               Sign in
  //             </Box>
  //           </Link>
  //         </Grid>
  //         <Grid item>
  //           <Link variant="body2" to={routeConfig.auth + authRoutes.register}>
  //             <Box component="span" sx={{ color: "blue" }}>
  //               Sign up
  //             </Box>
  //           </Link>
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   </>
  // );
}

export default OtpForm;
