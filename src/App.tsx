import Register from 'features/Auth/components/Register';
import DashboardFeature from 'features/Dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  // get login state from redux store
  // const loggedIn = useSelector(state => state.user.loggedIn);
  const isLoggedIn = false;

  return (
    <div className="app">
      {isLoggedIn ? ( // protected routes go here
        <Routes>
          <Route path="/dashboard" element={<DashboardFeature />} />

          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        // UnAuthenticated routes go here
        <Routes>
          <Route path="/login" element={<h1>Hihi, under construction 😁</h1>} />
          <Route
            path="/register"
            element={<Register onSuccess={() => console.log('register successfully!!')} />}
          />

          {/* all other routes redirect to /login */}
          <Route path="/*" element={<Navigate to="/register" />} />
        </Routes>
      )}
      {/* all other public routes go below here */}
    </div>
  );
}

export default App;
