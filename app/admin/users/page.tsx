"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { MoreVertical, Trash2, Eye } from "lucide-react"

export default function UsersPage() {
  const users = [
    { id: 1, name: "Ahmed Khan", email: "ahmed@example.com", role: "Customer", joined: "2024-01-15", status: "Active" },
    { id: 2, name: "Fatima Ali", email: "fatima@example.com", role: "Seller", joined: "2024-01-10", status: "Active" },
    {
      id: 3,
      name: "Hassan Malik",
      email: "hassan@example.com",
      role: "Customer",
      joined: "2024-01-08",
      status: "Frozen",
    },
  ]

  return (
    <div className="flex bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Users Management</h1>
              <p className="text-muted-foreground">Manage all users and their permissions</p>
            </div>
            <button className="btn-primary">Add User</button>
          </div>

          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Joined</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.joined}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-muted rounded transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 hover:bg-muted rounded transition-colors">
                            <Trash2 size={16} />
                          </button>
                          <button className="p-2 hover:bg-muted rounded transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
