import { useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { products as initialProducts } from "../data/Products";
import Modal from "../ui/Modal";

function Products() {
  // =====================================================
  // PRODUCTS STATE
  // =====================================================

  const [products, setProducts] = useState(initialProducts);

  // =====================================================
  // SEARCH STATE
  // =====================================================

  const [searchTerm, setSearchTerm] = useState("");

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [isModalOpen, setIsModalOpen] = useState(false);

  // =====================================================
  // EDIT MODE
  // =====================================================

  const [editingProduct, setEditingProduct] = useState(null);

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
  });

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.status.toLowerCase().includes(search)
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
    setEditingProduct(null);

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
    });

    setIsModalOpen(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
    });

    setIsModalOpen(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
    });
  };

  // =====================================================
  // CREATE / UPDATE PRODUCT
  // =====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      formData.price === "" ||
      formData.stock === ""
    ) {
      return;
    }

    // -------------------------------------------------
    // UPDATE PRODUCT
    // -------------------------------------------------

    if (editingProduct) {
      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: formData.name.trim(),
                category: formData.category.trim(),
                price: Number(formData.price),
                stock: Number(formData.stock),
                status: formData.status,
              }
            : product
        )
      );

      handleCloseModal();

      return;
    }

    // -------------------------------------------------
    // CREATE PRODUCT
    // -------------------------------------------------

    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      status: formData.status,
    };

    setProducts((previousProducts) => [
      newProduct,
      ...previousProducts,
    ]);

    handleCloseModal();
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDeleteProduct = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== productId)
    );
  };

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
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
          <h1 className="text-3xl font-bold text-white">
            Products
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your products and services.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <Plus size={18} />

          Add Product
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
            placeholder="Search products..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>
      </div>

      {/* ================================================
          PRODUCTS TABLE
      ================================================ */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            {/* Table Header */}

            <thead className="border-b border-slate-800 bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}

            <tbody className="divide-y divide-slate-800">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="transition hover:bg-slate-900/70"
                  >
                    {/* Product */}

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">
                        {product.name}
                      </p>
                    </td>

                    {/* Category */}

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-400">
                        {product.category}
                      </p>
                    </td>

                    {/* Price */}

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">
                        {formatPrice(product.price)}
                      </p>
                    </td>

                    {/* Stock */}

                    <td className="px-6 py-4">
                      <span
                        className={
                          product.stock === 0
                            ? "text-sm font-medium text-red-400"
                            : "text-sm text-slate-300"
                        }
                      >
                        {product.stock === 0
                          ? "Out of stock"
                          : product.stock}
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          product.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit */}

                        <button
                          type="button"
                          onClick={() =>
                            handleOpenEditModal(product)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-400"
                          title="Edit product"
                        >
                          <Pencil size={16} />
                        </button>

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteProduct(product.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                          title="Delete product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* =========================================
                   EMPTY SEARCH RESULT
                ========================================= */

                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-slate-400">
                      No products found
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
          CREATE / EDIT MODAL
      ================================================ */}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingProduct
            ? "Edit Product"
            : "Add Product"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Product Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          {/* Category */}

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Category
            </label>

            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g. Development"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          {/* Price */}

          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Price
            </label>

            <input
              id="price"
              type="number"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          {/* Stock */}

          <div>
            <label
              htmlFor="stock"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Stock
            </label>

            <input
              id="stock"
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="Enter stock quantity"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
              {editingProduct
                ? "Update Product"
                : "Create Product"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Products;