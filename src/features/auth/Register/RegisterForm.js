import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from "@mui/material";
// import PropTypes from "prop-types";
// import MuiPhoneNumber from "material-ui-phone-number";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import formatDate from "date-and-time";
import routeConfig from "../../../config/routeConfig";
import { authRoutes } from "../../../pages/AuthPage";
import { inputErrorFormat } from "../../../utils/stringFormat";
import { useAuthStore } from "../../../store/AuthStore/hooks";

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

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setConfirmHidePassword] = useState(true);

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
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onRegister)} sx={{ marginTop: 1 }}>
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
                component={TextField}
                sx={{ mb: 2 }}
                required
                // error={error?.message}
                error={!!error}
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
          name="phoneNumber"
        />
        <Controller
          control={control}
          rules={{
            required: requireErrorMessage,
            // https://ihateregex.io/expr/phone/
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "is wrong format"
            }
          }}
          render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
            const label = "Email";
            return (
              <Box
                component={TextField}
                sx={{ mb: 2 }}
                required
                // error={error?.message}
                error={!!error}
                value={value}
                label={<Box component="span">{label}</Box>}
                type="email"
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
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: requireErrorMessage
          }}
          render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
            const label = "Full name";
            return (
              <Box
                component={TextField}
                type="text"
                sx={{ mb: 2 }}
                required
                // error={error?.message}
                error={!!error}
                value={value}
                label={<Box component="span">{label}</Box>}
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
          name="name"
        />

        <Controller
          control={control}
          rules={{
            required: requireErrorMessage
            // https://ihateregex.io/expr/phone/
          }}
          render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
            const label = "Gender";
            return (
              <FormControl placeholder="Gender" sx={{ mb: 2 }} fullWidth variant="outlined">
                <Select
                  label={<Box component="span">{label}</Box>}
                  required
                  // error={error?.message}
                  error={!!error}
                  value={value}
                  onBlur={() => {
                    trigger(name, { shouldFocus: true });
                    onBlur();
                  }}
                  onChange={onChange}
                >
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                </Select>
                <FormHelperText>
                  <Box component="span">{inputErrorFormat(label, error?.message)}</Box>
                </FormHelperText>
              </FormControl>
            );
          }}
          name="gender"
        />

        <Controller
          control={control}
          rules={{
            required: requireErrorMessage
          }}
          render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
            const label = "Address";
            return (
              <Box
                component={TextField}
                type="text"
                sx={{ mb: 2 }}
                required
                // error={error?.message}
                error={!!error}
                value={value}
                label={<Box component="span">{label}</Box>}
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
          name="address"
        />

        <Controller
          control={control}
          rules={{
            required: requireErrorMessage,
            minLength: {
              value: 8,
              message: "must be at least 8 characters"
            },
            pattern: {
              value: /[a-zA-Z0-9]/,
              message: "must have at least 1 digit and 1 character"
            }
          }}
          render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
            const label = "Birthday";
            return (
              <Box
                component={TextField}
                type="date"
                sx={{ mb: 2 }}
                required
                // error={error?.message}
                error={!!error}
                value={value}
                label={<Box component="span">{label}</Box>}
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
          name="dob"
        />

        <Controller
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
                // error={error?.message}
                error={!!error}
                value={value}
                label={<Box component="span">{label}</Box>}
                type={hidePassword ? "password" : "text"}
                fullWidth
                helperText={<Box component="span">{inputErrorFormat(label, error?.message)}</Box>}
                variant="outlined"
                onBlur={() => {
                  trigger(name, { shouldFocus: true });
                  trigger("confirmPassword", { shouldFocus: true });

                  onBlur();
                }}
                onChange={onChange}
              />
            );
          }}
          name="password"
        />

        <Controller
          control={control}
          rules={{
            required: requireErrorMessage,
            pattern: {
              value: /(?=.*[a-zA-Z])(?=.*[0-9])/,
              message: "must have at least 1 digit and 1 character"
            },
            validate: (value) => value === watch("password") || "do not match"
          }}
          render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
            const label = "Confirm password";
            return (
              <Box
                component={TextField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FontAwesomeIcon
                        size="1x"
                        icon={hideConfirmPassword ? faEye : faEyeSlash}
                        onClick={() => setConfirmHidePassword((prev) => !prev)}
                        cursor="pointer"
                      />
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 2 }}
                required
                // error={error?.message}
                error={!!error}
                value={value}
                label={<Box component="span">{label}</Box>}
                type={hideConfirmPassword ? "password" : "text"}
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
          name="confirmPassword"
        />

        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
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
              <Box component="span" sx={{ color: "blue" }}>
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
