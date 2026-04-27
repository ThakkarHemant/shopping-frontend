import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './AuthContext'; // <-- 1. Import the AuthProvider
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import CustomerHome from './pages/CustomerHome';
import Cart from './pages/Cart';
import SellerDashboard from './pages/SellerDashboard';
import MyOrders from './pages/MyOrders';
import Profile from './Profile'; // <-- 2. Import the new Profile page

export default function App() {
  return (
    /* 3. Wrap the entire app in AuthProvider so every page has access to the user's login state */
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/seller" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

              {/* 4. Add the protected route for the Profile page */}
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

              {/* The Home page is locked behind the security guard */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <CustomerHome />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}