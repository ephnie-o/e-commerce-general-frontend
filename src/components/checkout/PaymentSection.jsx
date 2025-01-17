"use client"

import { FaCcVisa } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { useState } from "react";
import api from "@/api";

const PaymentSection = () => {

  const cart_code = localStorage.getItem("cart_code")
  const [loading, setLoading] = useState(false)

  function makePayment() {
    api.post("initiate_payment/", {cart_code})
    .then(res => {
      console.log(res.data)
      window.location.href = res.data.data.link
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  return (
    <div className="mx-auto w-full max-w-lg">
        <div className="lg:sr-only flex justify-between border-t border-gray-200 pt-6 text-gray-900"></div>
            <h2 className="mb-7 text-lg font-medium text-gray-900">Payment Options</h2>
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <IoPhonePortraitOutline className="h-5 mr-5 w-auto" />
              <span>Pay with Momo</span>
            </button>

            <button
              type="button"
              onClick={makePayment}
              className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <FaCcVisa className="h-5 mr-5 w-auto" />
              Pay with Visa Card
            </button>

            <form className="mt-6">
              <div className="mt-6 flex gap-3">
                <div className="flex h-5 shrink-0 items-center">
                  <div className="group grid size-4 grid-cols-1">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                    <svg
                      fill="none"
                      viewBox="0 0 14 14"
                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-[:checked]:opacity-100"
                      />
                      <path
                        d="M3 7H11"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                      />
                    </svg>
                  </div>
                </div>
                <label htmlFor="terms" className="text-sm text-gray-500">
                  I have read the terms and conditions and agree to the sale of my personal information to the highest
                  bidder.
                </label>
              </div>

            </form>
          </div>
  )
}

export default PaymentSection