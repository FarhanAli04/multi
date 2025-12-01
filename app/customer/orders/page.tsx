"use client"

import { CustomerNavbar } from "@/components/customer/navbar"
import { Truck, Package, CheckCircle, Clock } from "lucide-react"

export default function CustomerOrdersPage() {
  const orders = [
    { id: "#12001", date: "Jan 20, 2024", seller: "Tech Store 1", amount: 2499, status: "Delivered", items: 1 },
    { id: "#12002", date: "Jan 19, 2024", seller: "Shop Hub", amount: 5999, status: "In Transit", items: 3 },
    { id: "#12003", date: "Jan 18, 2024", seller: "Electronics Plus", amount: 1299, status: "Processing", items: 1 },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle size={16} />
      case "In Transit":
        return <Truck size={16} />
      case "Processing":
        return <Clock size={16} />
      default:
        return <Package size={16} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-success/10 text-success"
      case "In Transit":
        return "bg-primary/10 text-primary"
      case "Processing":
        return "bg-warning/10 text-warning"
      default:
        return "bg-muted text-foreground"
    }
  }

  return (
    <>
      <CustomerNavbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage all your orders</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-bold text-primary text-lg">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{order.seller}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-bold text-foreground">₹{order.amount}</p>
                </div>
                <div className="flex items-end justify-between md:flex-col md:items-end">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)} {order.status}
                  </span>
                  <button className="mt-2 md:mt-4 text-primary hover:underline font-medium text-sm">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
