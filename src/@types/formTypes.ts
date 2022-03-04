import { LoginFormValues } from 'features/Auth/components/LoginForm';
import { RegisterFormValues } from 'features/Auth/components/RegisterForm';

export type AuthFormValues = RegisterFormValues & LoginFormValues;
// equivalent to:
// export interface AuthFormValues extends LoginFormValues, RegisterFormValues {}
