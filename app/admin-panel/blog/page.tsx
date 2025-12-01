"use client"

import { Search, Plus, Eye, Edit2, Trash2, Calendar } from "lucide-react"
import { useState } from "react"

export default function BlogManagement() {
  const [posts] = useState([
    {
      id: 1,
      title: "Top 10 Tech Gadgets of 2024",
      category: "Technology",
      author: "Admin",
      views: 1245,
      status: "Published",
      date: "Dec 15, 2024",
    },
    {
      id: 2,
      title: "Fashion Trends This Season",
      category: "Fashion",
      author: "Admin",
      views: 856,
      status: "Published",
      date: "Dec 10, 2024",
    },
    {
      id: 3,
      title: "Home Improvement Guide",
      category: "Home",
      author: "Admin",
      views: 0,
      status: "Draft",
      date: "Dec 18, 2024",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground mt-1">Manage blog posts and content</p>
        </div>
        <button className="admin-panel-btn-primary flex items-center gap-2">
          <Plus size={18} />
          New Post
        </button>
      </div>

      {/* Search */}
      <div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search posts by title..." className="admin-panel-search-input w-full pl-10" />
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Title</th>
                <th className="admin-panel-table-header-cell">Category</th>
                <th className="admin-panel-table-header-cell">Author</th>
                <th className="admin-panel-table-header-cell">Views</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Date</th>
                <th className="admin-panel-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold">{post.title}</td>
                  <td className="admin-panel-table-cell">{post.category}</td>
                  <td className="admin-panel-table-cell">{post.author}</td>
                  <td className="admin-panel-table-cell">{post.views}</td>
                  <td className="admin-panel-table-cell">
                    <span
                      className={`admin-panel-badge ${
                        post.status === "Published" ? "admin-panel-badge-success" : "admin-panel-badge-info"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="admin-panel-table-cell flex items-center gap-2">
                    <Calendar size={14} className="text-muted-foreground" />
                    {post.date}
                  </td>
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
