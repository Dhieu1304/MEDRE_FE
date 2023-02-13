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
import PropTypes from "prop-types";
import MuiPhoneNumber from "material-ui-phone-number";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import formatDate from "date-and-time";
import routeConfig from "../../../config/routeConfig";
import { authRoutes } from "../../../pages/AuthPage";
import { inputErrorFormat } from "../../../utils/stringFormat";

function RegisterForm({ prevStep, nextStep }) {
  const { handleSubmit, control, trigger, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      phone: "+84",
      fullName: "",
      gender: 0,
      birthday: formatDate.format(new Date(), "YYYY-MM-DD"),
      address: "",
      password: "",
      confirmPassword: ""
    },
    criteriaMode: "all"
  });

  const [hidePassword, setHidePassword] = useState(true);

  const onRegister = async (formData) => {
    // write haphazardly to commit
    const success = formData;
    if (success) {
      nextStep();
    } else {
      prevStep();
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
                component={MuiPhoneNumber}
                defaultCountry="vn"
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
          name="phone"
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
          name="fullName"
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
                  <MenuItem value={0}>Female</MenuItem>
                  <MenuItem value={1}>Male</MenuItem>
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
            required: requireErrorMessage
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
          name="birthday"
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
              value: (value) => value === watch("password"),
              message: "do not match"
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

RegisterForm.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};

export default RegisterForm;
