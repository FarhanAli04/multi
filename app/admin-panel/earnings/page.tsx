"use client"

import { useState } from "react"

import { TrendingUp, Wallet, DollarSign } from "lucide-react"

export default function EarningsManagement() {
  const [vendors] = useState([
    {
      id: 1,
      name: "Tech Store",
      totalSales: "$45,230",
      commission: "10%",
      adminEarnings: "$4,523",
      pendingWithdrawal: "$12,450",
    },
    {
      id: 2,
      name: "Fashion Hub",
      totalSales: "$32,100",
      commission: "12%",
      adminEarnings: "$3,852",
      pendingWithdrawal: "$8,920",
    },
    {
      id: 3,
      name: "Electronics Pro",
      totalSales: "$28,550",
      commission: "10%",
      adminEarnings: "$2,855",
      pendingWithdrawal: "$5,234",
    },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vendor Earnings & Withdrawals</h1>
        <p className="text-muted-foreground mt-1">Manage commission and vendor payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="admin-panel-table p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Platform Sales</p>
              <h3 className="text-2xl font-bold">$105,880</h3>
            </div>
            <TrendingUp size={32} className="text-primary" />
          </div>
        </div>
        <div className="admin-panel-table p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Admin Commission Earned</p>
              <h3 className="text-2xl font-bold">$11,230</h3>
            </div>
            <Wallet size={32} className="text-green-600" />
          </div>
        </div>
        <div className="admin-panel-table p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Withdrawals</p>
              <h3 className="text-2xl font-bold">$26,604</h3>
            </div>
            <DollarSign size={32} className="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Commission Configuration */}
      <div className="admin-panel-table p-6">
        <h2 className="text-lg font-bold mb-4">Commission Rates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Global Commission Rate (%)</label>
            <input type="number" defaultValue="10" className="admin-panel-search-input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Apply to All Categories</label>
            <button className="admin-panel-btn-primary">Apply</button>
          </div>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Vendor</th>
                <th className="admin-panel-table-header-cell">Total Sales</th>
                <th className="admin-panel-table-header-cell">Commission</th>
                <th className="admin-panel-table-header-cell">Admin Earnings</th>
                <th className="admin-panel-table-header-cell">Pending Withdrawal</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold">{vendor.name}</td>
                  <td className="admin-panel-table-cell">{vendor.totalSales}</td>
                  <td className="admin-panel-table-cell">{vendor.commission}</td>
                  <td className="admin-panel-table-cell text-green-600 font-bold">{vendor.adminEarnings}</td>
                  <td className="admin-panel-table-cell text-orange-600 font-bold">{vendor.pendingWithdrawal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
