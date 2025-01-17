import { BsFillQuestionCircleFill } from "react-icons/bs";
import Link from 'next/link'

const CartSummary = ({cartTotal, tax}) => {

    const subTotal = cartTotal.toFixed(2)
    const cartTax = tax.toFixed(2)
    const total = (cartTotal + tax).toFixed(2)

  return (
    <section
        aria-labelledby="summary-heading"
        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
            Order summary
        </h2>

        <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-600">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">{`$${subTotal}`}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <Link href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Learn more about how tax is calculated</span>
                <BsFillQuestionCircleFill aria-hidden="true" className="size-5" />
                </Link>
            </dt>
            <dd className="text-sm font-medium text-gray-900">{`$${cartTax}`}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="text-base font-medium text-gray-900">Order total</dt>
            <dd className="text-base font-medium text-gray-900">{`$${total}`}</dd>
            </div>
        </dl>

        <div className="mt-6">
            <Link href="/checkout">
                <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                Proceed to Checkout
                </button>
            </Link>
        </div>
    </section>
  )
}

export default CartSummary