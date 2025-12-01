"use client"

import { Bell, User, Search, Settings, LogOut, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function AdminPanelHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [adminEmail, setAdminEmail] = useState("admin@sarstore.com")
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  useEffect(() => {
    const cookies = document.cookie.split(";")
    const emailCookie = cookies.find((c) => c.trim().startsWith("admin_email="))
    if (emailCookie) {
      setAdminEmail(decodeURIComponent(emailCookie.split("=")[1]))
    }
  }, [])

  const handleLogout = () => {
    // Clear admin cookies
    document.cookie = "admin_token=; path=/; max-age=0"
    document.cookie = "admin_email=; path=/; max-age=0"

    // Full page redirect to trigger middleware
    window.location.href = "/auth/admin-login"
  }

  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button - only show on mobile */}
        <button
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={() => {
            // This will be handled by the sidebar component
            const event = new CustomEvent('toggleSidebar')
            window.dispatchEvent(event)
          }}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search bar - hidden on mobile when search is not active */}
        <div className={`${showMobileSearch ? 'block' : 'hidden'} lg:block flex-1 max-w-2xl mx-4`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders, products, users..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              onBlur={() => isMobile && setShowMobileSearch(false)}
              autoFocus={showMobileSearch}
            />
            {isMobile && showMobileSearch && (
              <button
                onClick={() => setShowMobileSearch(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search button - only show on mobile */}
          <button
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Settings */}
          <Link 
            href="/admin-panel/settings" 
            className={`p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted ${
              pathname === '/admin-panel/settings' ? 'text-foreground bg-muted' : ''
            }`}
          >
            <Settings className="h-5 w-5" />
          </Link>

          {/* Theme Toggle */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* User Menu */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-muted"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">Admin</span>
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card border border-border z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium">{adminEmail}</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
