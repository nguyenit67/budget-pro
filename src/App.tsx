import { RootState } from 'app/store';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import SigninPage from 'features/Auth/pages/SigninPage';
import { getMe } from 'features/Auth/userSlice';
import TransactionFeature from 'features/Transaction';
import { useSnackbar } from 'notistack';
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
  const { enqueueSnackbar } = useSnackbar();

  // for testing include Authorization header Bearer with JWT
  // useEffect(() => {
  //   (async () => {
  //     const response = await axiosClient.get(
  //       '/products/28369984'
  //     );
  //     console.log('Single Product fetch', response.data);
  //   })();
  // }, []);
  console.log('App() redux user', currentUser);

  useEffect(() => {
    const unsubscribeAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // user logs out, handle something
        console.log('User is not logged in');
        return;
      }

      console.log('Logged in user in authObserver', user.displayName);
      try {
        dispatch(getMe());
      } catch (error: any) {
        enqueueSnackbar(`Failed to login ${error.message}`, { variant: 'error' });
      }
    });

    return () => unsubscribeAuthObserver(); // Make sure we un-register Firebase observer when the component unmounts.
  }, []);

  return (
    <div className="app">
      {/* <CssBaseline /> */}
      {isLoggedIn ? ( // protected routes go here
        <Routes>
          <Route path="/dashboard/*" element={<TransactionFeature />} />

          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
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
            {/* all other routes redirect to /login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      )}
      {/* all other public routes go below here */}
    </div>
  );
}

export default App;
