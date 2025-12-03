"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageCircle, 
  X, 
  Send, 
  Paperclip, 
  Minimize2, 
  Maximize2,
  Phone,
  Video,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sender: string
  senderId: string
  timestamp: Date
  type: 'text' | 'file'
  fileUrl?: string
  fileName?: string
  isRead: boolean
}

interface ChatUser {
  id: string
  name: string
  avatar?: string
  role: 'admin' | 'vendor' | 'customer'
  isOnline: boolean
  lastMessage?: string
  unreadCount?: number
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([
    {
      id: "1",
      name: "John Doe",
      role: "customer",
      isOnline: true,
      lastMessage: "Hi, I need help with my order",
      unreadCount: 2
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "vendor",
      isOnline: false,
      lastMessage: "Thank you for your support",
      unreadCount: 0
    },
    {
      id: "3",
      name: "Admin Support",
      role: "admin",
      isOnline: true,
      lastMessage: "How can I assist you today?",
      unreadCount: 0
    }
  ])
  const [currentUser, setCurrentUser] = useState<ChatUser>({
    id: "current-user",
    name: "Admin",
    role: "admin",
    isOnline: true
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!message.trim() || !selectedUser) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: currentUser.name,
      senderId: currentUser.id,
      timestamp: new Date(),
      type: 'text',
      isRead: false
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate response
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. I'll get back to you soon!",
        sender: selectedUser.name,
        senderId: selectedUser.id,
        timestamp: new Date(),
        type: 'text',
        isRead: false
      }
      setMessages(prev => [...prev, responseMessage])
    }, 1000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selectedUser) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: "",
        sender: currentUser.name,
        senderId: currentUser.id,
        timestamp: new Date(),
        type: 'file',
        fileUrl: URL.createObjectURL(file),
        fileName: file.name,
        isRead: false
      }
      setMessages([...messages, newMessage])
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800'
      case 'vendor': return 'bg-blue-100 text-blue-800'
      case 'customer': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalUnread = chatUsers.reduce((acc, user) => acc + (user.unreadCount || 0), 0)

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="relative h-14 w-14 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
          {totalUnread > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalUnread}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 transition-all duration-300",
      isMinimized ? "w-80" : "w-96 h-[600px]"
    )}>
      <Card className="h-full flex flex-col shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <CardTitle className="text-lg">Chat Support</CardTitle>
            {totalUnread > 0 && (
              <Badge variant="destructive" className="ml-2">
                {totalUnread}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 p-0">
              <div className="flex h-full">
                {/* Users List */}
                <div className={cn(
                  "border-r border-border",
                  selectedUser ? "w-2/5" : "w-full"
                )}>
                  <ScrollArea className="h-full">
                    <div className="p-2 space-y-1">
                      {chatUsers.map((user) => (
                        <div
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          className={cn(
                            "flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors",
                            selectedUser?.id === user.id && "bg-muted"
                          )}
                        >
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {user.isOnline && (
                              <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium truncate">{user.name}</p>
                              {user.unreadCount && user.unreadCount > 0 && (
                                <Badge variant="destructive" className="ml-1 h-4 w-4 rounded-full p-0 text-xs">
                                  {user.unreadCount}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <p className="text-xs text-muted-foreground truncate">
                                {user.lastMessage}
                              </p>
                              <Badge className={cn("text-xs", getRoleColor(user.role))}>
                                {user.role}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Chat Area */}
                {selectedUser && (
                  <div className="flex-1 flex flex-col">
                    <div className="p-3 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={selectedUser.avatar} />
                            <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{selectedUser.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {selectedUser.isOnline ? "Online" : "Offline"}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Video className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-3">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={cn(
                              "flex",
                              msg.senderId === currentUser.id ? "justify-end" : "justify-start"
                            )}
                          >
                            <div className={cn(
                              "max-w-[70%] rounded-lg p-2",
                              msg.senderId === currentUser.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}>
                              {msg.type === 'text' ? (
                                <p className="text-sm">{msg.text}</p>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <Paperclip className="h-4 w-4" />
                                  <span className="text-sm">{msg.fileName}</span>
                                </div>
                              )}
                              <p className="text-xs opacity-70 mt-1">
                                {formatTime(msg.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    <div className="p-3 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type a message..."
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="flex-1"
                        />
                        <Button size="sm" onClick={sendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
