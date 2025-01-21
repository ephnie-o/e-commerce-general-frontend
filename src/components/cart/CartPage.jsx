"use client"

import CartItem from './CartItem'
import CartSummary from './CartSummary'
import Link from 'next/link'
import Spinner from '../ui/Spinner'
import useCartData from '@/hooks/useCartData'


const CartPage = () => {

  const {cartItems, setCartItems, cartTotal, setCartTotal, loading, tax} = useCartData()


  if(loading){
    return <Spinner loading={loading} />
  }

  if(cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
            <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
            <p className="mt-2 text-sm text-gray-500">No items have been added to your cart yet.</p>
            <Link
              href="/"
              className="mt-6 inline-block px-4 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Continue Shopping
            </Link>
        </div>
    )
  }

  return (
    <main className="px-4 pb-24 pt-16 sm:px-6 lg:px-8 bg-gray-100">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
      <h2 id="cart-heading" className="sr-only">
        Items in your shopping cart
      </h2>
      <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <div className="lg:col-span-8">
        {cartItems.map((item) => (
            <CartItem key={item.id} item={item} setCartTotal={setCartTotal} cartItems={cartItems} setCartItems={setCartItems} />
        ))}
      </div>

        {/* Order summary */}
        <div className="lg:col-span-4">
        <CartSummary cartTotal={cartTotal} tax={tax} />
        </div>
      </form>
      </main>
  )
}

export default CartPage