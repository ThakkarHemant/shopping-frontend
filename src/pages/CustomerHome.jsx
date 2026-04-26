import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

export default function CustomerHome() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Bring in the global cart memory!
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Now using our secure 'api' instead of raw axios
                const response = await api.get('/products/');
                setProducts(response.data);
            } catch (err) {
                console.error('Failed to load products', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar /> {/* Our dynamic Navbar is now handling the top menu */}

            <main className="px-6 py-8 mx-auto max-w-7xl">
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {loading ? (
                    <p className="text-lg text-gray-600">Loading products...</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart} // This now silently adds to memory and updates the Navbar badge!
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}