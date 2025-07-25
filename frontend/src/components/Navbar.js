//this is the navigation bar
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/auth');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">BookReview</Link>
            <div>
                <Link to="/">All Books</Link>
                {token && <Link to="/add">Add Book</Link>}
            </div>
            <div>
                {token ? (
                    <>
                        <span>Welcome, {username}</span>
                        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
                    </>
                ) : (
                    <Link to="/auth">Login / Signup</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;