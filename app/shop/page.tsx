"use client"

import { CustomerNavbar } from "@/components/customer/navbar"
import { ProductCard } from "@/components/customer/product-card"

export default function ShopPage() {
  const products = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones with Noise Cancellation",
      price: 2499,
      originalPrice: 4999,
      image: "/wireless-headphones.jpg",
      rating: 4.5,
      reviews: 234,
      seller: "Tech Store Pro",
      stock: 45,
    },
    {
      id: "2",
      name: "Premium USB-C Fast Charging Cable 3M",
      price: 399,
      originalPrice: 799,
      image: "/usb-cable.jpg",
      rating: 4.8,
      reviews: 512,
      seller: "Electronics Hub",
      stock: 120,
    },
    {
      id: "3",
      name: "Protective Phone Case - TPU Material",
      price: 599,
      originalPrice: 999,
      image: "/stylish-phone-case.png",
      rating: 4.3,
      reviews: 156,
      seller: "Accessories World",
      stock: 89,
    },
    {
      id: "4",
      name: "Portable 20000mAh Power Bank",
      price: 1299,
      originalPrice: 1999,
      image: "/power-bank.jpg",
      rating: 4.6,
      reviews: 389,
      seller: "Power Devices Store",
      stock: 67,
    },
    {
      id: "5",
      name: "HD Webcam 1080P with Microphone",
      price: 1899,
      originalPrice: 2999,
      image: "/webcam-hd.png",
      rating: 4.4,
      reviews: 223,
      seller: "Camera Electronics",
      stock: 34,
    },
    {
      id: "6",
      name: "Mechanical Gaming Keyboard RGB",
      price: 3499,
      originalPrice: 5999,
      image: "/gaming-keyboard.jpg",
      rating: 4.7,
      reviews: 445,
      seller: "Gaming Gear Store",
      stock: 52,
    },
  ]

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
                  {["Electronics", "Accessories", "Clothing", "Home & Garden"].map((cat) => (
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
                    <span>₹0</span>
                    <span>₹10,000</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
