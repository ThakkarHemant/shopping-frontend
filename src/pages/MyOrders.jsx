import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Fetch the user's secure order history from the EKS backend
                const response = await api.get('/orders/');
                setOrders(response.data);
            } catch (err) {
                setError('Could not load order history. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl px-6 py-8 mx-auto">
                <h1 className="mb-8 text-3xl font-extrabold text-gray-900">My Order History</h1>

                {loading ? (
                    <p className="text-lg text-gray-600">Loading your orders...</p>
                ) : error ? (
                    <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>
                ) : orders.length === 0 ? (
                    <div className="p-8 text-center bg-white border border-gray-200 rounded-xl shadow-sm">
                        <p className="mb-4 text-lg text-gray-600">You haven't placed any orders yet.</p>
                        <Link to="/home" className="font-medium text-blue-600 hover:text-blue-500">
                            Start shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Order ID: #{order.id}</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            Placed on: {new Date(order.created_at || Date.now()).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <p className="text-lg font-bold text-gray-900">${order.total_amount.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Displaying the individual items inside the order */}
                                <ul className="space-y-3">
                                    {order.items && order.items.map((item, index) => (
                                        <li key={index} className="flex justify-between text-sm text-gray-700">
                                            <span>Product #{item.product_id} (x{item.quantity})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}