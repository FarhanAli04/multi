import { Heart, Star } from "lucide-react"

export interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  seller: string
  stock: number
}

export function ProductCard({ name, price, originalPrice, image, rating, reviews, seller, stock }: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="relative mb-4 overflow-hidden rounded-lg bg-muted h-48">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-danger text-white px-2 py-1 rounded text-sm font-bold">
            -{discount}%
          </div>
        )}
        <button className="absolute top-2 left-2 p-2 bg-white rounded-full hover:bg-muted transition-colors">
          <Heart size={18} />
        </button>
      </div>

      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{name}</h3>

      <div className="flex items-center gap-1 mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-warning text-warning" : "text-border"} />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">({reviews})</span>
      </div>

      <p className="text-xs text-muted-foreground mb-3">by {seller}</p>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-xl font-bold text-foreground">₹{price}</span>
        {originalPrice && <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>}
      </div>

      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${stock > 10 ? "text-success" : "text-warning"}`}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </span>
        <button className="btn-primary text-sm">Add to Cart</button>
      </div>
    </div>
  )
}
