"use client"

import { BASE_URL } from "@/api"
import { FormatDate } from "@/FormatDate";

export function OrderHistoryItem({ items }) {

  const { order_date, total, order_id } = items[0];

    return (
      <div>
        <h3 className="sr-only">
          Order placed on <time dateTime={FormatDate(order_date)}>{FormatDate(order_date)}</time>
        </h3>
        <div className="rounded-lg bg-gray-50 px-4 py-6">
          <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-full lg:flex-none lg:gap-x-8">
            <div className="flex justify-between sm:block">
              <dt className="font-medium text-gray-900">Date placed</dt>
              <dd className="sm:mt-1">
                <time dateTime={FormatDate(order_date)}>{FormatDate(order_date)}</time>
              </dd>
            </div>
            <div className="flex justify-between pt-6 sm:block sm:pt-0">
              <dt className="font-medium text-gray-900">Order ID</dt>
              <dd className="sm:mt-1">{order_id}</dd>
            </div>
            <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
              <dt>Total amount</dt>
              <dd className="sm:mt-1">{total}</dd>
            </div>
          </dl>
        </div>
  
        <table className="mt-4 w-full text-gray-500 sm:mt-6">
          <caption className="sr-only">Products</caption>
          <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
            <tr>
              <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-4/5">
                Product
              </th>
              <th scope="col" className="hidden w-full py-3 pr-8 font-normal sm:table-cell">
                Price
              </th>
              <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-6 pr-8">
                  <div className="flex items-center">
                    <img
                      alt="product image"
                      src={`${BASE_URL}${item.product.image}`}
                      className="mr-6 size-16 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{item.product.name}</div>
                      <div className="mt-1 sm:hidden">Quantity: {item.quantity}</div>
                      <div className="mt-1 sm:hidden">{item.product.price}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden py-6 pr-8 sm:table-cell">{item.product.price}</td>
                <td className="hidden py-6 pr-8 sm:table-cell">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}