import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();

  const handleSubmit = async (values: RegisterFormValues) => {
    console.log('Register form values', values);
    // TODO

    try {
      // make register action
      const action = register(values);
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      console.log('Register actionResult', actionResult);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.log('Failed to register ', error.message);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
