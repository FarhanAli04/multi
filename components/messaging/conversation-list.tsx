"use client"

import { Search } from "lucide-react"

export interface ConversationItemProps {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isActive?: boolean
  onSelect?: () => void
}

export function ConversationItem({
  name,
  lastMessage,
  lastMessageTime,
  unreadCount,
  isActive,
  onSelect,
}: ConversationItemProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 border-b border-border hover:bg-muted transition-colors ${
        isActive ? "bg-muted" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`font-medium ${unreadCount > 0 ? "font-bold" : ""}`}>{name}</p>
          <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">{lastMessageTime}</p>
          {unreadCount > 0 && (
            <span className="inline-block mt-1 px-2 py-1 rounded-full bg-primary text-white text-xs font-bold">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export function ConversationList() {
  const conversations = [
    {
      id: "1",
      name: "Ahmed Khan",
      lastMessage: "Thanks for the quick delivery!",
      lastMessageTime: "2 min",
      unreadCount: 1,
      isActive: true,
    },
    {
      id: "2",
      name: "Fatima Ali",
      lastMessage: "Do you have this in blue?",
      lastMessageTime: "1 hour",
      unreadCount: 0,
      isActive: false,
    },
    {
      id: "3",
      name: "Hassan Malik",
      lastMessage: "Order received, very satisfied",
      lastMessageTime: "3 hours",
      unreadCount: 0,
      isActive: false,
    },
  ]

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <input type="text" placeholder="Search conversations..." className="input pl-9" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <ConversationItem key={conv.id} {...conv} onSelect={() => {}} />
        ))}
      </div>
    </div>
  )
}
