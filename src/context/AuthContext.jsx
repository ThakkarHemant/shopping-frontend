import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // When the app loads, check if the user already has a token saved in their browser
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token: token });
        }
        setLoading(false);
    }, []);

    // The function to call when they successfully log in
    const login = (token) => {
        localStorage.setItem('token', token);
        setUser({ token: token });
    };

    // The function to call when they hit the 'Log Out' button
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};