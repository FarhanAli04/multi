"use client"

import { SellerSidebar } from "@/components/seller/sidebar"
import { SellerHeader } from "@/components/seller/header"
import { ArrowUp, ArrowDown, Download, Send } from "lucide-react"

export default function SellerWalletPage() {
  const transactions = [
    {
      id: 1,
      type: "credit",
      description: "Order #12001 Payment",
      amount: 2499,
      date: "2024-01-20",
      status: "Completed",
    },
    {
      id: 2,
      type: "credit",
      description: "Order #12002 Payment",
      amount: 5999,
      date: "2024-01-19",
      status: "Completed",
    },
    { id: 3, type: "debit", description: "Platform Fee", amount: -250, date: "2024-01-19", status: "Completed" },
    {
      id: 4,
      type: "debit",
      description: "Withdrawal to Bank",
      amount: -10000,
      date: "2024-01-18",
      status: "Processing",
    },
    {
      id: 5,
      type: "credit",
      description: "Refund - Order #11998",
      amount: 1299,
      date: "2024-01-17",
      status: "Completed",
    },
  ]

  return (
    <div className="flex bg-background">
      <SellerSidebar />

      <div className="flex-1 flex flex-col">
        <SellerHeader />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds and transactions</p>
          </div>

          {/* Wallet Balance Card */}
          <div className="card bg-gradient-to-br from-primary to-primary-dark text-primary-foreground mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-4xl font-bold mt-2">₹12,500</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Total Earned</p>
                <p className="text-4xl font-bold mt-2">₹85,420</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Processing</p>
                <p className="text-4xl font-bold mt-2">₹5,200</p>
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
                  <p className="text-3xl font-bold mt-2">₹45,230</p>
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
                  <p className="text-3xl font-bold mt-2">₹1,850</p>
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
                  <p className="text-3xl font-bold mt-2">₹43,380</p>
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
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="py-3 px-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            txn.type === "credit" ? "bg-success/10" : "bg-danger/10"
                          }`}
                        >
                          {txn.type === "credit" ? (
                            <ArrowDown className={txn.type === "credit" ? "text-success" : "text-danger"} size={16} />
                          ) : (
                            <ArrowUp className={txn.type === "credit" ? "text-success" : "text-danger"} size={16} />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{txn.description}</td>
                      <td
                        className={`py-3 px-4 font-semibold ${txn.type === "credit" ? "text-success" : "text-danger"}`}
                      >
                        {txn.type === "credit" ? "+" : "-"}₹{Math.abs(txn.amount).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{txn.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            txn.status === "Completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                          }`}
                        >
                          {txn.status}
                        </span>
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
