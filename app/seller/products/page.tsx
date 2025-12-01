"use client"

import { SellerSidebar } from "@/components/seller/sidebar"
import { SellerHeader } from "@/components/seller/header"
import { Edit, Trash2, Eye, MoreVertical } from "lucide-react"

export default function SellerProductsPage() {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 2499, stock: 45, views: 1250, status: "Active" },
    { id: 2, name: "USB-C Cable", price: 399, stock: 120, views: 3450, status: "Active" },
    { id: 3, name: "Phone Case", price: 599, stock: 0, views: 890, status: "Out of Stock" },
  ]

  return (
    <div className="flex bg-background">
      <SellerSidebar />

      <div className="flex-1 flex flex-col">
        <SellerHeader />

        <main className="flex-1 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Products</h1>
              <p className="text-muted-foreground">Manage your store inventory</p>
            </div>
            <button className="btn-primary">Add Product</button>
          </div>

          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground">Product Name</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Price</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Stock</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Views</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="py-3 px-4 font-medium">{product.name}</td>
                      <td className="py-3 px-4">₹{product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">{product.stock} units</td>
                      <td className="py-3 px-4 text-muted-foreground flex items-center gap-1">
                        <Eye size={16} /> {product.views}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            product.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-muted rounded transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 hover:bg-muted rounded transition-colors">
                            <Trash2 size={16} />
                          </button>
                          <button className="p-2 hover:bg-muted rounded transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
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
