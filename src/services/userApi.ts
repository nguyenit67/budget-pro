import { LoginFormValues } from 'features/Auth/components/LoginForm';
import { RegisterFormValues } from 'features/Auth/components/RegisterForm';
import { auth } from './firebase';

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

  async logout() {
    return auth.signOut();
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
