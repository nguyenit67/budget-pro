import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
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

  const handleSubmit = async (values: LoginFormValues) => {
    console.log('Login form values', values);
    // TODO

    try {
      // make login request to firebase
      const action = login(values);
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      console.log('Login actionResult', actionResult);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log('Failed to login ', error.message);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
