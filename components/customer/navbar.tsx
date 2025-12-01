"use client"

import Link from "next/link"
import { ShoppingCart, Search, User, Heart } from "lucide-react"

export function CustomerNavbar() {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          SAR Store
        </Link>

        <div className="flex-1 mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input type="text" placeholder="Search products..." className="input pl-10 w-full" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Heart size={20} />
          </button>

          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-danger text-white rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </button>

          <Link
            href="/customer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <User size={20} className="text-muted-foreground" />
            <span className="font-medium">Account</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
