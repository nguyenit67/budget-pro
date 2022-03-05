import { CssBaseline } from '@mui/material';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import SigninPage from 'features/Auth/pages/SigninPage';
import DashboardFeature from 'features/Dashboard';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth } from 'services/firebase';
import './App.css';

function App() {
  // get login state from redux store
  // const loggedIn = useSelector(state => state.user.loggedIn);
  const isLoggedIn = false;

  useEffect(() => {
    const unsubscribeAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // user logs out, handle something
        console.log('User is not logged in');
        return;
      }

      console.log('Logged in user', user.displayName);

      const token = await user.getIdToken();
      console.log('Token', token);
    });
    return () => unsubscribeAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <div className="app">
      {/* <CssBaseline /> */}
      {isLoggedIn ? ( // protected routes go here
        <Routes>
          <Route path="/dashboard" element={<DashboardFeature />} />

          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        // UnAuthenticated routes go here
        <Routes>
          <Route path="/" element={<SigninPage />}>
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
