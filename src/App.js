import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute'; // <-- Import the guard

import Login from './pages/Login';
import Register from './pages/Register';
import CustomerHome from './pages/CustomerHome';
import Cart from './pages/Cart';
import SellerDashboard from './pages/SellerDashboard';
import MyOrders from './pages/MyOrders';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/seller" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

            {/* The Home page is now locked behind the security guard */}
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
  );
}