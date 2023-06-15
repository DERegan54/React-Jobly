import React, {useContext}  from "react";
import {Link, NavLink} from 'react-router-dom';
import UserContext from '../users/UserContext';
import "./Navbar.css"

const Navbar = ({logout}) => {
    const {currentUser} = useContext(UserContext);

    const navIfLoggedIn = () => {
        return (
            <div className="Navbar-loggedIn">
                <span><NavLink to="/">Home</NavLink></span>
                <span><NavLink to="/companies">Companies</NavLink></span>
                <span><NavLink to="/jobs">Jobs</NavLink></span>
                <span><NavLink to="/profile">{currentUser.username}'sProfile</NavLink></span>
                <span><Link to="/" onClick={logout}>Log Out</Link></span>
            </div>
        )
    }

    const navIfLoggedOut = () => {
        return (
            <div className="Navbar-loggedOut">
                <span><NavLink to="/">Home</NavLink></span>
                <span><NavLink to="/login">Log In</NavLink></span>
                <span><NavLink to="/signup">Sign Up</NavLink></span>
            </div>
        );
    }

    return (
        <div className="Navbar">
            {currentUser ? navIfLoggedIn() : navIfLoggedOut()}
        </div>
    )
}

export default Navbar;