import { useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { customers as initialCustomers } from "../data/Customers";
import Modal from "../ui/Modal";

function Customers() {
  // -----------------------------
  // Customers State
  // -----------------------------

  const [customers, setCustomers] = useState(initialCustomers);

  // -----------------------------
  // Search State
  // -----------------------------

  const [searchTerm, setSearchTerm] = useState("");

  // -----------------------------
  // Modal State
  // -----------------------------

  const [isModalOpen, setIsModalOpen] = useState(false);






  // -----------------------------
  // Edit Mode State
  // -----------------------------

  const [editingCustomer, setEditingCustomer] = useState(null);

  // -----------------------------
  // Form State
  // -----------------------------

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    return (
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.company.toLowerCase().includes(search)
    );
  });

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // OPEN CREATE MODAL
  // =====================================================

  const handleOpenCreateModal = () => {
    setEditingCustomer(null);

    setFormData({
      name: "",
      email: "",
      company: "",
    });

    setIsModalOpen(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleOpenEditModal = (customer) => {
    setEditingCustomer(customer);

    setFormData({
      name: customer.name,
      email: customer.email,
      company: customer.company,
    });

    setIsModalOpen(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);

    setFormData({
      name: "",
      email: "",
      company: "",
    });
  };

  // =====================================================
  // CREATE / UPDATE CUSTOMER
  // =====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.company.trim()
    ) {
      return;
    }

    // -------------------------------------------------
    // UPDATE CUSTOMER
    // -------------------------------------------------

    if (editingCustomer) {
      setCustomers((previousCustomers) =>
        previousCustomers.map((customer) =>
          customer.id === editingCustomer.id
            ? {
                ...customer,
                name: formData.name.trim(),
                email: formData.email.trim(),
                company: formData.company.trim(),
              }
            : customer,
        ),
      );

      handleCloseModal();

      return;
    }

    // -------------------------------------------------
    // CREATE CUSTOMER
    // -------------------------------------------------

    const newCustomer = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      status: "Active",
      joined: new Date().toISOString().split("T")[0],
    };

    setCustomers((previousCustomers) => [newCustomer, ...previousCustomers]);

    handleCloseModal();
  };

  // =====================================================
  // DELETE CUSTOMER
  // =====================================================

  const handleDeleteCustomer = (customerId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmed) {
      return;
    }

    setCustomers((previousCustomers) =>
      previousCustomers.filter((customer) => customer.id !== customerId),
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div>
      {/* ================================================
          PAGE HEADER
      ================================================ */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Customers</h1>

          <p className="mt-2 text-slate-400">
            Manage your customers and their information.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {/* ================================================
          SEARCH
      ================================================ */}

      <div className="mt-8">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search customers..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>
      </div>

      {/* ================================================
          CUSTOMERS TABLE
      ================================================ */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            {/* Table Header */}

            <thead className="border-b border-slate-800 bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Company
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Joined
                </th>

                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}

            <tbody className="divide-y divide-slate-800">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-slate-900/70"
                  >
                    {/* Customer */}

                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {customer.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {customer.email}
                        </p>
                      </div>
                    </td>

                    {/* Company */}

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-300">
                        {customer.company}
                      </p>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          customer.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    {/* Joined */}

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-400">
                        {customer.joined}
                      </p>
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit */}

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(customer)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-400"
                          title="Edit customer"
                        >
                          <Pencil size={16} />
                        </button>

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                          title="Delete customer"
                        >
                          <Trash2 size={16} />
                        </button>

                        {/* view */}
                        <Link
                          to={`/customers/${customer.id}`}
                          className="text-blue-500"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* =========================================
                   EMPTY SEARCH RESULT
                ========================================= */

                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-slate-400">
                      No customers found
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Try changing your search term.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================================================
          CREATE / EDIT CUSTOMER MODAL
      ================================================ */}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCustomer ? "Edit Customer" : "Add Customer"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter customer name"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          {/* Email */}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          {/* Company */}

          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Company
            </label>

            <input
              id="company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Enter company name"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          {/* Form Actions */}

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
              {editingCustomer ? "Update Customer" : "Create Customer"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Customers;
