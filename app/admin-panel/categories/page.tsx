"use client"

import { Plus, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"

export default function CategoriesManagement() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      products: 245,
      subcategories: 8,
      status: "Active",
    },
    {
      id: 2,
      name: "Fashion",
      slug: "fashion",
      products: 512,
      subcategories: 12,
      status: "Active",
    },
    {
      id: 3,
      name: "Home & Garden",
      slug: "home-garden",
      products: 189,
      subcategories: 5,
      status: "Inactive",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage product categories</p>
        </div>
        <button className="admin-panel-btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Category Name</th>
                <th className="admin-panel-table-header-cell">Slug</th>
                <th className="admin-panel-table-header-cell">Products</th>
                <th className="admin-panel-table-header-cell">Subcategories</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold">{cat.name}</td>
                  <td className="admin-panel-table-cell text-muted-foreground">{cat.slug}</td>
                  <td className="admin-panel-table-cell">{cat.products}</td>
                  <td className="admin-panel-table-cell">{cat.subcategories}</td>
                  <td className="admin-panel-table-cell">
                    <span
                      className={`admin-panel-badge ${
                        cat.status === "Active" ? "admin-panel-badge-success" : "admin-panel-badge-warning"
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="admin-panel-table-cell">
                    <div className="flex gap-2">
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
