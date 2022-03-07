import { unwrapResult } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import SigninPage from 'features/Auth/pages/SigninPage';
import { getMe } from 'features/Auth/userSlice';
import DashboardFeature from 'features/Dashboard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth } from 'services/firebase';
import './App.css';

function App() {
  // get login state from redux store
  // const loggedIn = useSelector(state => state.user.loggedIn);
  const currentUser = useSelector((state: RootState) => state.user.current);
  const isLoggedIn = !!currentUser;
  const dispatch = useDispatch();

  // for testing include Authorization header Bearer with JWT
  // useEffect(() => {
  //   (async () => {
  //     const response = await axiosClient.get(
  //       '/products/28369984'
  //     );
  //     console.log('Single Product fetch', response.data);
  //   })();
  // }, []);

  useEffect(() => {
    const unsubscribeAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // user logs out, handle something
        console.log('User is not logged in');
        return;
      }

      console.log('Logged in user', user.displayName);
      try {
        console.log('getMe action', getMe());
        const actionResult = dispatch(getMe());
        // const currentUser = unwrapResult(actionResult); // this is for async thunk action
        console.log('Logged in user: ', actionResult, currentUser);
      } catch (error: any) {
        console.log('Failed to login ', error.message);
        // show toast error
      }

      // const token = await user.getIdToken();
      // console.log('Token', token);
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
