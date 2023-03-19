import { Button, Checkbox, FormControlLabel, Grid, Typography, Box } from "@mui/material";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import routeConfig from "../../config/routeConfig";
import { authRoutes } from "../../pages/AuthPage";
import { useAuthStore } from "../../store/AuthStore/hooks";
import AuthInput from "./components/AuthInput";

function Login() {
  const { handleSubmit, control, trigger } = useForm({
    mode: "onChange",
    defaultValues: {
      phone: "",
      password: ""
    },
    criteriaMode: "all"
  });

  const theme = useTheme();

  const authStore = useAuthStore();
  const navigate = useNavigate();

  const onLogin = async ({ phone, password }) => {
    const result = await authStore.loginByPhoneNumber(phone, password);
    if (result.success) {
      navigate(routeConfig.home);
    }
  };

  const requireErrorMessage = "field can not empty";

  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        sx={{
          fontSize: 18,
          fontWeight: 600,
          mb: 2
        }}
      >
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onLogin)} sx={{ marginTop: 1 }}>
        <AuthInput
          control={control}
          rules={{
            required: requireErrorMessage,
            // https://ihateregex.io/expr/phone/
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
              message: "is wrong format"
            }
          }}
          label="Phone"
          trigger={trigger}
          name="phone"
          type="tel"
        />

        <AuthInput
          control={control}
          rules={{
            required: requireErrorMessage
          }}
          label="Password"
          trigger={trigger}
          name="password"
          type="password"
        />

        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, p: 1, fontSize: 10 }}>
          Sign In
        </Button>
        {authStore.isFetchApiError && (
          <Typography component="h3" color={theme.palette.error[theme.palette.mode]}>
            {authStore.fetchApiError}
          </Typography>
        )}

        <Grid container>
          <Grid item xs>
            <Link variant="body2" to={routeConfig.auth + authRoutes.forgetPassword}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" to={routeConfig.auth + authRoutes.register}>
              Dont have an account?
              <Box component="span" sx={{ color: "blue", ml: 1 }}>
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
