"use client"

import { Bell, User } from "lucide-react"

export function SellerHeader() {
  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Welcome to Your Store</h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-warning rounded-full"></span>
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
          <User size={20} className="text-muted-foreground" />
          <span className="text-sm font-medium">Seller</span>
        </button>
      </div>
    </header>
  )
}
