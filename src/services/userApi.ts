import { LoginFormValues } from 'features/Auth/components/LoginForm';
import { RegisterFormValues } from 'features/Auth/components/RegisterForm';
import { auth } from './firebase';
import firebase from 'firebase';
import { UserBasicInfo } from '@types';

const userApi = {
  async register(params: RegisterFormValues) {
    const { email, password, fullName } = params;
    // Create a user
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    // Update display name
    return userCredential.user?.updateProfile({ displayName: fullName });
  },

  async login(params: LoginFormValues) {
    const { email, password } = params;
    return auth.signInWithEmailAndPassword(email, password);
  },

  getMe() {
    const currentUser = auth.currentUser;

    return {
      id: currentUser?.uid,
      name: currentUser?.displayName,
      email: currentUser?.email,
      photoUrl: currentUser?.photoURL,
    };
  },
};

export default userApi;
