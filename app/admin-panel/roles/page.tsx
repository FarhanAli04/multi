"use client"

import { useState } from "react"

import { Plus, Edit2, Trash2, Shield } from "lucide-react"

export default function RolesManagement() {
  const [roles] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: 25,
      users: 1,
      description: "Full system access",
    },
    {
      id: 2,
      name: "Moderator",
      permissions: 15,
      users: 3,
      description: "Content and user moderation",
    },
    {
      id: 3,
      name: "Support Agent",
      permissions: 8,
      users: 5,
      description: "Customer support access",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground mt-1">Manage user roles and permissions</p>
        </div>
        <button className="admin-panel-btn-primary flex items-center gap-2">
          <Plus size={18} />
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="admin-panel-table p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={20} className="text-primary" />
              <h3 className="font-bold text-lg">{role.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
              <div>
                <div className="text-xs text-muted-foreground">Permissions</div>
                <div className="text-lg font-bold">{role.permissions}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Users</div>
                <div className="text-lg font-bold">{role.users}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="admin-panel-btn-secondary flex-1 flex items-center justify-center gap-1">
                <Edit2 size={14} />
                Edit
              </button>
              <button className="admin-panel-btn-danger flex-1">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
