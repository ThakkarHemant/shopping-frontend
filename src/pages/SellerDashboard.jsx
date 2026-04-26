import React, { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function SellerDashboard() {
    const [formData, setFormData] = useState({ name: '', description: '', price: '', stock: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            await api.post('/products/', {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            });
            setMessage('Success! Product added to the live database.');
            setFormData({ name: '', description: '', price: '', stock: '' });
        } catch (err) {
            setMessage('Error: Could not add product. Check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // UPGRADE 1: The Sweeping Mesh Gradient Background
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
            <Navbar />

            <main className="max-w-5xl px-6 py-12 mx-auto">
                {/* UPGRADE 2: A "Stats" header to make it look like a real control panel */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600">
                        Seller Command Center
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 font-medium">Manage your inventory and track live deployments.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: The Form */}
                    <div className="lg:col-span-2">
                        {/* UPGRADE 3: The "Glassmorphism" Card (bg-white/80 + backdrop-blur) */}
                        <div className="p-8 bg-white/80 backdrop-blur-xl border border-white shadow-2xl ring-1 ring-black/5 rounded-2xl">
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">Deploy New Product</h2>

                            {message && (
                                <div className={`p-4 mb-6 text-sm font-medium rounded-xl border ${message.includes('Error') ? 'text-red-700 bg-red-50 border-red-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200'}`}>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-gray-700">Product Name</label>
                                    <input
                                        type="text" name="name" required value={formData.name} onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="e.g., Quantum Compute Node"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-gray-700">Detailed Description</label>
                                    <textarea
                                        name="description" required rows="4" value={formData.description} onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Technical specifications and details..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 text-sm font-semibold text-gray-700">Listing Price ($)</label>
                                        <input
                                            type="number" name="price" step="0.01" min="0" required value={formData.price} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="299.99"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-semibold text-gray-700">Initial Stock</label>
                                        <input
                                            type="number" name="stock" min="0" required value={formData.stock} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="100"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit" disabled={isSubmitting}
                                    className={`w-full px-6 py-4 mt-4 font-bold text-white rounded-xl shadow-lg transition-all transform hover:-translate-y-1 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 hover:shadow-cyan-500/25'
                                        }`}
                                >
                                    {isSubmitting ? 'Pushing to Database...' : 'Launch Product to Storefront'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* UPGRADE 4: A Sidebar to balance the layout and look professional */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl text-white">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">System Status</h3>
                            <div className="mt-4 flex items-center space-x-3">
                                <span className="flex w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="font-medium text-emerald-400">EKS Cluster Online</span>
                            </div>
                            <p className="mt-4 text-sm text-gray-300">Your backend tunnel is currently routing traffic securely.</p>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}