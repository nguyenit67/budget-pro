import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { AuthFormValues } from '@types';
import { TransactionFormValues } from 'features/Transaction/components/TransactionForm';
import { Controller, FieldError, UseFormReturn } from 'react-hook-form';

interface SelectFieldProps {
  form: UseFormReturn<object | any>;
  name: keyof TransactionFormValues;

  label?: string;
  disabled?: boolean;

  // this is source for value list
  valueList: string[];
}

function SelectField(props: SelectFieldProps) {
  const { form, name, label, disabled } = props;

  const { errors } = form.formState; // .errors as Record<string, any> a.k.a object
  const error: FieldError | undefined = errors[name];

  // console.log(props.valueList);
  return (
    <FormControl error={!!error} margin="normal" variant="outlined" sx={{ minWidth: 80 }}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Select
            id={name}
            disabled={disabled}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            // autoWidth
          >
            {props.valueList.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        )}
      />

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}

export default SelectField;
