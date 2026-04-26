import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductCard({ product, onAddToCart }) {
    const isOutOfStock = product.stock === 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;

    const [imageUrl, setImageUrl] = useState('');
    const [imgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        // 1. Check if we already have the image to prevent spamming the API
        let isMounted = true;

        const fetchImage = async () => {
            try {
                const apiKey = process.env.REACT_APP_UNSPLASH_KEY;
                if (!apiKey) throw new Error("No API key found");

                // Search Unsplash for the exact product name
                const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                    params: { query: product.name, per_page: 1, orientation: 'landscape' },
                    headers: { Authorization: `Client-ID ${apiKey}` }
                });

                if (isMounted && response.data.results.length > 0) {
                    // Grab the URL of the first matching image
                    setImageUrl(response.data.results[0].urls.regular);
                } else {
                    throw new Error("No image found for this term");
                }
            } catch (error) {
                // THE FALLBACK: If we hit a rate limit or find no image, use the stable seed!
                if (isMounted) {
                    setImageUrl(`https://picsum.photos/seed/${product.id + 100}/400/300`);
                }
            }
        };

        fetchImage();

        return () => { isMounted = false; };
    }, [product.name, product.id]);

    return (
        <div className="flex flex-col justify-between w-full max-w-sm p-6 bg-white border border-gray-100 shadow-lg rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            {/* Dynamic Image Container */}
            <div className="relative flex items-center justify-center mb-6 overflow-hidden bg-gray-100 h-56 rounded-2xl">
                {/* Pulsing skeleton while waiting for Unsplash */}
                {!imgLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}

                {/* Only render the image tag if we have a URL */}
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={product.name}
                        onLoad={() => setImgLoaded(true)}
                        className={`object-cover w-full h-full transition-all duration-700 hover:scale-110 ${imgLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                            }`}
                    />
                )}
            </div>

            <div className="flex-grow">
                <h5 className="mb-3 text-2xl font-bold tracking-tight leading-tight text-gray-900">
                    {product.name}
                </h5>
                <p className="mb-6 text-base text-gray-500 line-clamp-2">{product.description}</p>
            </div>

            {/* Relaxed spacing at the bottom */}
            <div className="mt-auto">
                <span className="block mb-4 text-3xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>

                {isOutOfStock ? (
                    <p className="mb-4 text-sm font-semibold text-red-500">Out of Stock</p>
                ) : isLowStock ? (
                    <p className="mb-4 text-sm font-semibold text-orange-500">Only {product.stock} left in stock!</p>
                ) : (
                    <p className="mb-4 text-sm font-medium text-emerald-600">In Stock</p>
                )}

                <button
                    onClick={() => onAddToCart(product)}
                    disabled={isOutOfStock}
                    className={`w-full font-bold rounded-xl text-base px-6 py-3.5 text-center transition-all ${isOutOfStock
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'text-white bg-gray-900 hover:bg-gray-800 shadow-md hover:shadow-lg'
                        }`}
                >
                    {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}