import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import { Box, FormControl, FormHelperText, InputAdornment, InputLabel, TextField } from "@mui/material";
import { Children, cloneElement, isValidElement, useState } from "react";
import { Controller } from "react-hook-form";
import { inputErrorFormat } from "../../../utils/stringFormat";

function CustomInput({ control, rules = {}, label, trigger, triggerTo, name, type = "text", placeholder, children }) {
  const [hidePassword, setHidePassword] = useState(true);

  const formControlStyle = {
    mb: 2,
    mr: 2
  };

  const render = ({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
    if (children) {
      return (
        <FormControl sx={formControlStyle} variant="outlined" fullWidth>
          <InputLabel variant="outlined">
            <Box component="span">{label}</Box>
          </InputLabel>

          {/* add props for children
           https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
           */}

          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child, {
                label,
                required: !!rules?.required,
                error: !!error,
                value,
                onBlur: () => {
                  trigger(name, { shouldFocus: true });
                  onBlur();
                },
                onChange,
                placeholder
              });
            }
            return child;
          })}

          <FormHelperText>
            <Box component="span">{inputErrorFormat(label, error?.message)}</Box>
          </FormHelperText>
        </FormControl>
      );
    }
    const InputProps =
      type === "password"
        ? {
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
          }
        : undefined;

    let inputType = type;
    if (type === "password") {
      inputType = hidePassword ? "password" : "text";
    }

    return (
      <Box
        component={TextField}
        fullWidth
        InputProps={InputProps}
        sx={formControlStyle}
        required={!!rules?.required}
        error={!!error?.message}
        value={value}
        label={<Box component="span">{label}</Box>}
        type={inputType}
        helperText={<Box component="span">{inputErrorFormat(label, error?.message)}</Box>}
        variant="outlined"
        onBlur={() => {
          trigger(name, { shouldFocus: true });
          if (triggerTo) trigger(triggerTo, { shouldFocus: true });
          onBlur();
        }}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  };

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field, fieldState }) => {
        return render({ field, fieldState });
      }}
    />
  );
}

CustomInput.defaultProps = {
  triggerTo: null,
  children: null
};

CustomInput.propTypes = {
  control: PropTypes.shape({ root: PropTypes.string.isRequired }).isRequired,
  rules: PropTypes.shape({ root: PropTypes.string.isRequired }).isRequired,
  label: PropTypes.string.isRequired,
  trigger: PropTypes.func.isRequired,
  triggerTo: PropTypes.string || undefined,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  children: PropTypes.node || undefined
};

export default CustomInput;
