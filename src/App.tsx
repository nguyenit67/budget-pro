import { CssBaseline } from '@mui/material';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import EntryPage from 'features/Auth/pages/EntryPage';
import DashboardFeature from 'features/Dashboard';
import firebase from 'firebase';

import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth } from 'services/firebase';
// import { auth } from 'services/firebase';
import './App.css';

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

function App() {
  console.log(firebase);
  // get login state from redux store
  // const loggedIn = useSelector(state => state.user.loggedIn);
  const isLoggedIn = false;

  useEffect(() => {
    const unsubscribeAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        // user logs out, handle something
        console.log('User is not logged in');
        return;
      }

      console.log('Logged in user', user);

      const token = await user.getIdToken();
      console.log('Token', token);
    });
    return () => unsubscribeAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <div className="app">
      <CssBaseline />
      {isLoggedIn ? ( // protected routes go here
        <Routes>
          <Route path="/dashboard" element={<DashboardFeature />} />

          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        // UnAuthenticated routes go here
        <Routes>
          <Route path="/" element={<EntryPage />}>
            <Route path="login" element={<Login />} />
            <Route
              path="register"
              element={<Register onSuccess={() => console.log('register successfully!!')} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>

          {/* all other routes redirect to /login */}
        </Routes>
      )}
      {/* all other public routes go below here */}
    </div>
  );
}

export default App;
