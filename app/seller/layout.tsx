"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChatWidget } from "@/components/chat/chat-widget"

export default function SellerLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const [status, setStatus] = useState<"checking" | "allowed" | "denied">("checking")

  useEffect(() => {
    let cancelled = false

    const check = async () => {
      try {
        const res = await fetch("/api/backend/auth/me")
        const data = await res.json().catch(() => null)

        if (cancelled) return

        const role = data?.user?.role
        if (!res.ok || !role) {
          setStatus("denied")
          router.push("/auth/login?role=seller")
          return
        }

        if (role !== "seller") {
          setStatus("denied")
          if (role === "admin") {
            router.push("/admin-panel")
          } else {
            router.push("/customer")
          }
          return
        }

        setStatus("allowed")
      } catch {
        if (cancelled) return
        setStatus("denied")
        router.push("/auth/login?role=seller")
      }
    }

    check()
    return () => {
      cancelled = true
    }
  }, [router])

  if (status !== "allowed") {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen bg-background">
      {children}
      <ChatWidget />
    </div>
  )
}
