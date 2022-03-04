import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { AuthFormValues } from '@types';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller, FieldError, FormState, UseFormReturn } from 'react-hook-form';

interface PasswordFieldProps {
  form: UseFormReturn<object | any>;
  name: keyof AuthFormValues;

  label?: string;
  disabled?: boolean;

  // this is for outside control
  // showPassword?: boolean;
  // onVisibleChange?: () => void;
}

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,

  // this is for outside control
  // showPassword: PropTypes.bool,
  // onVisibleChange: PropTypes.func,
};

function PasswordField(props: PasswordFieldProps) {
  const { form, name, label, disabled } = props;
  const [thisShowPassword, setThisShowPassword] = useState(false);

  const { errors } = form.formState; // .errors as Record<string, any> a.k.a object
  const error: FieldError | undefined = errors[name];

  const handleClickShowPassword = () => {
    setThisShowPassword(!thisShowPassword);
  };

  return (
    <FormControl error={!!error} fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <OutlinedInput
            id={name}
            type={thisShowPassword ? 'text' : 'password'}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {thisShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            disabled={disabled}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}

export default PasswordField;
