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


export const useCart = () => useContext(CartContext);