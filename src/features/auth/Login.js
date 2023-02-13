import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography, Box, InputAdornment } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import routeConfig from "../../config/routeConfig";
import { authRoutes } from "../../pages/AuthPage";
import { inputErrorFormat } from "../../utils/stringFormat";

function Login() {
  const { handleSubmit, control, trigger } = useForm({
    mode: "onChange",
    defaultValues: {
      phone: "+84",
      password: ""
    },
    criteriaMode: "all"
  });

  const [hidePassword, setHidePassword] = useState(true);

  const navigate = useNavigate();

  const onLogin = async (formData) => {
    const success = formData;
    if (success) {
      navigate(routeConfig.home);
    }
  };

  const requireErrorMessage = "field can not empty";

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onLogin)} sx={{ marginTop: 1 }}>
        <Controller
          control={control}
          rules={{
            required: requireErrorMessage,
            // https://ihateregex.io/expr/phone/
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
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

        <Controller
          control={control}
          rules={{
            required: requireErrorMessage
          }}
          render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
            const label = "Password";
            return (
              <Box
                component={TextField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FontAwesomeIcon
                        size="1x"
                        icon={hidePassword ? faEye : faEyeSlash}
                        onClick={() => setHidePassword((prev) => !prev)}
                        cursor="pointer"
                      />
                    </InputAdornment>
                  )
                }}
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
          name="password"
        />

        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, p: 1, fontSize: 10 }}>
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link variant="body2" to={routeConfig.auth + authRoutes.forgetPassword}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" to={routeConfig.auth + authRoutes.register}>
              Dont have an account?
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

export default Login;
