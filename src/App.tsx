import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  // get login state from redux store
  const loggedIn = useSelector(state => state.user.loggedIn);

  return (
    <div className="app">
      {
        // protected routes 
        loggedIn ? (
          <Header />  /* or <NavBar /> */

          <Route 
        ): (
          <Redirect to="/login" />
        )
      }

    </div>
  )
}

export default App
