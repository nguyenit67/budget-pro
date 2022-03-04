import PropTypes from 'prop-types';
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
  const handleSubmit = (values: LoginFormValues) => {
    console.log('Login form values', values);
    // TODO

    try {
      // make login request to firebase
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {}
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
