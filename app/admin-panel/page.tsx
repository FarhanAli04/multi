"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Users, Store, Package, ShoppingCart, DollarSign } from "lucide-react"

const chartData = [
  { date: "Mon", orders: 240, revenue: 2400 },
  { date: "Tue", orders: 180, revenue: 2210 },
  { date: "Wed", orders: 320, revenue: 2290 },
  { date: "Thu", orders: 220, revenue: 2000 },
  { date: "Fri", orders: 290, revenue: 2181 },
  { date: "Sat", orders: 200, revenue: 2500 },
  { date: "Sun", orders: 150, revenue: 2100 },
]

const statCards = [
  {
    icon: ShoppingCart,
    label: "Total Orders",
    value: "2,847",
    change: "+12.5%",
    positive: true,
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    label: "Total Customers",
    value: "5,341",
    change: "+8.2%",
    positive: true,
    color: "from-green-500 to-green-600",
  },
  {
    icon: Store,
    label: "Total Vendors",
    value: "342",
    change: "+3.1%",
    positive: true,
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Package,
    label: "Total Products",
    value: "12,483",
    change: "-2.4%",
    positive: false,
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: DollarSign,
    label: "Total Revenue",
    value: "$42,584",
    change: "+15.3%",
    positive: true,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: TrendingUp,
    label: "Commission Earned",
    value: "$8,516",
    change: "+6.8%",
    positive: true,
    color: "from-indigo-500 to-indigo-600",
  },
]

export default function AdminPanelDashboard() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">Welcome to the Syed Asad Raza Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="admin-panel-stat-card">
              <div className={`admin-panel-stat-card-icon bg-gradient-to-br ${stat.color}`}>
                <Icon size={24} className="text-white" />
              </div>
              <div className="admin-panel-stat-card-label">{stat.label}</div>
              <div className="admin-panel-stat-card-value">{stat.value}</div>
              <div className={`admin-panel-stat-card-change ${stat.positive ? "positive" : "negative"}`}>
                <span>{stat.change}</span>
                <span className="hidden sm:inline">vs last week</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <div className="admin-panel-table">
          <div className="p-4 md:p-6 border-b border-border">
            <h2 className="text-base md:text-lg font-bold">Orders Overview</h2>
          </div>
          <div className="p-4 md:p-6">
            <ResponsiveContainer width="100%" height={250} minHeight={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-panel-table">
          <div className="p-4 md:p-6 border-b border-border">
            <h2 className="text-base md:text-lg font-bold">Revenue Trend</h2>
          </div>
          <div className="p-4 md:p-6">
            <ResponsiveContainer width="100%" height={250} minHeight={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="admin-panel-table">
        <div className="p-4 md:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-base md:text-lg font-bold">Recent Orders</h2>
          <a href="/admin-panel/orders" className="text-primary text-sm font-semibold hover:underline">
            View All →
          </a>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Order ID</th>
                <th className="admin-panel-table-header-cell">Customer</th>
                <th className="admin-panel-table-header-cell">Amount</th>
                <th className="admin-panel-table-header-cell">Status</th>
                <th className="admin-panel-table-header-cell">Date</th>
                <th className="admin-panel-table-header-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#ORD-001", customer: "John Doe", amount: "$245.99", status: "Delivered", date: "Dec 18, 2024" },
                {
                  id: "#ORD-002",
                  customer: "Jane Smith",
                  amount: "$180.50",
                  status: "Processing",
                  date: "Dec 17, 2024",
                },
                {
                  id: "#ORD-003",
                  customer: "Mike Johnson",
                  amount: "$320.00",
                  status: "Pending",
                  date: "Dec 17, 2024",
                },
              ].map((order) => (
                <tr key={order.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold">{order.id}</td>
                  <td className="admin-panel-table-cell">{order.customer}</td>
                  <td className="admin-panel-table-cell text-primary font-semibold">{order.amount}</td>
                  <td className="admin-panel-table-cell">
                    <span
                      className={`admin-panel-badge ${
                        order.status === "Delivered"
                          ? "admin-panel-badge-success"
                          : order.status === "Processing"
                            ? "admin-panel-badge-warning"
                            : "admin-panel-badge-info"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="admin-panel-table-cell">{order.date}</td>
                  <td className="admin-panel-table-cell">
                    <a
                      href={`/admin-panel/orders/${order.id}`}
                      className="text-primary hover:underline text-sm font-semibold"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 p-4">
          {[
            { id: "#ORD-001", customer: "John Doe", amount: "$245.99", status: "Delivered", date: "Dec 18, 2024" },
            {
              id: "#ORD-002",
              customer: "Jane Smith",
              amount: "$180.50",
              status: "Processing",
              date: "Dec 17, 2024",
            },
            {
              id: "#ORD-003",
              customer: "Mike Johnson",
              amount: "$320.00",
              status: "Pending",
              date: "Dec 17, 2024",
            },
          ].map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-sm">{order.id}</span>
                <span
                  className={`admin-panel-badge ${
                    order.status === "Delivered"
                      ? "admin-panel-badge-success"
                      : order.status === "Processing"
                        ? "admin-panel-badge-warning"
                        : "admin-panel-badge-info"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer:</span>
                  <span>{order.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="text-primary font-semibold">{order.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{order.date}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <a
                  href={`/admin-panel/orders/${order.id}`}
                  className="text-primary hover:underline text-sm font-semibold"
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
