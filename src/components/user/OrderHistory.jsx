import { OrderHistoryItem } from './OrderHistoryItem';

export default function OrderHistory({orderItems}) {

  const orders = orderItems.reduce((acc, item) => {
    const { order_id } = item;
    if (!acc[order_id]) {
      acc[order_id] = [];
    }
    acc[order_id].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and download invoices.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>

          <div className="space-y-20">
            {Object.entries(orders).map(([order_id, items]) => (
              <OrderHistoryItem key={order_id} items={items} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}