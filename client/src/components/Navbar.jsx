import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/contact" className="navbar-link">Contact</Link>
            </div>
            <div className="navbar-right">
                {user ? (
                    <>
                        <span className="navbar-user">Welcome, {user.name}!</span>
                        <button onClick={logout} className="navbar-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/register" className="navbar-link">Sign Up</Link>
                        <Link to="/login" className="navbar-link">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
