import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { AuthFormValues } from '@types';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller, FieldError, FormState, UseFormReturn } from 'react-hook-form';

interface DateFieldProps {
  form: UseFormReturn<object | any>;
  name: string;

  label?: string;
  disabled?: boolean;

  // this is for outside control
  // showPassword?: boolean;
  // onVisibleChange?: () => void;
}

DateField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function DateField(props: DateFieldProps) {
  const { form, name, label, disabled } = props;
  const [thisShowPassword, setThisShowPassword] = useState(false);

  const { errors } = form.formState; // .errors as Record<string, any> a.k.a object
  const error: FieldError | undefined = errors[name];

  return (
    <FormControl error={!!error} margin="normal" variant="outlined" fullWidth>
      {/* <InputLabel htmlFor={name}>{label}</InputLabel> */}

      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            label={label}
            disabled={disabled}
            value={value}
            onChange={(date) => onChange(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}

export default DateField;
