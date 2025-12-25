"use client"

import { useEffect, useMemo, useState } from "react"
import { SellerSidebar } from "@/components/seller/sidebar"
import { SellerHeader } from "@/components/seller/header"
import { ArrowUp, ArrowDown, Download, Send } from "lucide-react"

type Order = {
  id: number
  status?: string
  total_amount?: number | string
  created_at?: string
}

type WalletTransaction = {
  id: number
  type: "credit" | "debit"
  description: string
  amount: number
  date: string
  status: "Completed" | "Processing"
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function SellerWalletPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((v) => !v)
  }

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setIsLoading(true)
        setError("")
        const res = await fetch("/api/backend/seller/orders")
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load wallet")
        }
        const list = Array.isArray(data?.orders) ? data.orders : []
        if (!cancelled) setOrders(list)
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load wallet")
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const { totalEarned, availableBalance, processingAmount, incomeThisMonth } = useMemo(() => {
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    let earned = 0
    let available = 0
    let processing = 0
    let incomeMonth = 0

    for (const o of orders) {
      const status = String(o.status || "").toLowerCase()
      if (status === "cancelled") continue

      const amount = Number(o.total_amount || 0) || 0
      earned += amount

      if (status === "delivered") {
        available += amount
      } else {
        processing += amount
      }

      const created = o.created_at ? new Date(o.created_at) : null
      if (created && created >= monthStart) {
        incomeMonth += amount
      }
    }

    return {
      totalEarned: earned,
      availableBalance: available,
      processingAmount: processing,
      incomeThisMonth: incomeMonth,
    }
  }, [orders])

  const transactions: WalletTransaction[] = useMemo(() => {
    const txns: WalletTransaction[] = orders
      .filter((o) => String(o.status || "").toLowerCase() !== "cancelled")
      .map((o) => {
        const status = String(o.status || "").toLowerCase()
        const isCompleted = status === "delivered"
        const createdAt = o.created_at ? new Date(o.created_at) : null
        const date = createdAt ? createdAt.toISOString().slice(0, 10) : ""
        const amount = Number(o.total_amount || 0) || 0

        return {
          id: Number(o.id),
          type: "credit",
          description: `Order #${o.id} Payment`,
          amount,
          date,
          status: isCompleted ? "Completed" : "Processing",
        }
      })

    txns.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id - a.id))
    return txns
  }, [orders])

  return (
    <div className="flex bg-background">
      <SellerSidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col">
        <SellerHeader onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds and transactions</p>
          </div>

          {error ? (
            <div className="mb-6 rounded-lg border border-border bg-muted p-4 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {/* Wallet Balance Card */}
          <div className="card bg-gradient-to-br from-primary to-primary-dark text-primary-foreground mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-4xl font-bold mt-2">{formatMoney(availableBalance)}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Total Earned</p>
                <p className="text-4xl font-bold mt-2">{formatMoney(totalEarned)}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Processing</p>
                <p className="text-4xl font-bold mt-2">{formatMoney(processingAmount)}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-8 border-t border-primary-foreground/20">
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-primary rounded-lg hover:bg-muted transition-colors font-medium">
                <Send size={18} />
                Withdraw Funds
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-primary-foreground rounded-lg hover:bg-primary-foreground/10 transition-colors font-medium">
                <Download size={18} />
                Export Statement
              </button>
            </div>
          </div>

          {/* Wallet Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card border-t-4 border-t-success">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Income This Month</p>
                  <p className="text-3xl font-bold mt-2">{formatMoney(incomeThisMonth)}</p>
                </div>
                <div className="bg-success/10 p-3 rounded-lg">
                  <ArrowDown className="text-success" size={24} />
                </div>
              </div>
            </div>

            <div className="card border-t-4 border-t-danger">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expenses This Month</p>
                  <p className="text-3xl font-bold mt-2">{formatMoney(0)}</p>
                </div>
                <div className="bg-danger/10 p-3 rounded-lg">
                  <ArrowUp className="text-danger" size={24} />
                </div>
              </div>
            </div>

            <div className="card border-t-4 border-t-primary">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Balance</p>
                  <p className="text-3xl font-bold mt-2">{formatMoney(availableBalance)}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <ArrowDown className="text-primary" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Description</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td className="py-6 px-4 text-muted-foreground" colSpan={5}>
                        Loading...
                      </td>
                    </tr>
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td className="py-6 px-4 text-muted-foreground" colSpan={5}>
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((txn) => (
                      <tr key={txn.id} className="border-b border-border hover:bg-muted transition-colors">
                        <td className="py-3 px-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              txn.type === "credit" ? "bg-success/10" : "bg-danger/10"
                            }`}
                          >
                            {txn.type === "credit" ? (
                              <ArrowDown className="text-success" size={16} />
                            ) : (
                              <ArrowUp className="text-danger" size={16} />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{txn.description}</td>
                        <td
                          className={`py-3 px-4 font-semibold ${
                            txn.type === "credit" ? "text-success" : "text-danger"
                          }`}
                        >
                          {txn.type === "credit" ? "+" : "-"}
                          {formatMoney(Math.abs(txn.amount))}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{txn.date}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              txn.status === "Completed"
                                ? "bg-success/10 text-success"
                                : "bg-warning/10 text-warning"
                            }`}
                          >
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
