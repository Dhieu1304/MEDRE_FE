import { Button, Grid, Typography, Box } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import routeConfig from "../../../config/routeConfig";
import { authRoutes } from "../../../pages/AuthPage";
import { inputErrorFormat } from "../../../utils/stringFormat";

function OtpForm() {
  const { handleSubmit, control, trigger } = useForm({
    mode: "onChange",
    defaultValues: {
      otp: ""
    },
    criteriaMode: "all"
  });

  const onVerifyOtp = async (formData) => {
    const success = formData;
    return success;
  };

  const requireErrorMessage = "field can not empty";

  return (
    <>
      <Typography component="h1" variant="h5">
        Phone number
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onVerifyOtp)} sx={{ marginTop: 1 }}>
        <Controller
          control={control}
          rules={{
            required: requireErrorMessage,
            // https://ihateregex.io/expr/phone/
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/,
              message: "is wrong format"
            }
          }}
          render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
            const label = "Phone";
            return (
              <Box
                component={MuiPhoneNumber}
                defaultCountry="vn"
                sx={{ mb: 2 }}
                required
                error={error?.message}
                value={value}
                label={<Box component="span">{label}</Box>}
                type="tel"
                fullWidth
                helperText={<Box component="span">{inputErrorFormat(label, error?.message)}</Box>}
                variant="outlined"
                onBlur={() => {
                  trigger(name, { shouldFocus: true });
                  onBlur();
                }}
                onChange={onChange}
              />
            );
          }}
          name="phone"
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, p: 1, fontSize: 10 }}>
          Send Otp
        </Button>
        <Grid container>
          <Grid item xs>
            <Link variant="body2" to={routeConfig.auth + authRoutes.login}>
              <Box component="span" sx={{ color: "blue" }}>
                Sign in
              </Box>
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" to={routeConfig.auth + authRoutes.register}>
              <Box component="span" sx={{ color: "blue" }}>
                Sign up
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default OtpForm;
