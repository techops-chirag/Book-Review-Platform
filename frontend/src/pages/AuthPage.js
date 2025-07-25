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
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                navigate('/');
            } else {
                await signup({ username, password });
                setIsLogin(true); // Switch to login form after successful signup
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