"use client"

import { Search, Eye, Ban } from "lucide-react"
import { useState } from "react"

export default function CustomersManagement() {
  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      orders: 15,
      spent: "$2,450.50",
      joined: "Jan 15, 2024",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      orders: 8,
      spent: "$890.25",
      joined: "Feb 20, 2024",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234 567 8902",
      orders: 3,
      spent: "$245.75",
      joined: "Mar 10, 2024",
      status: "Blocked",
    },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers Management</h1>
        <p className="text-muted-foreground mt-1">Manage all registered customers</p>
      </div>

      {/* Search */}
      <div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            className="admin-panel-search-input w-full pl-10"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Name</th>
                <th className="admin-panel-table-header-cell">Email</th>
                <th className="admin-panel-table-header-cell">Phone</th>
                <th className="admin-panel-table-header-cell">Orders</th>
                <th className="admin-panel-table-header-cell">Total Spent</th>
                <th className="admin-panel-table-header-cell">Joined</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold">{customer.name}</td>
                  <td className="admin-panel-table-cell text-muted-foreground">{customer.email}</td>
                  <td className="admin-panel-table-cell">{customer.phone}</td>
                  <td className="admin-panel-table-cell">{customer.orders}</td>
                  <td className="admin-panel-table-cell text-primary font-semibold">{customer.spent}</td>
                  <td className="admin-panel-table-cell text-sm">{customer.joined}</td>
                  <td className="admin-panel-table-cell">
                    <span
                      className={`admin-panel-badge ${
                        customer.status === "Active" ? "admin-panel-badge-success" : "admin-panel-badge-danger"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="admin-panel-table-cell">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Eye size={16} className="text-primary" />
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
