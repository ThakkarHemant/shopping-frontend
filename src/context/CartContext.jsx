import React, { createContext, useState, useContext } from 'react';

// Create the invisible "bubble" that holds our data
const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Advanced logic to either add a new item or increase the quantity if it's already in the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => setCart([]);

    // Auto-calculating math variables for the UI
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

// A custom hook so our pages can easily grab the cart data
export const useCart = () => useContext(CartContext);