"use client"

export interface MessageBubbleProps {
  content: string
  timestamp: string
  isOwn: boolean
  senderName?: string
}

export function MessageBubble({ content, timestamp, isOwn, senderName }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        }`}
      >
        {senderName && !isOwn && <p className="text-xs font-semibold mb-1 opacity-75">{senderName}</p>}
        <p className="break-words">{content}</p>
        <p className={`text-xs mt-1 ${isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{timestamp}</p>
      </div>
    </div>
  )
}
