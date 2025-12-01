"use client"

import { ConversationList } from "@/components/messaging/conversation-list"
import { ChatWindow } from "@/components/messaging/chat-window"

export default function MessagingPage() {
  return (
    <div className="flex h-screen bg-background">
      <ConversationList />
      <ChatWindow />
    </div>
  )
}
