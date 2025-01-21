"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import api from "@/api"
import { useCart } from "@/context/CartContext"

const PaymentStatusPage = () => {

    const [statusMessage, setStatusMessage] = useState('Verifying your payment!')
    const [statusSubMessage, setStatusSubMessage] = useState('Wait a moment, your payment is being verified...')
    const {setNumCartItems} = useCart();
    const queryParams = useSearchParams()

    useEffect(() => {
        const status = queryParams.get('status');
        const txRef = queryParams.get('tx_ref');
        const transactionId = queryParams.get('transaction_id');

        if (status && txRef && transactionId) {
            api.post(`payment/payment_callback/?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`)
            .then(res => {
                setStatusMessage(res.data.message)
                setStatusSubMessage(res.data.subMessage)
                localStorage.removeItem("cart_code")
                setNumCartItems(0)
            })
            .catch(err => {
                console.log(err.message)
                setStatusMessage("Payment Verification Failed!");
                setStatusSubMessage("Please try again or contact support.");
            })
        }

    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <div className="text-center">
                    <div>
                        <h1 className="text-3xl font-bold text-green-600">{statusMessage}</h1>
                        <p className="text-gray-600 mt-2">{statusSubMessage}</p>
                        <div className="mt-5 mb-5">
                            <Link
                                href="/profile"
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                View Order Details
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/"
                                className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Continue shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentStatusPage