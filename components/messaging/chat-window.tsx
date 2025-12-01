"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Phone, Video, MoreVertical } from "lucide-react"
import { MessageBubble } from "./message-bubble"

export function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: "1", content: "Hey! I have a question about the order", timestamp: "2:30 PM", isOwn: false },
    { id: "2", content: "What can I help you with?", timestamp: "2:31 PM", isOwn: true },
    { id: "3", content: "When will it be delivered?", timestamp: "2:32 PM", isOwn: false },
    {
      id: "4",
      content: "Your order is on the way. Expected delivery is tomorrow by 6 PM.",
      timestamp: "2:33 PM",
      isOwn: true,
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setInputValue("")
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Ahmed Khan</h3>
          <p className="text-xs text-muted-foreground">Active now</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Phone size={18} className="text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Video size={18} className="text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <MoreVertical size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="input flex-1"
          />
          <button onClick={handleSendMessage} className="btn-primary flex items-center gap-2 px-4">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
