import { useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { orders as initialOrders } from "../data/orders";
import { customers } from "../data/Customers";
import { products } from "../data/Products";
import Modal from "../ui/Modal";

function Orders() {
  const [orders, setOrders] = useState(initialOrders);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingOrder, setEditingOrder] = useState(null);

  const [formData, setFormData] = useState({
    customerId: "",
    productId: "",
    quantity: 1,
    status: "Pending",
  });

  const filteredOrders = orders.filter((order) => {
    const customer = customers.find(
      (customer) => customer.id === order.customerId
    );

    const product = products.find(
      (product) => product.id === order.productId
    );

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      customer?.name.toLowerCase().includes(search) ||
      product?.name.toLowerCase().includes(search) ||
      String(order.id).includes(search);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const selectedProduct = products.find(
    (product) => product.id === Number(formData.productId)
  );

  const total = selectedProduct
    ? selectedProduct.price * Number(formData.quantity || 0)
    : 0;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleOpenCreateModal = () => {
    setEditingOrder(null);

    setFormData({
      customerId: "",
      productId: "",
      quantity: 1,
      status: "Pending",
    });

    setIsModalOpen(true);
  };

  const handleOpenEditModal = (order) => {
    setEditingOrder(order);

    setFormData({
      customerId: order.customerId,
      productId: order.productId,
      quantity: order.quantity,
      status: order.status,
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setEditingOrder(null);

    setFormData({
      customerId: "",
      productId: "",
      quantity: 1,
      status: "Pending",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.customerId ||
      !formData.productId ||
      Number(formData.quantity) < 1
    ) {
      return;
    }

    const orderData = {
      customerId: Number(formData.customerId),
      productId: Number(formData.productId),
      quantity: Number(formData.quantity),
      total,
      status: formData.status,
    };

    if (editingOrder) {
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === editingOrder.id
            ? {
                ...order,
                ...orderData,
              }
            : order
        )
      );

      handleCloseModal();
      return;
    }

    const newOrder = {
      id: Date.now(),
      ...orderData,
      date: new Date().toISOString().split("T")[0],
    };

    setOrders((previousOrders) => [
      newOrder,
      ...previousOrders,
    ]);

    handleCloseModal();
  };

  const handleDeleteOrder = (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    setOrders((previousOrders) =>
      previousOrders.filter((order) => order.id !== orderId)
    );
  };

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
    <div>
      {/* Page Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Orders
          </h1>

          <p className="mt-2 text-slate-400">
            Manage customer orders and their status.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <Plus size={18} />
          Add Order
        </button>
      </div>

      {/* Search + Filter */}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative max-w-md flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search orders..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="border-b border-slate-800 bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Order
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Customer
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

                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-slate-900/70"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">
                        #{order.id}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-300">
                        {getCustomerName(order.customerId)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-300">
                        {getProductName(order.productId)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-400">
                        {order.quantity}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">
                        ${order.total.toLocaleString()}
                      </p>
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

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-400">
                        {order.date}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenEditModal(order)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-400"
                          title="Edit order"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteOrder(order.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                          title="Delete order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-slate-400">
                      No orders found
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingOrder ? "Edit Order" : "Add Order"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Customer */}

          <div>
            <label
              htmlFor="customerId"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Customer
            </label>

            <select
              id="customerId"
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="">Select customer</option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product */}

          <div>
            <label
              htmlFor="productId"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Product
            </label>

            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="">Select product</option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name} — ${product.price}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}

          <div>
            <label
              htmlFor="quantity"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Quantity
            </label>

            <input
              id="quantity"
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Status */}

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Total Preview */}

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Total
              </span>

              <span className="text-lg font-bold text-white">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
            <button
              type="button"
              onClick={handleCloseModal}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              {editingOrder ? "Update Order" : "Create Order"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Orders;