import axios from 'axios';

// Create a central connection to your EKS tunnel
const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// Intercept every request before it leaves the browser and attach the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;