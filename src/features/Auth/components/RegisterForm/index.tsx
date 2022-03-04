import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface RegisterFormProps {
  onSubmit?: (values: RegisterFormValues) => void;
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const schema = yup.object().shape({
    fullName: yup.string().trim().required('Please enter your full name'),

    email: yup.string().required('Please enter your email').email('Please enter a valid email'),

    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters'),

    confirmPassword: yup
      .string()
      .required('Please retype your password')
      .equals([yup.ref('password')], 'Password does not match'), // alias to .oneOf()
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values: RegisterFormValues) => {
    await onSubmit?.(values);
  };

  const { isSubmitting } = form.formState;

  return (
    <Box>
      {/* {isSubmitting && <LinearProgress className={classes.progress} />} */}

      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="confirmPassword" label="Confirm Password" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Create an account
        </Button>
      </form>
    </Box>
  );
}

export default RegisterForm;
