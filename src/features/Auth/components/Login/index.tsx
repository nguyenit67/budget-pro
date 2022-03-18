import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import LoginForm, { LoginFormValues } from '../LoginForm';

// compile time
interface LoginProps {
  onSuccess?: () => void;
}

// runtime check
Login.propTypes = {
  onSuccess: PropTypes.func,
};

function Login({ onSuccess }: LoginProps) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: LoginFormValues) => {
    console.log('Login form values', values);
    // TODO

    try {
      // make login request to firebase
      const action = login(values);
      const actionResult = await dispatch(action);
      // @ts-ignore
      unwrapResult(actionResult);
      enqueueSnackbar('Login successfully', { variant: 'success' });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      enqueueSnackbar(`Failed to login ${error.message}`, { variant: 'error' });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
