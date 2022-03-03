import React from 'react';
import PropTypes from 'prop-types';
import { Controller, UseFormReturn } from 'react-hook-form';
import RegisterForm, { RegisterFormValues } from 'features/Auth/components/RegisterForm';
import { TextField } from '@mui/material';

interface InputFieldProps {
  name: keyof RegisterFormValues;
  form: UseFormReturn<RegisterFormValues>;

  label?: string;
  disabled?: boolean;
}

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props: InputFieldProps) {
  const { form, name, label, disabled } = props;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { error }, formState }) => (
        <TextField
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

export default InputField;
