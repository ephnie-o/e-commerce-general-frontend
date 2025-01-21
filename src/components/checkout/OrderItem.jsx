import { BASE_URL } from "@/api"

const OrderItem = ({cartitem}) => {
  return (
    <div className="flow-root">
      <div role="list" className="-my-6 divide-y divide-gray-200">
        <div className="flex space-x-6 py-6 mb-3">
          <img
            alt={cartitem.product.name}
            src={`${BASE_URL}${cartitem.product.image}`}
            className="size-24 flex-none rounded-md bg-gray-100 object-cover"
          />
          <div className="flex-auto">
            <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
              <div className="flex-auto space-y-1 text-sm font-medium">
                <h3 className="text-gray-900">
                  {cartitem.product.name}
                </h3>
                <p className="text-gray-900">{`Quantity: ${cartitem.quantity}`}</p>
              </div>
              <div className="flex flex-none space-x-4">
                  <p className="text-gray-900">{`$${cartitem.product.price}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem