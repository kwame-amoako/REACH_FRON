"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPreview() {
  const router = useRouter()

  useEffect(() => {
    // Auto-login as Super Admin for preview
    const adminAuth = {
      email: "admin@reach.com",
      role: "Super Admin",
      name: "John Admin",
      loginTime: new Date().toISOString(),
    }

    localStorage.setItem("adminAuth", JSON.stringify(adminAuth))
    router.push("/admin")
  }, [router])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-2xl">🔐</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Initializing Admin Dashboard</h1>
        <p className="text-gray-400">Logging you in as Super Admin...</p>
      </div>
    </div>
  )
}
