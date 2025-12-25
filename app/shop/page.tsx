"use client"

import { CustomerNavbar } from "@/components/customer/navbar"
import { ProductCard } from "@/components/customer/product-card"
import { useEffect, useMemo, useState } from "react"

export default function ShopPage() {
  const [products, setProducts] = useState<
    {
      id: string
      name: string
      price: number
      originalPrice?: number
      image: string
      rating: number
      reviews: number
      seller: string
      stock: number
    }[]
  >([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setIsLoading(true)
        setError("")

        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/backend/products"),
          fetch("/api/backend/categories"),
        ])

        const productsJson = await productsRes.json().catch(() => null)
        const categoriesJson = await categoriesRes.json().catch(() => null)

        if (!productsRes.ok) {
          throw new Error(productsJson?.error || "Failed to load products")
        }

        if (!categoriesRes.ok) {
          throw new Error(categoriesJson?.error || "Failed to load categories")
        }

        const mappedProducts = (productsJson?.products || []).map((p: any) => ({
          id: String(p.id),
          name: p.name,
          price: Number(p.price),
          originalPrice: p.original_price ? Number(p.original_price) : undefined,
          image: p.image_url || "/placeholder.svg",
          rating: Number(p.avg_rating || 0),
          reviews: Number(p.review_count || 0),
          seller: p.store_name || p.seller_name || "",
          stock: Number(p.stock ?? p.quantity ?? 0),
        }))

        const mappedCategories = (categoriesJson?.categories || []).map((c: any) => c.name).filter(Boolean)

        if (!cancelled) {
          setProducts(mappedProducts)
          setCategories(mappedCategories)
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Failed to load shop")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const categoryList = useMemo(() => {
    if (categories.length > 0) return categories
    return ["Electronics", "Accessories", "Clothing", "Home & Garden"]
  }, [categories])

  return (
    <>
      <CustomerNavbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shop Our Products</h1>
          <p className="text-muted-foreground">Browse thousands of products from trusted sellers</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="card space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categoryList.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-3">
                  <input type="range" min="0" max="10000" className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Rs 0</span>
                    <span>Rs 10,000</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">Rating</h3>
                <div className="space-y-2">
                  {["4★ & up", "3★ & up", "2★ & up", "1★ & up"].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="mb-6 flex justify-between items-center">
              <span className="text-muted-foreground">{products.length} products</span>
              <select className="input py-2">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Sellers</option>
                <option>Top Rated</option>
              </select>
            </div>

            {/* Product Grid */}
            {isLoading && (
              <div className="text-muted-foreground">Loading products...</div>
            )}

            {!isLoading && error && (
              <div className="text-red-600">{error}</div>
            )}

            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
