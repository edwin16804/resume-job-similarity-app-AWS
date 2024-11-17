import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import image from 'C:/Users/EDWIN/OneDrive/Desktop/JobAI/application/src/assets/login.jpg';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://ocjw3jyw41.execute-api.us-east-1.amazonaws.com/stage1/login', { // Use your API Gateway URL here
                email,
                password,
            });
            const { message, user } = response.data;
            // Handle success
            navigate('/dashboard',{ state: { user } });
        } catch (err) {
            if (err.response) {
                // If the server responds with an error status
                setError(err.response.data.message);
            } else {
                // For other errors (e.g., network issues)
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="main">
                <div className='login-details'>
                    <h2>Welcome back!</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            type='email'
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /><br />
                        <label htmlFor="password">Password</label>
                        <input
                            type='password'
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /><br />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <center><a href="signup">Don't have an account? Sign up</a></center>
                        <center><button type="submit" className='login-btn'>Login</button></center>
                    </form>
                </div>
                <img src={image} alt="logo" style={{ height: 500, width: 700, position: 'absolute', left: 700, top: 80, display: 'flex' }} />
            </div>
        </div>
    );
};

export default Login;
