import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const pathname = request.nextUrl.pathname
  const isAdminPanelRoute = pathname.startsWith("/admin-panel")
  const isAdminLoginRoute = pathname === "/auth/admin-login"
  const isAdminApiRoute = pathname.startsWith("/api/auth/admin")

  if (isAdminLoginRoute || isAdminApiRoute) {
    return NextResponse.next()
  }

  if (isAdminPanelRoute) {
    const adminToken = request.cookies.get("admin_token")?.value

    if (!adminToken) {
      const loginUrl = new URL("/auth/admin-login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Token exists, allow access
    return NextResponse.next()
  }

  // If Supabase is not configured, allow request to proceed (demo mode)
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next()
  }

  const response = await update(request)
  return response
}

async function update(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          const response = NextResponse.next()
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
          return response
        },
      },
    },
  )

  const { data } = await supabase.auth.getUser()

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/seller") || request.nextUrl.pathname.startsWith("/customer")

  if (!data.user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
