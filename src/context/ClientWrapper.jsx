'use client';

import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";


export default function ClientWrapper({ children }) {
    return (
        <AuthProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </AuthProvider>
    );
}