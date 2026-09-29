import { customers } from "../data/Customers";
import { products } from "../data/Products";
import { orders } from "../data/orders";

const statusStyles = {
  Completed: "bg-emerald-500/10 text-emerald-400",
  Processing: "bg-blue-500/10 text-blue-400",
  Pending: "bg-yellow-500/10 text-yellow-400",
  Cancelled: "bg-red-500/10 text-red-400",
};

function RecentOrders() {
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const getCustomerName = (customerId) => {
    const customer = customers.find(
      (customer) => customer.id === customerId
    );

    return customer ? customer.name : "Unknown Customer";
  };

  const getProductName = (productId) => {
    const product = products.find(
      (product) => product.id === productId
    );

    return product ? product.name : "Unknown Product";
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest customer orders
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recentOrders.length > 0 ? (
          recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {getCustomerName(order.customerId)}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                  #{order.id} · {getProductName(order.productId)}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-medium text-white">
                  ${order.total.toLocaleString()}
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-2 py-1 text-xs ${
                    statusStyles[order.status] ||
                    "bg-slate-800 text-slate-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-sm text-slate-500">
            No orders available.
          </p>
        )}
      </div>
    </div>
  );
}

export default RecentOrders;