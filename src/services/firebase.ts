// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDRAoB5d5bD8ILTNATPOxckMM8cOD-yDew',
  authDomain: 'react-budget-pro.firebaseapp.com',
  projectId: 'react-budget-pro',
  storageBucket: 'react-budget-pro.appspot.com',
  messagingSenderId: '869062877408',
  appId: '1:869062877408:web:f5754fb9d46256f58df085',
  measurementId: 'G-35ERTM9L6P',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

debugger;
export const auth = getAuth(app);

export const database = getDatabase(app);

// const analytics = getAnalytics(app);

// export { auth, database };
