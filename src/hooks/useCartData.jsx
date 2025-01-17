"use client"

import {useState, useEffect} from 'react'
import api from '@/api'

function useCartData() {
    const [cartItems, setCartItems] = useState([])
    const [cartCode, setCartCode] = useState(null);
    const [cartTotal, setCartTotal] = useState(0)
    // const [userEmail, setUserEmail] = useState(null);
    const tax = 4.00
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const storedCartCode = localStorage.getItem("cart_code");
        setCartCode(storedCartCode);
    }, []);

    useEffect(() => {
        setLoading(true)
        if (cartCode) {
            api.get(`get_cart?cart_code=${cartCode}`)
            .then(res => {
                console.log(res.data);
                setLoading(false)
                setCartItems(res.data.items)
                setCartTotal(res.data.sum_total)
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false)
            });
        }
    }, [cartCode])

    // useEffect(() => {
    //     setLoading(true)
    //     if (userEmail) {
    //         api.get("get_user_email")
    //         .then(res => {
    //             console.log(res.data);
    //             setLoading(false)
    //             setUserEmail(res.data.email)
    //         })
    //         .catch(err => {
    //             console.log(err.message);
    //             setLoading(false)
    //         });
    //     }
    // }, [])

    return {cartItems, cartCode, setCartItems, cartTotal, setCartTotal, loading, tax}
}

export default useCartData