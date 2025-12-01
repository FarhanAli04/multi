"use client"

import { Send, Search } from "lucide-react"
import { useState } from "react"

export default function MessagesManagement() {
  const [conversations] = useState([
    {
      id: 1,
      name: "Tech Store Support",
      type: "Vendor",
      lastMessage: "Product approval request",
      unread: 3,
      date: "Dec 18, 2024",
    },
    {
      id: 2,
      name: "John Doe",
      type: "Customer",
      lastMessage: "Order status inquiry",
      unread: 0,
      date: "Dec 17, 2024",
    },
    {
      id: 3,
      name: "Fashion Hub",
      type: "Vendor",
      lastMessage: "Commission withdrawal request",
      unread: 1,
      date: "Dec 16, 2024",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-1">Support chat with customers and vendors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1 admin-panel-table">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className="w-full p-4 border-b border-border hover:bg-muted transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{conv.name}</span>
                  {conv.unread > 0 && (
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">{conv.unread}</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mb-1">{conv.type}</div>
                <div className="text-sm text-muted-foreground truncate">{conv.lastMessage}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 admin-panel-table flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold">Tech Store Support</h3>
            <p className="text-xs text-muted-foreground">Vendor Chat</p>
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-80 bg-background/50">
            <div className="flex justify-end">
              <div className="bg-primary text-white px-4 py-2 rounded-lg max-w-xs">
                <p className="text-sm">Hi, can you check on our product approval?</p>
                <span className="text-xs opacity-75">10:30 AM</span>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-muted px-4 py-2 rounded-lg max-w-xs">
                <p className="text-sm">Your products are under review. Should be done by tomorrow.</p>
                <span className="text-xs opacity-75">10:32 AM</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input type="text" placeholder="Type your message..." className="admin-panel-search-input flex-1" />
              <button className="admin-panel-btn-primary">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
