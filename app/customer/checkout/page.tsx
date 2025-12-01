"use client"

import { CustomerNavbar } from "@/components/customer/navbar"
import { Truck, Wallet, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "online">("online")

  return (
    <>
      <CustomerNavbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="card">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Truck size={24} className="text-primary" />
                Shipping Address
              </h2>

              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="input" />
                <input type="text" placeholder="Phone Number" className="input" />
                <input type="text" placeholder="Address" className="input" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="input" />
                  <input type="text" placeholder="Postal Code" className="input" />
                </div>
                <button type="button" className="btn-secondary w-full">
                  Use Saved Address
                </button>
              </form>
            </div>

            {/* Delivery Options */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Delivery Options</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-primary rounded-lg cursor-pointer bg-primary/5">
                  <input type="radio" name="delivery" defaultChecked className="w-4 h-4" />
                  <div className="ml-4">
                    <p className="font-semibold">Standard Delivery</p>
                    <p className="text-sm text-muted-foreground">3-5 business days • ₹99</p>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                  <input type="radio" name="delivery" className="w-4 h-4" />
                  <div className="ml-4">
                    <p className="font-semibold">Express Delivery</p>
                    <p className="text-sm text-muted-foreground">1-2 business days • ₹499</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "online" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value as "online" | "wallet")}
                    className="w-4 h-4"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">Online Payment</p>
                    <p className="text-sm text-muted-foreground">Credit/Debit Card, UPI, etc.</p>
                  </div>
                </label>
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === "wallet"}
                    onChange={(e) => setPaymentMethod(e.target.value as "online" | "wallet")}
                    className="w-4 h-4"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold flex items-center gap-2">
                      <Wallet size={16} />
                      Wallet
                    </p>
                    <p className="text-sm text-muted-foreground">Available Balance: ₹2,500</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card sticky top-20">
              <h3 className="text-lg font-bold mb-6">Order Summary</h3>

              <div className="space-y-3 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span>3 items</span>
                  <span>₹3,497</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>₹629</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>₹99</span>
                </div>
              </div>

              <div className="flex justify-between mt-6 mb-6">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">₹4,225</span>
              </div>

              {paymentMethod === "wallet" && (
                <div className="mb-6 p-3 bg-warning/10 rounded-lg flex gap-2">
                  <AlertCircle size={16} className="text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-warning">Wallet balance is insufficient. Please choose online payment.</p>
                </div>
              )}

              <button className="w-full btn-primary">Place Order</button>

              <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-2">Your order is secure & encrypted</p>
                <p className="text-xs font-medium text-foreground">Syed Asad Raza</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
