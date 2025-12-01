"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react"

export function SellerSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/seller", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/seller/products", icon: Package, label: "Products" },
    { href: "/seller/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/seller/messages", icon: MessageSquare, label: "Messages" },
    { href: "/seller/wallet", icon: Wallet, label: "Wallet" },
    { href: "/seller/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/seller/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">Seller Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Your Business</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-danger hover:bg-muted rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
