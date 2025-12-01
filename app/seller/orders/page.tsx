"use client"

import { SellerSidebar } from "@/components/seller/sidebar"
import { SellerHeader } from "@/components/seller/header"
import { Package, Truck, CheckCircle } from "lucide-react"

export default function SellerOrdersPage() {
  const orders = [
    { id: "#12001", customer: "Ahmed Khan", amount: 2499, items: 1, status: "Pending", date: "2024-01-20" },
    { id: "#12002", customer: "Fatima Ali", amount: 5999, items: 3, status: "Confirmed", date: "2024-01-19" },
    { id: "#12003", customer: "Hassan Malik", amount: 1299, items: 1, status: "Shipped", date: "2024-01-18" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Package size={16} />
      case "Confirmed":
        return <CheckCircle size={16} />
      case "Shipped":
        return <Truck size={16} />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-warning/10 text-warning"
      case "Confirmed":
        return "bg-primary/10 text-primary"
      case "Shipped":
        return "bg-success/10 text-success"
      default:
        return ""
    }
  }

  return (
    <div className="flex bg-background">
      <SellerSidebar />

      <div className="flex-1 flex flex-col">
        <SellerHeader />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Orders</h1>
            <p className="text-muted-foreground">Manage and fulfill customer orders</p>
          </div>

          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground">Order ID</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Items</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="py-3 px-4 font-medium text-primary">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4 font-semibold">₹{order.amount}</td>
                      <td className="py-3 px-4">{order.items} item(s)</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)} {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:underline font-medium">View Details</button>
                      </td>
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
