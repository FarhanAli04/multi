"use client"

import { Plus, Search, Star, Edit2, Trash2, Eye } from "lucide-react"
import { useState } from "react"

export default function ProductsManagement() {
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      sku: "WH-2024-001",
      vendor: "Tech Store",
      price: "$89.99",
      stock: 245,
      rating: 4.5,
      status: "Active",
    },
    {
      id: 2,
      name: "USB-C Cable",
      sku: "USB-2024-002",
      vendor: "Electronics Pro",
      price: "$12.99",
      stock: 1203,
      rating: 4.2,
      status: "Active",
    },
    {
      id: 3,
      name: "Phone Case",
      sku: "PC-2024-003",
      vendor: "Fashion Hub",
      price: "$24.99",
      stock: 89,
      rating: 3.8,
      status: "Inactive",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products Management</h1>
          <p className="text-muted-foreground mt-1">Manage vendor and in-house products</p>
        </div>
        <button className="admin-panel-btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              className="admin-panel-search-input w-full pl-10"
            />
          </div>
        </div>
        <select className="admin-panel-search-input">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home & Garden</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Product</th>
                <th className="admin-panel-table-header-cell">SKU</th>
                <th className="admin-panel-table-header-cell">Vendor</th>
                <th className="admin-panel-table-header-cell">Price</th>
                <th className="admin-panel-table-header-cell">Stock</th>
                <th className="admin-panel-table-header-cell">Rating</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold">{product.name}</td>
                  <td className="admin-panel-table-cell text-muted-foreground">{product.sku}</td>
                  <td className="admin-panel-table-cell">{product.vendor}</td>
                  <td className="admin-panel-table-cell text-primary font-semibold">{product.price}</td>
                  <td className="admin-panel-table-cell">
                    <span className={product.stock > 100 ? "text-green-600" : "text-orange-600"}>{product.stock}</span>
                  </td>
                  <td className="admin-panel-table-cell flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    {product.rating}
                  </td>
                  <td className="admin-panel-table-cell">
                    <span
                      className={`admin-panel-badge ${
                        product.status === "Active" ? "admin-panel-badge-success" : "admin-panel-badge-warning"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="admin-panel-table-cell">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Eye size={16} className="text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Edit2 size={16} className="text-blue-500" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
