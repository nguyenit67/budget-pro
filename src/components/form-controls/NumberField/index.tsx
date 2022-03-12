import { TextField } from '@mui/material';
import { AuthFormValues } from '@types';
import PropTypes from 'prop-types';
import { Controller, UseFormReturn } from 'react-hook-form';

interface NumberFieldProps {
  form: UseFormReturn<any>;
  name: string;

  label?: string;
  disabled?: boolean;
}

function NumberField(props: NumberFieldProps) {
  const { form, name, label, disabled } = props;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
        <TextField
          type="number"
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          disabled={disabled}
          error={!!error}
          helperText={error?.message}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur} // notify when input is touched
        />
      )}
    />
  );
}

export default NumberField;
