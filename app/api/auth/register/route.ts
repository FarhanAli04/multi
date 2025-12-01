import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const role = formData.get("role") as string
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Validate basic fields
    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Validate seller fields
    if (role === "seller") {
      const username = formData.get("username") as string
      const storeName = formData.get("storeName") as string
      const mobileNumber = formData.get("mobileNumber") as string
      const promoCode = formData.get("promoCode") as string
      const idFrontImage = formData.get("idFrontImage") as File
      const idBackImage = formData.get("idBackImage") as File

      if (!username || username.length < 3) {
        return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 })
      }

      if (!storeName) {
        return NextResponse.json({ error: "Store name is required" }, { status: 400 })
      }

      if (!mobileNumber) {
        return NextResponse.json({ error: "Mobile number is required" }, { status: 400 })
      }

      if (!/^\d{4}$/.test(promoCode)) {
        return NextResponse.json({ error: "Promo code must be exactly 4 digits" }, { status: 400 })
      }

      if (!idFrontImage || !idBackImage) {
        return NextResponse.json({ error: "ID images are required" }, { status: 400 })
      }

      // Validate image files
      if (!idFrontImage.type.startsWith("image/") || !idBackImage.type.startsWith("image/")) {
        return NextResponse.json({ error: "Invalid image format" }, { status: 400 })
      }

      // TODO: Upload images to Vercel Blob or Supabase when integrations are set up
      // TODO: Verify promo code against database
      // TODO: Create seller record with verification_status = 'pending'
    }

    // TODO: Create user in Supabase Auth and database when integration is set up

    return NextResponse.json(
      {
        success: true,
        role,
        email,
        message: `${role === "seller" ? "Seller" : "Customer"} registration successful. Please check your email to verify your account.`,
      },
      { status: 201 },
    )
  } catch (error) {
    console.log("[v0] Register error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
