import { CssBaseline } from '@mui/material';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import EntryPage from 'features/Auth/pages/EntryPage';
import DashboardFeature from 'features/Dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  // get login state from redux store
  // const loggedIn = useSelector(state => state.user.loggedIn);
  const isLoggedIn = false;

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
