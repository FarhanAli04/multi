"use client"

import { CustomerNavbar } from "@/components/customer/navbar"
import { ShoppingCart, Heart, Package, Wallet } from "lucide-react"

export default function CustomerDashboard() {
  const stats = [
    { label: "Total Orders", value: "12", icon: <Package size={24} /> },
    { label: "Wishlist Items", value: "8", icon: <Heart size={24} /> },
    { label: "Cart Items", value: "3", icon: <ShoppingCart size={24} /> },
    { label: "Wallet Balance", value: "₹2,500", icon: <Wallet size={24} /> },
  ]

  return (
    <>
      <CustomerNavbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Ahmed!</h1>
          <p className="text-muted-foreground">Manage your account and view your purchases</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="text-primary">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="card mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <a href="/customer/orders" className="text-primary hover:underline font-medium">
              View All
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Seller</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted transition-colors">
                    <td className="py-3 px-4 font-medium text-primary">#1200{i}</td>
                    <td className="py-3 px-4">Jan {20 - i}, 2024</td>
                    <td className="py-3 px-4">Tech Store {i}</td>
                    <td className="py-3 px-4 font-semibold">₹{(Math.random() * 5000 + 1000).toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        Delivered
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-primary hover:underline font-medium">Track</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Orders", desc: "Track & manage your orders" },
            { title: "Wishlist", desc: "Your favorite items" },
            { title: "Reviews", desc: "Rate your purchases" },
            { title: "Account Settings", desc: "Update your profile" },
          ].map((link) => (
            <button key={link.title} className="card hover:shadow-lg hover:border-primary transition-all group">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{link.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{link.desc}</p>
            </button>
          ))}
        </div>
      </main>
    </>
  )
}
