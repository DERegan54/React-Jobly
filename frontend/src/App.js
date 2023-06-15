import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './nav/Navbar';
import Routes from './routes/Routes'
import useLocalStorage from './UseLocalStorage';
import JoblyApi from './api';
import UserContext from './UserContext';
import jwt_decode from 'jwt-decode';

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  // Handles user sign up
  async function registerUser(data) {
    try {
      let res = await JoblyApi.registerUser(data);
      setToken(res);
      return {success: true};
    } catch (errors) {
      console.error("signup failed", errors);
      return {success: false, errors}
    }
  }

  async function loginUser(data) {
    try {
      let res = await JoblyApi.loginUser(data);
      setToken(res);
    } catch (errors) {
      console.error("login failed", errors);
    }
  }

  // Handles user logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  useEffect(() => {
      async function getCurrentUser() {
        if (token) {
          try {
            let {username} = jwt_decode(token);
            JoblyApi.token = token;
            console.log(token)
            const currentUser = await JoblyApi.getUser(username);
            setCurrentUser(currentUser)
          } catch (error) {
            console.error('App loadUser: problem loading', error)
            setCurrentUser(null)
          }
        }
        setUserLoaded(true);
      }
      setUserLoaded(false);
      getCurrentUser()
    }, [token]
  );

  return ( 
    <BrowserRouter>
      <UserContext.Provider
          value={{currentUser, setCurrentUser}}>
        <div className="App">
          <Navbar logout={logout} />
          <Routes login={loginUser} signup={registerUser} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
