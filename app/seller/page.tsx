"use client"

import { SellerSidebar } from "@/components/seller/sidebar"
import { SellerHeader } from "@/components/seller/header"
import { StatCard } from "@/components/admin/stat-card"
import { Package, ShoppingCart, Wallet, Eye, Star } from "lucide-react"

export default function SellerDashboard() {
  const stats = [
    {
      title: "Total Products",
      value: "48",
      subtitle: "12 active listings",
      icon: <Package size={28} />,
      trend: "up" as const,
      trendValue: "+3 this week",
    },
    {
      title: "This Month Sales",
      value: "₹85,420",
      subtitle: "24 orders",
      icon: <ShoppingCart size={28} />,
      trend: "up" as const,
      trendValue: "+22.5%",
    },
    {
      title: "Wallet Balance",
      value: "₹12,500",
      subtitle: "Available to withdraw",
      icon: <Wallet size={28} />,
      trend: "up" as const,
      trendValue: "+₹2,100",
    },
    {
      title: "Store Rating",
      value: "4.8",
      subtitle: "342 reviews",
      icon: <Star size={28} />,
      trend: "up" as const,
      trendValue: "+0.2",
    },
  ]

  return (
    <div className="flex bg-background">
      <SellerSidebar />

      <div className="flex-1 flex flex-col">
        <SellerHeader />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Monitor your store performance and sales</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 card">
              <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">#12000{i}</p>
                      <p className="text-sm text-muted-foreground">Customer Name • 2 items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(Math.random() * 5000 + 1000).toFixed(2)}</p>
                      <span className="text-xs inline-block mt-1 px-2 py-1 rounded bg-warning/10 text-warning">
                        Pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full btn-primary">Add New Product</button>
                <button className="w-full btn-secondary">View All Orders</button>
                <button className="w-full btn-secondary">Withdraw Funds</button>
                <button className="w-full btn-secondary">View Analytics</button>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Top Performing Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground">Product</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Price</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Stock</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Views</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="py-3 px-4 font-medium">Product Name {i}</td>
                      <td className="py-3 px-4">₹{(Math.random() * 10000 + 500).toFixed(2)}</td>
                      <td className="py-3 px-4">{Math.floor(Math.random() * 100) + 1} units</td>
                      <td className="py-3 px-4 text-muted-foreground flex items-center gap-1">
                        <Eye size={16} /> {Math.floor(Math.random() * 5000) + 100}
                      </td>
                      <td className="py-3 px-4 font-medium">{(Math.random() * 2 + 3).toFixed(1)} ⭐</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
