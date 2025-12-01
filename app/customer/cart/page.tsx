"use client"

import { CustomerNavbar } from "@/components/customer/navbar"
import { Trash2, Plus, Minus } from "lucide-react"

export default function CartPage() {
  const cartItems = [
    { id: 1, name: "Wireless Headphones", price: 2499, quantity: 1, image: "/placeholder.svg" },
    { id: 2, name: "USB-C Cable", price: 399, quantity: 2, image: "/placeholder.svg" },
    { id: 3, name: "Phone Case", price: 599, quantity: 1, image: "/placeholder.svg" },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.18)
  const shipping = 99
  const total = subtotal + tax + shipping

  return (
    <>
      <CustomerNavbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{cartItems.length} items in cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 pb-6 border-b border-border last:pb-0 last:border-b-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg bg-muted"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-primary font-bold mt-1">₹{item.price}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-muted rounded">
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button className="p-1 hover:bg-muted rounded">
                          <Plus size={16} />
                        </button>
                      </div>
                      <button className="ml-auto p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card sticky top-20">
              <h3 className="text-lg font-bold mb-6">Order Summary</h3>

              <div className="space-y-3 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">₹{shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mt-6 mb-6">
                <span className="font-bold text-lg">Total</span>
                <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
              </div>

              <button className="w-full btn-primary">Proceed to Checkout</button>

              <button className="w-full btn-secondary mt-3">Continue Shopping</button>

              <div className="mt-6 p-4 bg-success/10 rounded-lg">
                <p className="text-sm text-success font-medium">Free shipping on orders above ₹5000</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
