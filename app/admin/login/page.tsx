"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const adminAccounts = [
    { email: "admin@reach.com", password: "admin123", role: "Super Admin", name: "John Admin" },
    { email: "support@reach.com", password: "support123", role: "Support Agent", name: "Mike Support" },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("Attempting login with:", email, password)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const admin = adminAccounts.find((acc) => acc.email === email && acc.password === password)
      console.log("Found admin:", admin)

      if (admin) {
        // Store admin session
        const adminAuth = {
          email: admin.email,
          role: admin.role,
          name: admin.name,
          loginTime: new Date().toISOString(),
        }

        localStorage.setItem("adminAuth", JSON.stringify(adminAuth))
        console.log("Admin auth stored:", adminAuth)

        // Navigate to admin dashboard
        router.push("/admin")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Login failed. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Reach Admin</h1>
          <p className="text-gray-400">Secure access to admin dashboard</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Admin Login</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="admin@reach.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white pr-10"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="bg-red-900/50 border-red-700">
                  <AlertDescription className="text-red-300">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Demo Accounts:</p>
              <div className="space-y-1 text-xs text-gray-300">
                <div>Super Admin: admin@reach.com / admin123</div>
                <div>Support: support@reach.com / support123</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
