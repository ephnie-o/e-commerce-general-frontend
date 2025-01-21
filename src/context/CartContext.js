import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [numCartItems, setNumCartItems] = useState(0);

    return (
        <CartContext.Provider value={{ numCartItems, setNumCartItems }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};