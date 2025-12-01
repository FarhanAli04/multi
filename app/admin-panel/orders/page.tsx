"use client"

import { Search, Eye, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"

export default function OrdersManagement() {
  const [selectedStatus, setSelectedStatus] = useState("all")

  const orders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      vendor: "Tech Store",
      amount: "$245.99",
      status: "Delivered",
      items: 3,
      date: "Dec 18, 2024",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      vendor: "Fashion Hub",
      amount: "$180.50",
      status: "Processing",
      items: 2,
      date: "Dec 17, 2024",
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      vendor: "Electronics Pro",
      amount: "$320.00",
      status: "Pending",
      items: 5,
      date: "Dec 17, 2024",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <p className="text-muted-foreground mt-1">Manage and track all orders</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Search Orders</label>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              className="admin-panel-search-input w-full pl-10"
            />
          </div>
        </div>
        <select className="admin-panel-search-input">
          <option>Filter by Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <button className="admin-panel-btn-primary">Apply Filters</button>
      </div>

      {/* Orders Table */}
      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Order ID</th>
                <th className="admin-panel-table-header-cell">Customer</th>
                <th className="admin-panel-table-header-cell">Vendor</th>
                <th className="admin-panel-table-header-cell">Amount</th>
                <th className="admin-panel-table-header-cell">Items</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Date</th>
                <th className="admin-panel-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold text-primary">{order.id}</td>
                  <td className="admin-panel-table-cell">{order.customer}</td>
                  <td className="admin-panel-table-cell">{order.vendor}</td>
                  <td className="admin-panel-table-cell font-semibold">{order.amount}</td>
                  <td className="admin-panel-table-cell">{order.items}</td>
                  <td className="admin-panel-table-cell">
                    <select
                      defaultValue={order.status}
                      className="px-2 py-1 rounded-md text-xs font-semibold border border-border bg-card"
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="admin-panel-table-cell text-sm">{order.date}</td>
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
