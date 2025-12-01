import { getSupabaseServerClient } from "@/lib/supabase-server"
import { getCurrentUser } from "@/lib/auth-utils"

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await getSupabaseServerClient()

    // Get orders based on user role
    let query = supabase.from("orders").select("*")

    if (user.role === "customer") {
      query = query.eq("customer_id", user.id)
    } else if (user.role === "seller") {
      const { data: seller } = await supabase.from("sellers").select("id").eq("user_id", user.id).single()

      if (seller) {
        query = query.eq("seller_id", seller.id)
      }
    }

    const { data: orders, error } = await query

    if (error) throw error

    return Response.json(orders)
  } catch (error) {
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "customer") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { sellerId, items, shippingAddress, paymentMethod } = await request.json()
    const supabase = await getSupabaseServerClient()

    // Calculate total
    let totalAmount = 0
    for (const item of items) {
      const { data: product } = await supabase.from("products").select("price").eq("id", item.productId).single()

      if (product) {
        totalAmount += product.price * item.quantity
      }
    }

    // Create order
    const orderNumber = `ORD-${Date.now()}`
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: user.id,
        seller_id: sellerId,
        order_number: orderNumber,
        total_amount: totalAmount,
        shipping_address: shippingAddress,
        status: "pending",
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    for (const item of items) {
      const { data: product } = await supabase.from("products").select("price").eq("id", item.productId).single()

      if (product) {
        await supabase.from("order_items").insert({
          order_id: order.id,
          product_id: item.productId,
          quantity: item.quantity,
          unit_price: product.price,
          subtotal: product.price * item.quantity,
        })
      }
    }

    return Response.json(order)
  } catch (error) {
    return Response.json({ error: "Failed to create order" }, { status: 500 })
  }
}
