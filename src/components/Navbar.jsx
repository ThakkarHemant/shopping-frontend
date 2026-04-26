import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { cartCount } = useCart();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/home" className="text-2xl font-extrabold text-blue-600 tracking-tight">
                            SecureShop
                        </Link>
                    </div>

                    {/* Menu Items */}
                    <div className="flex items-center space-x-6">
                        <Link to="/orders" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                            My Orders
                        </Link>

                        {/* NEW: Link to the Seller Dashboard */}
                        <Link to="/seller" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                            Seller Panel
                        </Link>

                        {/* UPDATED: Cart is now a Link routing to /cart */}
                        <Link to="/cart" className="relative p-2 text-gray-700 transition-colors hover:text-blue-600">
                            <span className="font-medium">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors bg-red-50 px-3 py-1.5 rounded-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}