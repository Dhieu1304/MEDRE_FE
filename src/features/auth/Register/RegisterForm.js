import { Button, Grid, Typography, Box } from "@mui/material";
// import PropTypes from "prop-types";
// import MuiPhoneNumber from "material-ui-phone-number";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import formatDate from "date-and-time";
import routeConfig from "../../../config/routeConfig";
import { authRoutes } from "../../../pages/AuthPage";

import { useAuthStore } from "../../../store/AuthStore/hooks";
import AuthInput from "../../components/AuthInput";

function RegisterForm() {
  const { handleSubmit, control, trigger, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "0375435896",
      email: "d.hieu.13.04@gmail.com",
      name: "Nguyễn Đình Hiệu",
      gender: "Male",
      dob: formatDate.format(new Date(), "YYYY-MM-DD"),
      address: "Tân Phú, TP.HCM",
      password: "dhieu1304",
      confirmPassword: "dhieu1304"
    },
    criteriaMode: "all"
  });

  const authStore = useAuthStore();

  const navigate = useNavigate();

  const onRegister = async ({ phoneNumber, email, name, gender, dob, address, password }) => {
    const result = await authStore.register({ phoneNumber, email, name, gender, dob: new Date(dob), address, password });
    if (result) {
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
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onRegister)} sx={{ marginTop: 1 }}>
        <AuthInput
          control={control}
          rules={{
            required: requireErrorMessage,
            // https://ihateregex.io/expr/phone/
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/,
              message: "is wrong format"
            }
          }}
          label="Phone"
          trigger={trigger}
          name="phoneNumber"
          type="tel"
        />

        <AuthInput
          control={control}
          rules={{
            required: requireErrorMessage,
            // https://ihateregex.io/expr/phone/
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "is wrong format"
            }
          }}
          label="Email"
          trigger={trigger}
          name="email"
          type="email"
        />

        <AuthInput
          control={control}
          rules={{
            required: requireErrorMessage
          }}
          label="Full name"
          trigger={trigger}
          name="name"
        />

        <AuthInput
          control={control}
          rules={{
            required: requireErrorMessage
          }}
          label="Gender"
          trigger={trigger}
          name="gender"
          componentType="select"
          selectItems={[
            {
              label: "Male",
              value: "Male"
            },
            {
              label: "Female",
              value: "Female"
            }
          ]}
        />

        <AuthInput
          control={control}
          rules={{
            required: requireErrorMessage
          }}
          label="Address"
          trigger={trigger}
          name="address"
        />

        <AuthInput
          control={control}
          rules={{
            required: requireErrorMessage
          }}
          label="Birthday"
          trigger={trigger}
          name="dob"
          type="date"
        />

        <AuthInput
          control={control}
          rules={{
            required: requireErrorMessage,
            minLength: {
              value: 8,
              message: "must be at least 8 characters"
            },
            pattern: {
              value: /(?=.*[a-zA-Z])(?=.*[0-9])/,
              message: "must have at least 1 digit and 1 character"
            }
          }}
          label="Passwprd"
          trigger={trigger}
          triggerTo="confirmPassword"
          name="password"
          type="password"
        />

        <AuthInput
          control={control}
          rules={{
            required: requireErrorMessage,
            minLength: {
              value: 8,
              message: "must be at least 8 characters"
            },
            pattern: {
              value: /(?=.*[a-zA-Z])(?=.*[0-9])/,
              message: "must have at least 1 digit and 1 character"
            },
            validate: (value) => value === watch("password") || "do not match"
          }}
          label="Confirm Passwprd"
          trigger={trigger}
          name="confirmPassword"
          type="password"
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, p: 1, fontSize: 10 }}>
          Register
        </Button>
        <Grid container>
          <Grid item xs>
            <Link variant="body2" to={routeConfig.auth + authRoutes.forgetPassword}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" to={routeConfig.auth + authRoutes.login}>
              Have an account?
              <Box component="span" sx={{ color: "blue", ml: 1 }}>
                Sign in
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

// RegisterForm.propTypes = {
//   prevStep: PropTypes.func.isRequired,
//   nextStep: PropTypes.func.isRequired
// };

export default RegisterForm;
