"use client"

import api from '@/api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const VerifyEmail = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const [otp, setOtp] = useState("")
    const [message, setMessage] = useState("")

    const handleVerify = e => {
        e.preventDefault()
        api.post("/verify_otp/", {email, otp})
        .then(res => {
            setMessage("Email verified successfully!")
            setTimeout(() => {
                router.push("/login")
            }, 2000);
        })
        .catch(err => setMessage(err.response?.data?.error || "Invalid OTP"))
    }
    return (
        <div className="bg-gray-100 flex justify-center min-h-screen">
            <div className="p-6 rounded w-full max-w-md bg-white shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Verify Your Email</h2>
                <p className="text-gray-600 mb-4">An OTP was sent to {email}. Enter it below to verify your account.</p>
                <form onSubmit={handleVerify}>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    required
                />
                <button type="submit" className="w-full mt-4 bg-indigo-600 text-white p-2 rounded">Verify</button>
                </form>
                {message && <p className="text-green-500 mt-4">{message}</p>}
            </div>
        </div>
    )
}
