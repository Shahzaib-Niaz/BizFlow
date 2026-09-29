import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Mail,
  ShoppingCart,
  User,
} from "lucide-react";

import { customers } from "../data/Customers";
import { products } from "../data/Products";
import { orders } from "../data/orders";

function CustomerDetails() {
  const { id } = useParams();

  const customer = customers.find(
    (customer) => customer.id === Number(id)
  );

  if (!customer) {
    return (
      <div>
        <Link
          to="/customers"
          className="mb-6 inline-flex items-center gap-2 text-sm text-blue-400 transition hover:text-blue-300"
        >
          <ArrowLeft size={16} />
          Back to Customers
        </Link>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-8 text-center">
          <h1 className="text-2xl font-bold text-white">
            Customer Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            The customer you're looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const customerOrders = orders.filter(
    (order) => order.customerId === customer.id
  );

  const totalRevenue = customerOrders.reduce(
    (total, order) => total + order.total,
    0
  );

  const getProductName = (productId) => {
    const product = products.find(
      (product) => product.id === productId
    );

    return product ? product.name : "Unknown Product";
  };

  return (
    <div>
      <Link
        to="/customers"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Customers
      </Link>

      <div className="mt-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Customer Details
          </h1>

          <p className="mt-2 text-slate-400">
            View customer information, orders, and revenue.
          </p>
        </div>

        {/* Customer Profile */}

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              {customer.name.charAt(0)}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">
                {customer.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customer ID: #{customer.id}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />

                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="mt-1 text-sm text-white">
                    {customer.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center gap-3">
                <Building2 size={18} className="text-blue-400" />

                <div>
                  <p className="text-xs text-slate-500">Company</p>
                  <p className="mt-1 text-sm text-white">
                    {customer.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-blue-400" />

                <div>
                  <p className="text-xs text-slate-500">Joined</p>
                  <p className="mt-1 text-sm text-white">
                    {customer.joined}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center gap-3">
                <User size={18} className="text-blue-400" />

                <div>
                  <p className="text-xs text-slate-500">Status</p>

                  <span className="mt-1 inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    {customer.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
                <ShoppingCart size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Total Orders
                </p>

                <p className="mt-1 text-2xl font-bold text-white">
                  {customerOrders.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
            <div>
              <p className="text-sm text-slate-500">
                Total Revenue
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Orders */}

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
          <div className="border-b border-slate-800 px-6 py-5">
            <h2 className="text-lg font-semibold text-white">
              Customer Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Orders placed by this customer.
            </p>
          </div>

          {customerOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="border-b border-slate-800 bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Order
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Quantity
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Total
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {customerOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-slate-900/70"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        #{order.id}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-300">
                        {getProductName(order.productId)}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-400">
                        {order.quantity}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-white">
                        ${order.total.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : order.status === "Processing"
                              ? "bg-blue-500/10 text-blue-400"
                              : order.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-400">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-slate-400">
                No orders found
              </p>

              <p className="mt-1 text-xs text-slate-600">
                This customer has not placed any orders yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;