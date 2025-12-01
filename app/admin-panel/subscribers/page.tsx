"use client"

import { useState } from "react"

import { Search, Download, Mail, Trash2 } from "lucide-react"

export default function SubscribersManagement() {
  const [subscribers] = useState([
    { id: 1, email: "john@example.com", status: "Subscribed", joinedDate: "Dec 10, 2024" },
    { id: 2, email: "jane@example.com", status: "Subscribed", joinedDate: "Dec 12, 2024" },
    { id: 3, email: "mike@example.com", status: "Unsubscribed", joinedDate: "Nov 15, 2024" },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Subscribers</h1>
          <p className="text-muted-foreground mt-1">Manage newsletter subscribers</p>
        </div>
        <button className="admin-panel-btn-primary flex items-center gap-2">
          <Mail size={18} />
          Send Newsletter
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search subscribers..." className="admin-panel-search-input w-full pl-10" />
        </div>
        <button className="admin-panel-btn-secondary flex items-center gap-2">
          <Download size={18} />
          Export
        </button>
      </div>

      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Email</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Joined Date</th>
                <th className="admin-panel-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell">{sub.email}</td>
                  <td className="admin-panel-table-cell">
                    <span
                      className={`admin-panel-badge ${
                        sub.status === "Subscribed" ? "admin-panel-badge-success" : "admin-panel-badge-warning"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="admin-panel-table-cell">{sub.joinedDate}</td>
                  <td className="admin-panel-table-cell">
                    <button className="p-2 hover:bg-muted rounded-md transition-colors">
                      <Trash2 size={16} className="text-red-500" />
                    </button>
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
