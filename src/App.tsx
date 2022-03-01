import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardFeature from 'features/Dashboard';

function App() {
  // get login state from redux store
  // const loggedIn = useSelector(state => state.user.loggedIn);
  const isLoggedIn = true;

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
          <Route path="/login" element={null} />

          {/* all other routes redirect to /login */}
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      {/* all other public routes go below here */}
    </div>
  );
}

export default App;
