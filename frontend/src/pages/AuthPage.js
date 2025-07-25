// File: frontend/src/pages/AuthPage.js
// Updated with console logging for debugging purposes.
'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, login } from '../services/api';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError("Username and password are required.");
            return;
        }

        try {
            if (isLogin) {
                const { data } = await login({ username, password });
                
                // --- DEBUGGING LOG ---
                // We are logging the token to confirm it's received from the backend.
                console.log("Login successful. Token received:", data.token);
                // --- END DEBUGGING LOG ---

                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                navigate('/');
            } else {
                await signup({ username, password });
                alert('Signup successful! Please log in.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="form-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </p>
        </div>
    );
};

export default AuthPage;
