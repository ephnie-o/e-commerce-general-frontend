"use client"

import useCartData from '@/hooks/useCartData'
import React from 'react'
import OrderSummary from './OrderSummary'
import PaymentSection from './PaymentSection'

const CheckoutPage = () => {

  const {cartItems, cartTotal, tax} = useCartData()

  return (
    <main className="bg-gray-100 px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-8 lg:px-8 xl:px-2 xl:pt-14">
      <h1 className="sr-only">Checkout</h1>

      <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
        <OrderSummary cartItems={cartItems} cartTotal={cartTotal} tax={tax} />

        <PaymentSection />
      </div>
    </main>
  )
}

export default CheckoutPage