"use client"

import { useState } from "react"

import { Plus, Search, Edit2, Lock } from "lucide-react"

export default function StaffManagement() {
  const [staff] = useState([
    {
      id: 1,
      name: "Ahmed Khan",
      email: "ahmed@admin.com",
      role: "Moderator",
      status: "Active",
      joined: "Jan 10, 2024",
    },
    {
      id: 2,
      name: "Fatima Ahmed",
      email: "fatima@admin.com",
      role: "Support Agent",
      status: "Active",
      joined: "Feb 15, 2024",
    },
    {
      id: 3,
      name: "Hassan Ali",
      email: "hassan@admin.com",
      role: "Content Manager",
      status: "Inactive",
      joined: "Mar 20, 2024",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground mt-1">Manage admin staff accounts</p>
        </div>
        <button className="admin-panel-btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Staff
        </button>
      </div>

      <div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search staff..." className="admin-panel-search-input w-full pl-10" />
        </div>
      </div>

      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Name</th>
                <th className="admin-panel-table-header-cell">Email</th>
                <th className="admin-panel-table-header-cell">Role</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Joined</th>
                <th className="admin-panel-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold">{member.name}</td>
                  <td className="admin-panel-table-cell text-muted-foreground">{member.email}</td>
                  <td className="admin-panel-table-cell">{member.role}</td>
                  <td className="admin-panel-table-cell">
                    <span
                      className={`admin-panel-badge ${
                        member.status === "Active" ? "admin-panel-badge-success" : "admin-panel-badge-warning"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="admin-panel-table-cell">{member.joined}</td>
                  <td className="admin-panel-table-cell">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Edit2 size={16} className="text-blue-500" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Lock size={16} className="text-orange-500" />
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
