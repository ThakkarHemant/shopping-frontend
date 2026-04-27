import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // FastAPI OAuth2 requires Form Data, NOT JSON!
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const response = await api.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            // Point this to your EKS tunnel port (8080)

            // const response = await axios.post('http://localhost:8080/login', formData, {
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            // });

            // Save the secure token to the browser
            const token = response.data.access_token;
            localStorage.setItem('token', token);

            // Redirect the user to the Customer Home Page
            navigate('/home');

        } catch (err) {
            // Display the error from the backend if it exists (e.g., "Incorrect password")
            if (err.response && err.response.data) {
                setError(err.response.data.detail);
            } else {
                setError('Cannot connect to the server. Is the tunnel open?');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg border border-gray-100">

                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your shopping account
                    </p>
                </div>

                {/* Error Notification */}
                {error && (
                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                        <span className="font-medium">Login Failed:</span> {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4 shadow-sm">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                required
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Don't have an account? </span>
                    {/* This Link tells React Router to swap to the Register page without reloading the browser */}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
}