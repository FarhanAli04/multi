"use client"

import { useEffect, useMemo, useState } from "react"
import { CustomerNavbar } from "@/components/customer/navbar"
import { Trash2, Plus, Minus } from "lucide-react"

type CartItem = {
  product_id: number
  quantity: number
  name?: string
  price?: number | string
  image_url?: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const loadCart = async () => {
    try {
      setIsLoading(true)
      setError("")
      const res = await fetch("/api/backend/cart")
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load cart")
      }
      setCartItems(Array.isArray(data?.items) ? data.items : [])
    } catch (e: any) {
      setError(e?.message || "Failed to load cart")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      setUpdatingId(productId)
      setError("")
      const res = await fetch(`/api/backend/cart/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error || "Failed to update cart")
      }
      await loadCart()
    } catch (e: any) {
      setError(e?.message || "Failed to update cart")
    } finally {
      setUpdatingId(null)
    }
  }

  const removeItem = async (productId: number) => {
    try {
      setUpdatingId(productId)
      setError("")
      const res = await fetch(`/api/backend/cart/${productId}`, { method: "DELETE" })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error || "Failed to remove item")
      }
      await loadCart()
    } catch (e: any) {
      setError(e?.message || "Failed to remove item")
    } finally {
      setUpdatingId(null)
    }
  }

  const { subtotal, tax, shipping, total } = useMemo(() => {
    const sub = cartItems.reduce((sum, item) => sum + (Number(item.price || 0) || 0) * (Number(item.quantity || 0) || 0), 0)
    const t = Math.round(sub * 0.18)
    const ship = cartItems.length > 0 ? 99 : 0
    return { subtotal: sub, tax: t, shipping: ship, total: sub + t + ship }
  }, [cartItems])

  return (
    <>
      <CustomerNavbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{cartItems.length} items in cart</p>
        </div>

        {error ? <div className="mb-6 rounded-lg border border-border bg-muted p-4 text-sm text-destructive">{error}</div> : null}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card space-y-6">
              {isLoading ? (
                <div className="text-muted-foreground">Loading...</div>
              ) : cartItems.length === 0 ? (
                <div className="text-muted-foreground">Your cart is empty.</div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex gap-6 pb-6 border-b border-border last:pb-0 last:border-b-0"
                  >
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name || "Product"}
                    className="w-24 h-24 object-cover rounded-lg bg-muted"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name || "Product"}</h3>
                    <p className="text-primary font-bold mt-1">₹{Number(item.price || 0).toFixed(0)}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 hover:bg-muted rounded"
                          disabled={updatingId === item.product_id || item.quantity <= 1}
                          onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          className="p-1 hover:bg-muted rounded"
                          disabled={updatingId === item.product_id}
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        className="ml-auto p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                        disabled={updatingId === item.product_id}
                        onClick={() => removeItem(item.product_id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">₹{(Number(item.price || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                  </div>
                ))
              )}
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

              <button className="w-full btn-primary" disabled={cartItems.length === 0}>
                Proceed to Checkout
              </button>

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
