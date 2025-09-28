"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Users, CreditCard, Gift, Settings, Shield, LogOut, Menu, X } from "lucide-react"
import Link from "next/link"

interface AdminAuth {
  email: string
  role: string
  name: string
  loginTime: string
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [adminAuth, setAdminAuth] = useState<AdminAuth | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    console.log("Admin layout effect running, pathname:", pathname)

    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsLoading(false)
      return
    }

    try {
      const auth = localStorage.getItem("adminAuth")
      console.log("Retrieved admin auth from localStorage:", auth)

      if (auth) {
        const parsedAuth = JSON.parse(auth)
        console.log("Parsed admin auth:", parsedAuth)
        setAdminAuth(parsedAuth)
      } else {
        console.log("No admin auth found, redirecting to login")
        router.replace("/admin/login")
        return
      }
    } catch (error) {
      console.error("Error parsing admin auth:", error)
      router.replace("/admin/login")
      return
    }

    setIsLoading(false)
  }, [pathname, router])

  const handleLogout = () => {
    console.log("Admin logging out")
    localStorage.removeItem("adminAuth")
    setAdminAuth(null)
    router.replace("/admin/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
    { name: "Gift Cards", href: "/admin/gift-cards", icon: Gift },
    { name: "Roles", href: "/admin/roles", icon: Shield },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  // Show login page without layout
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="text-white text-lg">Loading Admin Dashboard...</div>
          <div className="text-gray-400 text-sm mt-2">Please wait</div>
        </div>
      </div>
    )
  }

  // Redirect to login if no auth
  if (!adminAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-lg mb-4">Redirecting to login...</div>
          <Button onClick={() => router.replace("/admin/login")} className="bg-blue-600 hover:bg-blue-700">
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">Reach Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Admin Info */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-600 text-white">
                  {adminAuth.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">{adminAuth.name}</p>
                <Badge
                  className={`text-xs ${adminAuth.role === "Super Admin" ? "bg-purple-600" : "bg-blue-600"} text-white`}
                >
                  {adminAuth.role}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top bar */}
        <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Welcome back, {adminAuth.name}</span>
            <span className="text-sm text-gray-400">Last login: {new Date(adminAuth.loginTime).toLocaleString()}</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
