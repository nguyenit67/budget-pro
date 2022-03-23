import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { viteEnv } from 'utils';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// debugger;
const firebaseConfig = {
  apiKey: viteEnv('REACTAPP_FIREBASE_API_KEY'),
  authDomain: viteEnv('REACTAPP_FIREBASE_AUTH_DOMAIN'),
  projectId: viteEnv('REACTAPP_FIREBASE_PROJECT_ID'),
  storageBucket: viteEnv('REACTAPP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: viteEnv('REACTAPP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: viteEnv('REACTAPP_FIREBASE_APP_ID'),
  measurementId: viteEnv('REACTAPP_FIREBASE_MEASUREMENT_ID'),
};

debugger;
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth(app);

export const database = firebase.database(app);

export const dbRootRef = database.ref();

const getUserUid = async () => {
  // console.log('start getUserUid');
  const currentUser = auth.currentUser;
  if (currentUser) {
    return currentUser.uid;
  }
  // Not logged in
  // check in local (localStorage or IndexedDB) if firebase-loggedin is null
  const hasRememberedAccount = true; // we assume if it still there
  if (!hasRememberedAccount) return null;

  // Logged in but currentUser is not fetched --> wait (10s)
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
      console.log('Reject timeout getFirebaseToken');
    }, 10000);

    const unsubscribeAuthObserver = auth.onAuthStateChanged((user) => {
      if (!user) {
        return reject(null);
      }

      const userUid = user.uid;
      console.log('[AXIOS] Logged in user Uid', userUid);
      resolve(userUid);

      unsubscribeAuthObserver();
      clearTimeout(waitTimer);
    });
  });
};

export const getTransactionsDbRef = async () => {
  const currentUserUid = await getUserUid();
  return database.ref(`users/${currentUserUid}/transactions`);
};

console.log('firebase.ts', auth.currentUser);
