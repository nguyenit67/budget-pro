import PropTypes from 'prop-types';
import RegisterForm, { RegisterFormValues } from '../RegisterForm';

// compile time
interface RegisterProps {
  onSuccess?: () => void;
}

// runtime check
Register.propTypes = {
  onSuccess: PropTypes.func,
};

function Register({ onSuccess }: RegisterProps) {
  const handleSubmit = (values: RegisterFormValues) => {
    console.log('Register form values', values);
    // TODO

    try {
      // make register request to firebase
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {}
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
