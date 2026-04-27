import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import api from '../services/api';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // If the user is logged in, fetch their private details from the EKS backend
        const fetchProfile = async () => {
            try {
                // Adjust this URL if your FastAPI backend uses a different endpoint for user data (like /users/me)
                const response = await api.get('/profile');
                setProfileData(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch profile data.');
                // If the backend rejects the token (e.g., it expired), log them out automatically
                if (err.response && err.response.status === 401) {
                    logout();
                }
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user, logout]);

    // If they are not logged in, bounce them
    if (!user) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Access Denied</h2>
                <p>You must be logged in to view this page.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Your Profile</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {profileData ? (
                <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
                    <p><strong>Username:</strong> {profileData.username}</p>
                    {/* Add any other data your FastAPI backend returns here */}
                    <button
                        onClick={logout}
                        style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                <p>Loading your secure data...</p>
            )}
        </div>
    );
};

export default Profile;