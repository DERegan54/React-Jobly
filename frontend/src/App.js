import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './nav/Navbar';
import Routes from './routes/Routes'
import useLocalStorage from './UseLocalStorage';
import JoblyApi from './api';
import UserContext from './users/UserContext';
import jwt_decode from 'jwt-decode';
import "./App.css"

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [userLoaded, setUserLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState([]);

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
  }, [token]);

  // Handles user sign up
  async function registerUser(data) {
    try {
      let token = await JoblyApi.registerUser(data);
      setToken(token);
      JoblyApi.token = token;
      setCurrentUser(token);
      return {success: true};
    } catch (errors) {
      console.error("signup failed", errors);
      return {success: false, errors}
    }
  }

  async function loginUser(data) {
    try {
      let token = await JoblyApi.loginUser(data);
      setToken(token);
      setCurrentUser(token)
      return {success: true};
    } catch (errors) {
      console.error("login failed", errors);
      return {success: false, errors};
    }
  }

  // Handles user logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
    setApplicationIds([]);
  }
  
  const applyToJob= (id) => {
    if(hasAppliedToJob(id)) return ;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds([...applicationIds, id]);
  }
  
  function hasAppliedToJob(id) {
    return applicationIds.includes(id);
  }

  console.log(applicationIds);

  return ( 
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
            value={{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
          <div className="App">
            <Navbar logout={logout} />
            <Routes login={loginUser} signup={registerUser} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>  
  );
}

export default App;
