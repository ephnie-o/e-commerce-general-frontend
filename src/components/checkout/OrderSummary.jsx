import OrderItem from "./OrderItem"

const OrderSummary = ({cartItems, cartTotal, tax}) => {

    const total = (cartTotal + tax).toFixed(2)

  return (
    <div className="mx-auto w-full max-w-lg">
        <h2 className="sr-only">Order summary</h2>
        {cartItems.map(cartitem => <OrderItem key={cartitem.id} cartitem={cartitem} /> )}

        <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
            <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">{`$${cartTotal.toFixed(2)}`}</dd>
            </div>
                <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">{`$${tax.toFixed(2)}`}</dd>
            </div>
                <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-base">{`$${total}`}</dd>
            </div>
        </dl>
    </div>
  )
}

export default OrderSummary