"use client"

import {useState, useEffect} from 'react'
import api from '@/api'

function useCartData() {
    const [cartItems, setCartItems] = useState([])
    const [cartCode, setCartCode] = useState(null);
    const [cartTotal, setCartTotal] = useState(0)
    const tax = 4.00
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const storedCartCode = localStorage.getItem("cart_code");
        if (storedCartCode) {
            setCartCode(storedCartCode);
        }
    }, []);

    useEffect(() => {
        if (!cartCode) return;

        setLoading(true);
        api.get(`cart/?cart_code=${cartCode}`)
        .then(res => {
            console.log(res.data);
            setCartItems(res.data.items || [])
            setCartTotal(res.data.sum_total || 0)
        })
        .catch(err => {
            console.log(err.message);
            setLoading(false)
        })
        .finally(() => {
            setLoading(false);
        });
    }, [cartCode])

    return {cartItems, cartCode, setCartItems, cartTotal, setCartTotal, loading, tax}
}

export default useCartData