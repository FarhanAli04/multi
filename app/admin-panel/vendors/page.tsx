"use client"

import { Search, CheckCircle, AlertCircle, Eye, Ban, RotateCw } from "lucide-react"
import { useState } from "react"

export default function VendorsManagement() {
  const [vendors] = useState([
    {
      id: 1,
      name: "Tech Store",
      owner: "Ahmed Khan",
      email: "tech@example.com",
      products: 245,
      orders: 1203,
      earnings: "$12,450.50",
      verified: true,
      status: "Active",
    },
    {
      id: 2,
      name: "Fashion Hub",
      owner: "Sarah Ahmed",
      email: "fashion@example.com",
      products: 512,
      orders: 892,
      earnings: "$8,920.25",
      verified: true,
      status: "Active",
    },
    {
      id: 3,
      name: "Electronics Pro",
      owner: "Ali Hassan",
      email: "electronics@example.com",
      products: 189,
      orders: 456,
      earnings: "$5,234.75",
      verified: false,
      status: "Pending",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendors Management</h1>
          <p className="text-muted-foreground mt-1">Manage vendor accounts and earnings</p>
        </div>
      </div>

      {/* Search */}
      <div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by vendor name or email..."
            className="admin-panel-search-input w-full pl-10"
          />
        </div>
      </div>

      {/* Vendors Table */}
      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Vendor Name</th>
                <th className="admin-panel-table-header-cell">Owner</th>
                <th className="admin-panel-table-header-cell">Email</th>
                <th className="admin-panel-table-header-cell">Products</th>
                <th className="admin-panel-table-header-cell">Orders</th>
                <th className="admin-panel-table-header-cell">Earnings</th>
                <th className="admin-panel-table-header-cell">Verified</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold">{vendor.name}</td>
                  <td className="admin-panel-table-cell">{vendor.owner}</td>
                  <td className="admin-panel-table-cell text-muted-foreground">{vendor.email}</td>
                  <td className="admin-panel-table-cell">{vendor.products}</td>
                  <td className="admin-panel-table-cell">{vendor.orders}</td>
                  <td className="admin-panel-table-cell text-primary font-semibold">{vendor.earnings}</td>
                  <td className="admin-panel-table-cell">
                    {vendor.verified ? (
                      <CheckCircle size={18} className="text-green-600" />
                    ) : (
                      <AlertCircle size={18} className="text-orange-600" />
                    )}
                  </td>
                  <td className="admin-panel-table-cell">
                    <span
                      className={`admin-panel-badge ${
                        vendor.status === "Active" ? "admin-panel-badge-success" : "admin-panel-badge-warning"
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="admin-panel-table-cell">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Eye size={16} className="text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <RotateCw size={16} className="text-blue-500" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Ban size={16} className="text-red-500" />
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
