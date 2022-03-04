import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type LoginFormValues = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit?: (values: LoginFormValues) => void;
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm({ onSubmit }: LoginFormProps) {
  const schema = yup.object().shape({
    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters'),
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values: LoginFormValues) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <Box>
      {/* {isSubmitting && <LinearProgress className={classes.progress} />} */}

      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
