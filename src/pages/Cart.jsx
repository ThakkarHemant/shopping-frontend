import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Cart() {
    const { cart, removeFromCart, clearCart, cartTotal } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        setIsCheckingOut(true);
        setError('');

        try {
            // Send the order to your EKS backend
            // Adjust the payload structure if your FastAPI expects something specific!
            await api.post('/orders/', {
                total_amount: cartTotal,
                items: cart.map(item => ({ product_id: item.id, quantity: item.quantity }))
            });

            setSuccess(true);
            clearCart(); // Empty the cart memory

            // Give them a second to see the success message, then route to their order history
            setTimeout(() => {
                navigate('/orders');
            }, 2000);

        } catch (err) {
            setError('Checkout failed. Please try again.');
            console.error(err);
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl px-6 py-8 mx-auto">
                <h1 className="mb-8 text-3xl font-extrabold text-gray-900">Your Shopping Cart</h1>

                {success && (
                    <div className="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-lg">
                        Payment successful! Your order has been placed.
                    </div>
                )}

                {error && (
                    <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
                        {error}
                    </div>
                )}

                {cart.length === 0 && !success ? (
                    <div className="p-8 text-center bg-white border border-gray-200 rounded-xl shadow-sm">
                        <p className="mb-4 text-lg text-gray-600">Your cart is completely empty.</p>
                        <Link to="/home" className="font-medium text-blue-600 hover:text-blue-500">
                            Go back to the store
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {cart.map((item) => (
                                <li key={item.id} className="flex items-center justify-between p-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-lg font-bold text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-sm font-medium text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">Total: ${cartTotal.toFixed(2)}</span>
                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut || success}
                                className={`px-6 py-3 font-medium text-white rounded-lg transition-colors ${isCheckingOut || success ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {isCheckingOut ? 'Processing...' : 'Complete Checkout'}
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}