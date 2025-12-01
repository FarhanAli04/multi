import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || "admin@sarstore.com"
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123456"

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 })
    }

    // Generate a simple token
    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64")

    const response = NextResponse.json(
      {
        success: true,
        token,
        email,
        message: "Admin login successful",
      },
      { status: 200 },
    )

    response.cookies.set("admin_token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    })

    response.cookies.set("admin_email", email, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    })

    return response
  } catch (error) {
    console.log("[v0] Admin login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
