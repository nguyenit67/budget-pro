import firebase from 'firebase';
import { viteEnv } from 'utils';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: viteEnv('REACTAPP_FIREBASE_API_KEY'),
  authDomain: viteEnv('REACTAPP_FIREBASE_AUTH_DOMAIN'),
  projectId: viteEnv('REACTAPP_FIREBASE_PROJECT_ID'),
  storageBucket: viteEnv('REACTAPP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: viteEnv('REACTAPP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: viteEnv('REACTAPP_FIREBASE_APP_ID'),
  measurementId: viteEnv('REACTAPP_FIREBASE_MEASUREMENT_ID'),
};

console.log(firebaseConfig);

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth(app);

export const database = firebase.database(app);

// const analytics = firebase.analytics(app);

// export { auth, database };
