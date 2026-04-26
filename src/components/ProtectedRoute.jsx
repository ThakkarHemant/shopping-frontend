import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        // No token found? Redirect them to the login screen immediately.
        return <Navigate to="/login" replace />;
    }

    // If they have a token, allow them to see the page
    return children;
}