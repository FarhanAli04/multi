"use client"

import { Search, Plus, Edit2, Trash2, Copy } from "lucide-react"
import { useState } from "react"

export default function CouponsManagement() {
  const [coupons] = useState([
    {
      id: 1,
      code: "SAVE20",
      type: "Percentage",
      value: "20%",
      minPurchase: "$50.00",
      maxUsage: 500,
      used: 234,
      startDate: "Jan 1, 2024",
      endDate: "Dec 31, 2024",
      status: "Active",
    },
    {
      id: 2,
      code: "FLAT500",
      type: "Fixed Amount",
      value: "$5.00",
      minPurchase: "$100.00",
      maxUsage: 1000,
      used: 687,
      startDate: "Jan 1, 2024",
      endDate: "Dec 31, 2024",
      status: "Active",
    },
    {
      id: 3,
      code: "NEWYEAR50",
      type: "Percentage",
      value: "50%",
      minPurchase: "$200.00",
      maxUsage: 100,
      used: 98,
      startDate: "Jan 1, 2024",
      endDate: "Jan 31, 2024",
      status: "Expired",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coupons Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage discount coupons</p>
        </div>
        <button className="admin-panel-btn-primary flex items-center gap-2">
          <Plus size={18} />
          Create Coupon
        </button>
      </div>

      {/* Search */}
      <div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search by coupon code..." className="admin-panel-search-input w-full pl-10" />
        </div>
      </div>

      {/* Coupons Table */}
      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Code</th>
                <th className="admin-panel-table-header-cell">Type</th>
                <th className="admin-panel-table-header-cell">Value</th>
                <th className="admin-panel-table-header-cell">Min Purchase</th>
                <th className="admin-panel-table-header-cell">Usage</th>
                <th className="admin-panel-table-header-cell">Valid Period</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell">
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded font-mono text-sm font-bold text-primary">
                        {coupon.code}
                      </code>
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <Copy size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                  <td className="admin-panel-table-cell">{coupon.type}</td>
                  <td className="admin-panel-table-cell font-semibold text-primary">{coupon.value}</td>
                  <td className="admin-panel-table-cell">{coupon.minPurchase}</td>
                  <td className="admin-panel-table-cell">
                    {coupon.used} / {coupon.maxUsage}
                  </td>
                  <td className="admin-panel-table-cell text-sm">
                    {coupon.startDate} → {coupon.endDate}
                  </td>
                  <td className="admin-panel-table-cell">
                    <span
                      className={`admin-panel-badge ${
                        coupon.status === "Active" ? "admin-panel-badge-success" : "admin-panel-badge-warning"
                      }`}
                    >
                      {coupon.status}
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
