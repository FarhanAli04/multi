"use client"

import { ChatWidget } from "@/components/chat/chat-widget"

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <ChatWidget />
    </div>
  )
}
