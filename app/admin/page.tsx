"use client"

import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { StatCard } from "@/components/admin/stat-card"
import { Users, ShoppingCart, TrendingUp, AlertCircle, Clock, CheckCircle, XCircle, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Placeholder data - will be replaced with real data from Supabase
  const stats = [
    {
      title: "Total Users",
      value: "2,845",
      subtitle: "+240 this month",
      icon: <Users className="w-6 h-6 md:w-7 md:h-7" />,
      trend: "up" as const,
      trendValue: "+8.2%",
    },
    {
      title: "Total Orders",
      value: "12,450",
      subtitle: "₹42,50,000 revenue",
      icon: <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />,
      trend: "up" as const,
      trendValue: "+12.5%",
    },
    {
      title: "Active Sellers",
      value: "342",
      subtitle: "+45 this month",
      icon: <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />,
      trend: "up" as const,
      trendValue: "+5.3%",
    },
    {
      title: "Frozen Accounts",
      value: "28",
      subtitle: "Requires action",
      icon: <AlertCircle className="w-6 h-6 md:w-7 md:h-7" />,
      trend: "down" as const,
      trendValue: "-2.1%",
    },
  ]

  const recentOrders = [
    { id: 12001, customer: 'John Doe', amount: '₹8,456.00', status: 'delivered', date: '2 days ago' },
    { id: 12000, customer: 'Jane Smith', amount: '₹12,345.00', status: 'processing', date: '1 day ago' },
    { id: 11999, customer: 'Robert Johnson', amount: '₹5,678.00', status: 'delivered', date: '3 days ago' },
    { id: 11998, customer: 'Emily Davis', amount: '₹23,456.00', status: 'cancelled', date: '4 days ago' },
    { id: 11997, customer: 'Michael Brown', amount: '₹3,210.00', status: 'delivered', date: '5 days ago' },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Delivered
          </span>
        )
      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="w-3 h-3 mr-1" /> Processing
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <XCircle className="w-3 h-3 mr-1" /> Cancelled
          </span>
        )
      default:
        return null
    }
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row bg-background min-h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">Welcome back! Here's your platform overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Recent Orders Section */}
          <div className="bg-card rounded-lg shadow-sm border border-border mb-6 md:mb-8 overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold">Recent Orders</h2>
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                  View All
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Table for desktop */}
                  <div className="hidden md:block">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-muted-foreground border-b border-border">
                          <th className="py-3 px-4 font-medium">Order ID</th>
                          <th className="py-3 px-4 font-medium">Customer</th>
                          <th className="py-3 px-4 font-medium text-right">Amount</th>
                          <th className="py-3 px-4 font-medium">Status</th>
                          <th className="py-3 px-4 font-medium text-right">Date</th>
                          <th className="py-3 pl-4 pr-2 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4 font-medium">#{order.id}</td>
                            <td className="py-3 px-4">{order.customer}</td>
                            <td className="py-3 px-4 text-right">{order.amount}</td>
                            <td className="py-3 px-4">
                              {getStatusBadge(order.status)}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground text-right">{order.date}</td>
                            <td className="py-3 pl-4 pr-2 text-right">
                              <button className="p-1 rounded-full hover:bg-muted">
                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Cards for mobile */}
                  <div className="md:hidden space-y-3">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="bg-background border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">#{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{order.amount}</p>
                            <p className="text-xs text-muted-foreground">{order.date}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          {getStatusBadge(order.status)}
                          <button className="p-1 -mr-2">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frozen Accounts */}
          <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
            <div className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">Frozen Accounts Requiring Action</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium">Seller Name {i}</p>
                      <p className="text-sm text-muted-foreground">Frozen due to policy violation</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button className="btn-outline w-full sm:w-auto text-sm py-1.5 px-3">View Details</button>
                      <button className="btn-primary w-full sm:w-auto text-sm py-1.5 px-3">Review</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
