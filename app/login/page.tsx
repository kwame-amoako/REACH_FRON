"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://reach-backend-yq82.onrender.com"

type Step = "login" | "signup" | "otp"

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState<Step>("login")
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", phone: "" })
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: "login" | "signup") => {
    const { name, value } = e.target
    if (type === "login") setFormData((prev) => ({ ...prev, [name]: value }))
    else setSignupData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle login/signup
  const validateCredentials = async (isLogin: boolean) => {
    setIsLoading(true)
    setError("")
    try {
      if (isLogin) {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Login failed")

        setCurrentStep("otp") // Move to OTP step
      } else {
        const res = await fetch(`${API_BASE}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupData),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Signup failed")

        setCurrentStep("otp") // Move to OTP step
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  // Verify OTP
  const verifyOtpAndAuthenticate = async () => {
    setIsLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentStep === "login" ? formData.email : signupData.email,
          otp,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Invalid OTP")

      // Save token and redirect
      localStorage.setItem("token", data.token)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          {currentStep === "login" && "Login"}
          {currentStep === "signup" && "Sign Up"}
          {currentStep === "otp" && "Verify OTP"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {currentStep === "login" && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange(e, "login")}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange(e, "login")}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={() => validateCredentials(true)}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <p className="text-center mt-3">
              Don’t have an account?{" "}
              <button
                onClick={() => setCurrentStep("signup")}
                className="text-blue-600 underline"
              >
                Sign up
              </button>
            </p>
          </>
        )}

        {currentStep === "signup" && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={signupData.name}
              onChange={(e) => handleChange(e, "signup")}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) => handleChange(e, "signup")}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) => handleChange(e, "signup")}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={signupData.phone}
              onChange={(e) => handleChange(e, "signup")}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={() => validateCredentials(false)}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <button
                onClick={() => setCurrentStep("login")}
                className="text-blue-600 underline"
              >
                Login
              </button>
            </p>
          </>
        )}

        {currentStep === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={verifyOtpAndAuthenticate}
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 rounded"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
