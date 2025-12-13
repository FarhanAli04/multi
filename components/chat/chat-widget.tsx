"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react"
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
  conversationId?: number
  name: string
  avatar?: string
  role: 'admin' | 'vendor' | 'customer'
  isOnline: boolean
  lastMessage?: string
  unreadCount?: number
}

interface BackendConversation {
  conversation_id: number
  other_user_id: number
  other_user_name: string
  other_user_avatar?: string | null
  other_user_online?: number | boolean | null
  other_user_last_seen?: string | null
  last_message?: string | null
  last_message_at?: string | null
  unread_count?: number | string | null
}

interface BackendMessage {
  id: number
  conversation_id: number
  sender_id: number
  content: string
  message_type?: string
  created_at: string
  sender_name?: string
  sender_avatar?: string | null
  is_read?: number | boolean | string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([])
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [wsStatus, setWsStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const wsRef = useRef<WebSocket | null>(null)
  const selectedConversationIdRef = useRef<number | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const totalUnread = useMemo(() => {
    return chatUsers.reduce((acc, user) => acc + (user.unreadCount || 0), 0)
  }, [chatUsers])

  const loadCurrentUser = useCallback(async () => {
    try {
      const res = await fetch("/api/backend/auth/me")
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load current user")
      }

      const role = (data?.user?.role || "customer") as ChatUser["role"]
      setCurrentUser({
        id: String(data?.user?.id || ""),
        name: data?.user?.full_name || data?.user?.name || "User",
        role,
        isOnline: true,
      })
    } catch (e: any) {
      setError(e?.message || "Failed to load current user")
    }
  }, [])

  const loadConversations = useCallback(async () => {
    try {
      setIsLoading(true)
      setError("")
      const res = await fetch("/api/backend/conversations")
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load conversations")
      }

      const convs: BackendConversation[] = data?.conversations || []
      const mappedUsers: ChatUser[] = convs.map((c) => ({
        id: String(c.other_user_id),
        conversationId: Number(c.conversation_id),
        name: c.other_user_name || "User",
        avatar: c.other_user_avatar || undefined,
        role: "customer",
        isOnline: Boolean(c.other_user_online),
        lastMessage: c.last_message || "",
        unreadCount: Number(c.unread_count || 0),
      }))

      setChatUsers(mappedUsers)
    } catch (e: any) {
      setError(e?.message || "Failed to load conversations")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadMessages = useCallback(async (conversationId: number) => {
    try {
      setIsLoading(true)
      setError("")
      const res = await fetch(`/api/backend/conversations/${conversationId}/messages`)
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load messages")
      }

      const list: BackendMessage[] = data?.messages || []
      const mapped: Message[] = list.map((m) => ({
        id: String(m.id),
        text: m.content || "",
        sender: m.sender_name || "",
        senderId: String(m.sender_id),
        timestamp: m.created_at ? new Date(m.created_at) : new Date(),
        type: (m.message_type || "text") === "file" ? "file" : "text",
        isRead: Boolean(m.is_read),
      }))

      setMessages(mapped)

      setChatUsers((prev) =>
        prev.map((u) =>
          u.conversationId === conversationId
            ? { ...u, unreadCount: 0 }
            : u
        )
      )
    } catch (e: any) {
      setError(e?.message || "Failed to load messages")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const connectWebSocket = useCallback(async () => {
    if (wsRef.current) return
    try {
      setWsStatus('connecting')
      const tokenRes = await fetch("/api/ws-token")
      const tokenData = await tokenRes.json().catch(() => null)
      if (!tokenRes.ok || !tokenData?.token) {
        throw new Error(tokenData?.error || "Failed to get ws token")
      }

      const baseUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080"
      const wsUrl = `${baseUrl}?token=${encodeURIComponent(tokenData.token)}`
      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        setWsStatus('connected')
      }

      ws.onclose = () => {
        wsRef.current = null
        setWsStatus('disconnected')
      }

      ws.onerror = () => {
        // onclose will clean up
      }

      ws.onmessage = (ev) => {
        const data = JSON.parse(ev.data || "{}")
        if (!data) return

        if (data.type === 'user_status') {
          const userId = String(data.user_id)
          setChatUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, isOnline: Boolean(data.is_online) } : u))
          )
          return
        }

        if (data.type === 'read_receipt') {
          const messageId = String(data.message_id)
          setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, isRead: true } : m)))
          return
        }

        // message broadcast doesn't include a `type` in current WS server
        if (data.conversation_id && data.sender_id && data.content) {
          const incomingConversationId = Number(data.conversation_id)
          const incoming: Message = {
            id: String(data.id || Date.now()),
            text: String(data.content || ""),
            sender: String(data.sender_name || ""),
            senderId: String(data.sender_id),
            timestamp: data.created_at ? new Date(data.created_at) : new Date(),
            type: (data.message_type || "text") === "file" ? "file" : "text",
            isRead: false,
          }

          setChatUsers((prev) =>
            prev.map((u) => {
              if (u.conversationId !== incomingConversationId) return u
              const shouldCountUnread = selectedConversationIdRef.current !== incomingConversationId
              return {
                ...u,
                lastMessage: incoming.text,
                unreadCount: shouldCountUnread ? (u.unreadCount || 0) + 1 : 0,
              }
            })
          )

          if (selectedConversationIdRef.current === incomingConversationId) {
            setMessages((prev) => [...prev, incoming])
          }
          return
        }
      }
    } catch (e: any) {
      setWsStatus('disconnected')
      setError(e?.message || "WebSocket connection failed")
      wsRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    loadCurrentUser()
    loadConversations()
    connectWebSocket()
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
      setWsStatus('disconnected')
    }
  }, [connectWebSocket, isOpen, loadConversations, loadCurrentUser])

  useEffect(() => {
    selectedConversationIdRef.current = selectedUser?.conversationId ?? null
  }, [selectedUser?.conversationId])

  const sendMessage = async () => {
    if (!message.trim() || !selectedUser?.conversationId || !currentUser) return

    const optimistic: Message = {
      id: `tmp-${Date.now()}`,
      text: message,
      sender: currentUser.name,
      senderId: currentUser.id,
      timestamp: new Date(),
      type: 'text',
      isRead: false,
    }

    const content = message
    setMessages((prev) => [...prev, optimistic])
    setMessage("")

    const payload = {
      type: 'message',
      conversation_id: selectedUser.conversationId,
      content,
    }

    try {
      if (wsRef.current && wsStatus === 'connected') {
        wsRef.current.send(JSON.stringify(payload))
      } else {
        const res = await fetch("/api/backend/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation_id: selectedUser.conversationId,
            content,
            message_type: "text",
          }),
        })
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          throw new Error(data?.error || "Failed to send message")
        }
      }

      setChatUsers((prev) =>
        prev.map((u) =>
          u.conversationId === selectedUser.conversationId ? { ...u, lastMessage: content } : u
        )
      )
    } catch (e: any) {
      setError(e?.message || "Failed to send message")
    }
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selectedUser && currentUser) {
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
              {error && <div className="px-3 py-2 text-sm text-red-600">{error}</div>}
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
                          onClick={() => {
                            setSelectedUser(user)
                            if (user.conversationId) {
                              loadMessages(user.conversationId)
                            }
                          }}
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
                              msg.senderId === currentUser?.id ? "justify-end" : "justify-start"
                            )}
                          >
                            <div className={cn(
                              "max-w-[70%] rounded-lg p-2",
                              msg.senderId === currentUser?.id
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
