import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';  

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');  

        try {
            const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);

            login({ id: user._id, username: user.username, token });
            navigate('/');
        } catch (err) {
            console.error(err);
            if (err.response) {

                if (err.response.status === 400) {
                    setError('Invalid email or password.');
                } else if (err.response.status === 401) {
                    setError('Unauthorized access. Please check your credentials.');
                } else {
                    setError('Something went wrong. Please try again later.');
                }
            } else {
                setError('Network error. Please check your connection.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p className="register-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
