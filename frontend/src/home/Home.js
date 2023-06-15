import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import Header from '../common/Header'
import UserContext from "../UserContext";

const Home = () => {
    const {currentUser} = useContext(UserContext);
    
    const homeIfLoggedOut = () => {
        return (
            <div className='Home-loggedOut'>
                <h4>New to Jobly?</h4>
                <p><Link to="/signup">Sign Up Here!</Link></p>
                <h4>Continuing your job search?</h4>
                <p><Link to="/login">Log In Here!</Link></p>
            </div>
        );
    }

    const homeIfLoggedIn = () => {
        return (
            <div className='Home-loggedIn'>
                <h4>Welcome back {currentUser.username}!</h4>
            </div>
        );
    }

    return (
        <div className="Home">
            <Header />
            {currentUser ? homeIfLoggedIn() : homeIfLoggedOut()}
       </div>
    );
}

export default Home;