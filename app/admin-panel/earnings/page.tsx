"use client"

import { useState } from "react"
import { TrendingUp, Wallet, DollarSign, Download, RefreshCw, Search, Filter, Eye, CheckCircle, Clock, AlertCircle, Calendar, BarChart3, PieChart, Activity, CreditCard, ArrowUpRight, ArrowDownRight, MoreVertical, FileText, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface VendorEarning {
  id: number;
  name: string;
  totalSales: string;
  commission: number;
  adminEarnings: string;
  pendingWithdrawal: string;
  status: "Active" | "Pending" | "Suspended";
  lastWithdrawal: string;
  totalWithdrawn: string;
  monthlySales: number[];
  paymentMethod: string;
  bankAccount: string;
  email: string;
  phone: string;
  joinDate: string;
  performance: {
    avgOrderValue: string;
    totalOrders: number;
    conversionRate: number;
    refundRate: number;
  };
}

export default function EarningsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("sales")
  const [selectedVendor, setSelectedVendor] = useState<VendorEarning | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [globalCommission, setGlobalCommission] = useState(10)
  const [autoApproveWithdrawals, setAutoApproveWithdrawals] = useState(false)
  const [vendors, setVendors] = useState<VendorEarning[]>([
    {
      id: 1,
      name: "Tech Store",
      totalSales: "$45,230",
      commission: 10,
      adminEarnings: "$4,523",
      pendingWithdrawal: "$12,450",
      status: "Active",
      lastWithdrawal: "Dec 15, 2024",
      totalWithdrawn: "$32,450",
      monthlySales: [3200, 3800, 4100, 3900, 4200, 4500, 4800, 5100, 4900, 5200, 5500, 5800],
      paymentMethod: "Bank Transfer",
      bankAccount: "****1234",
      email: "tech@example.com",
      phone: "+1 234 567 8900",
      joinDate: "Jan 15, 2024",
      performance: {
        avgOrderValue: "$125.50",
        totalOrders: 360,
        conversionRate: 3.2,
        refundRate: 2.1
      }
    },
    {
      id: 2,
      name: "Fashion Hub",
      totalSales: "$32,100",
      commission: 12,
      adminEarnings: "$3,852",
      pendingWithdrawal: "$8,920",
      status: "Active",
      lastWithdrawal: "Dec 10, 2024",
      totalWithdrawn: "$23,450", 
      monthlySales: [2100, 2300, 2500, 2400, 2600, 2800, 2900, 3100, 3000, 3200, 3400, 3500],
      paymentMethod: "PayPal",
      bankAccount: "****5678",
      email: "fashion@example.com", 
      phone: "+1 234 567 8901",
      joinDate: "Feb 20, 2024",
      performance: {
        avgOrderValue: "$89.25",
        totalOrders: 359,
        conversionRate: 2.8,
        refundRate: 3.5
      }
    },
    {
      id: 3,
      name: "Electronics Pro",
      totalSales: "$28,550",
      commission: 10,
      adminEarnings: "$2,855",
      pendingWithdrawal: "$5,234",
      status: "Pending",
      lastWithdrawal: "Nov 28, 2024",
      totalWithdrawn: "$18,200",
      monthlySales: [1800, 2000, 2200, 2100, 2300, 2400, 2500, 2600, 2400, 2700, 2800, 2900],
      paymentMethod: "Stripe",
      bankAccount: "****9012",
      email: "electronics@example.com",
      phone: "+1 234 567 8902",
      joinDate: "Mar 10, 2024",
      performance: {
        avgOrderValue: "$79.50",
        totalOrders: 359,
        conversionRate: 2.5,
        refundRate: 4.2
      }
    },
  ])

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || vendor.status === statusFilter
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    switch(sortBy) {
      case "sales": return parseFloat(b.totalSales.replace('$', '').replace(',', '')) - parseFloat(a.totalSales.replace('$', '').replace(',', ''))
      case "earnings": return parseFloat(b.adminEarnings.replace('$', '').replace(',', '')) - parseFloat(a.adminEarnings.replace('$', '').replace(',', ''))
      case "pending": return parseFloat(b.pendingWithdrawal.replace('$', '').replace(',', '')) - parseFloat(a.pendingWithdrawal.replace('$', '').replace(',', ''))
      case "commission": return b.commission - a.commission
      default: return 0
    }
  })

  const handleView = (vendor: VendorEarning) => {
    setSelectedVendor(vendor)
    setIsViewDialogOpen(true)
  }

  const handleApproveWithdrawal = (vendorId: number) => {
    if (confirm("Approve this withdrawal request?")) {
      setVendors(vendors.map(vendor => 
        vendor.id === vendorId 
          ? { ...vendor, pendingWithdrawal: "$0", totalWithdrawn: 
              `$${(parseFloat(vendor.totalWithdrawn.replace('$', '').replace(',', '')) + 
                   parseFloat(vendor.pendingWithdrawal.replace('$', '').replace(',', ''))).toFixed(2)}` }
          : vendor
      ))
      alert("Withdrawal approved and processed!")
    }
  }

  const handleRejectWithdrawal = (vendorId: number) => {
    if (confirm("Reject this withdrawal request?")) {
      setVendors(vendors.map(vendor => 
        vendor.id === vendorId ? { ...vendor, pendingWithdrawal: "$0" } : vendor
      ))
      alert("Withdrawal rejected!")
    }
  }

  const handleUpdateCommission = () => {
    if (confirm(`Update global commission rate to ${globalCommission}% for all vendors?`)) {
      setVendors(vendors.map(vendor => ({ ...vendor, commission: globalCommission })))
      alert("Commission rates updated!")
    }
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Vendor,Total Sales,Commission,Admin Earnings,Pending Withdrawal,Status,Total Withdrawn\n" +
      filteredVendors.map(vendor => 
        `${vendor.name},${vendor.totalSales},${vendor.commission}%,${vendor.adminEarnings},${vendor.pendingWithdrawal},${vendor.status},${vendor.totalWithdrawn}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "earnings.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "Suspended": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const totalSales = vendors.reduce((sum, v) => sum + parseFloat(v.totalSales.replace('$', '').replace(',', '')), 0)
  const totalAdminEarnings = vendors.reduce((sum, v) => sum + parseFloat(v.adminEarnings.replace('$', '').replace(',', '')), 0)
  const totalPendingWithdrawals = vendors.reduce((sum, v) => sum + parseFloat(v.pendingWithdrawal.replace('$', '').replace(',', '')), 0)
  const totalWithdrawn = vendors.reduce((sum, v) => sum + parseFloat(v.totalWithdrawn.replace('$', '').replace(',', '')), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vendor Earnings & Withdrawals</h1>
        <p className="text-muted-foreground mt-1">Manage commission and vendor payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="admin-panel-table p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Platform Sales</p>
              <h3 className="text-2xl font-bold">$105,880</h3>
            </div>
            <TrendingUp size={32} className="text-primary" />
          </div>
        </div>
        <div className="admin-panel-table p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Admin Commission Earned</p>
              <h3 className="text-2xl font-bold">$11,230</h3>
            </div>
            <Wallet size={32} className="text-green-600" />
          </div>
        </div>
        <div className="admin-panel-table p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Withdrawals</p>
              <h3 className="text-2xl font-bold">$26,604</h3>
            </div>
            <DollarSign size={32} className="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Commission Configuration */}
      <div className="admin-panel-table p-6">
        <h2 className="text-lg font-bold mb-4">Commission Rates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Global Commission Rate (%)</label>
            <input type="number" defaultValue="10" className="admin-panel-search-input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Apply to All Categories</label>
            <button className="admin-panel-btn-primary">Apply</button>
          </div>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="admin-panel-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="admin-panel-table-header-cell">Vendor</th>
                <th className="admin-panel-table-header-cell">Total Sales</th>
                <th className="admin-panel-table-header-cell">Commission</th>
                <th className="admin-panel-table-header-cell">Admin Earnings</th>
                <th className="admin-panel-table-header-cell">Pending Withdrawal</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="admin-panel-table-row">
                  <td className="admin-panel-table-cell font-semibold">{vendor.name}</td>
                  <td className="admin-panel-table-cell">{vendor.totalSales}</td>
                  <td className="admin-panel-table-cell">{vendor.commission}</td>
                  <td className="admin-panel-table-cell text-green-600 font-bold">{vendor.adminEarnings}</td>
                  <td className="admin-panel-table-cell text-orange-600 font-bold">{vendor.pendingWithdrawal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
