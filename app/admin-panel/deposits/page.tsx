"use client"

import { useState } from "react"

import { Search, DollarSign, CheckCircle, Clock, XCircle } from "lucide-react"

export default function DepositsManagement() {
  const [deposits] = useState([
    {
      id: 1,
      customer: "John Doe",
      amount: "$500.00",
      method: "Credit Card",
      status: "Completed",
      date: "Dec 18, 2024",
    },
    {
      id: 2,
      customer: "Jane Smith",
      amount: "$250.00",
      method: "Debit Card",
      status: "Pending",
      date: "Dec 17, 2024",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      amount: "$1000.00",
      method: "Bank Transfer",
      status: "Failed",
      date: "Dec 16, 2024",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle size={16} className="text-green-600" />
      case "Pending":
        return <Clock size={16} className="text-orange-600" />
      case "Failed":
        return <XCircle size={16} className="text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Deposits</h1>
        <p className="text-muted-foreground mt-1">Manage customer wallet deposits</p>
      </div>

      <div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by customer name..."
            className="admin-panel-search-input w-full pl-10"
          />
        </div>
      </div>

      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Customer</th>
                <th className="admin-panel-table-header-cell">Amount</th>
                <th className="admin-panel-table-header-cell">Method</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold">{deposit.customer}</td>
                  <td className="admin-panel-table-cell font-bold text-primary flex items-center gap-1">
                    <DollarSign size={14} />
                    {deposit.amount}
                  </td>
                  <td className="admin-panel-table-cell">{deposit.method}</td>
                  <td className="admin-panel-table-cell flex items-center gap-2">
                    {getStatusIcon(deposit.status)}
                    {deposit.status}
                  </td>
                  <td className="admin-panel-table-cell">{deposit.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
