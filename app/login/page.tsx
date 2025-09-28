"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Phone, Shield, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn === "true") {
      router.push("/dashboard")
    }
  }, [router])

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState<"credentials" | "otp">("credentials")

  // Form states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  // OTP and loading states
  const [otp, setOtp] = useState("")
  const [generatedOtp, setGeneratedOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [otpTimer, setOtpTimer] = useState(0)

  // Timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [otpTimer])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    setError("") // Clear error when user types
  }

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    setError("") // Clear error when user types
  }

  // Generate 4-digit OTP
  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString()
  }

  // Send OTP
  const sendOTP = async (email: string) => {
  try {
    setIsLoading(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) throw new Error("Failed to send OTP")

    const data = await response.json()
    setOtpTimer(60)
    return data.otpId
  } catch (err) {
    throw new Error("Failed to send OTP")
  } finally {
    setIsLoading(false)
  }
}


  // Validate credentials
  const validateCredentials = async (isLogin: boolean) => {
    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (isLogin) {
        // Login validation
        if (!formData.email || !formData.password) {
          throw new Error("Please fill in all fields")
        }

        if (!formData.email.includes("@")) {
          throw new Error("Please enter a valid email address")
        }

        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters")
        }

        // Check if user exists
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
        const user = registeredUsers.find((u: any) => u.email === formData.email)

        if (!user) {
          throw new Error("No account found with this email address")
        }
      } else {
        // Signup validation
        if (
          !signupData.firstName ||
          !signupData.lastName ||
          !signupData.email ||
          !signupData.phone ||
          !signupData.password ||
          !signupData.confirmPassword
        ) {
          throw new Error("Please fill in all fields")
        }

        if (!signupData.email.includes("@")) {
          throw new Error("Please enter a valid email address")
        }

        if (signupData.password.length < 6) {
          throw new Error("Password must be at least 6 characters")
        }

        if (signupData.password !== signupData.confirmPassword) {
          throw new Error("Passwords do not match")
        }

        if (!signupData.agreeToTerms) {
          throw new Error("Please agree to the Terms of Service and Privacy Policy")
        }

        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
        if (existingUsers.some((user: any) => user.email === signupData.email)) {
          throw new Error("An account with this email already exists")
        }
      }

      // Send OTP
      const email = isLogin ? formData.email : signupData.email
      await sendOTP(email)
      setCurrentStep("otp")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Validation failed")
    } finally {
      setIsLoading(false)
    }
  }

  // Verify OTP and authenticate
  const verifyOtpAndAuthenticate = async () => {
  setIsLoading(true)
  setError("")

  try {
    const otpId = localStorage.getItem("otpId")
    const email = localStorage.getItem("pendingEmail")

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, otpId }),
    })

    if (!res.ok) {
      const errData = await res.json()
      throw new Error(errData.message || "Invalid OTP")
    }

    const data = await res.json()

    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("token", data.token)
    localStorage.setItem("userEmail", email || "")

    router.push("/dashboard")
  } catch (err) {
    setError(err instanceof Error ? err.message : "Authentication failed")
  } finally {
    setIsLoading(false)
  }
}


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === "credentials") {
      await validateCredentials(activeTab === "login")
    } else {
      await verifyOtpAndAuthenticate()
    }
  }

  // Resend OTP
  const handleResendOtp = async () => {
    if (otpTimer > 0) return

    try {
      const email = activeTab === "login" ? formData.email : signupData.email
      await sendOTP(email)
    } catch (err) {
      setError("Failed to resend OTP")
    }
  }

  // Switch tabs
  const handleTabSwitch = (tab: "login" | "signup") => {
    setActiveTab(tab)
    setCurrentStep("credentials")
    setError("")
    setOtp("")
    setGeneratedOtp("")
    setOtpTimer(0)
  }

  // Go back to credentials
  const handleBackToCredentials = () => {
    setCurrentStep("credentials")
    setError("")
    setOtp("")
    setGeneratedOtp("")
    setOtpTimer(0)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Half - Forms Container */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col bg-white">
        <Link href="/" className="flex items-center text-gray-600 mb-8 hover:text-gray-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="flex-1 flex items-start justify-center min-h-0 py-4">
          <div className="max-w-md w-full py-4">
            {/* Step Indicator */}
            {currentStep === "otp" && (
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#1a4734] text-white rounded-full flex items-center justify-center text-sm font-medium">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="ml-2 text-sm text-[#1a4734] font-medium">Credentials</span>
                  </div>
                  <div className="w-8 h-0.5 bg-[#1a4734]"></div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#1a4734] text-white rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <span className="ml-2 text-sm text-[#1a4734] font-medium">Verification</span>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-900">
                {currentStep === "credentials"
                  ? activeTab === "login"
                    ? "Welcome back"
                    : "Create Account"
                  : "Verify Your Email"}
              </h1>
              <p className="text-gray-600">
                {currentStep === "credentials"
                  ? activeTab === "login"
                    ? "Sign in to your account to continue"
                    : "Join REACH and start your digital finance journey"
                  : `We've sent a 4-digit code to ${activeTab === "login" ? formData.email : signupData.email}`}
              </p>
            </div>

            {/* Tabs - Only show when on credentials step */}
            {currentStep === "credentials" && (
              <div className="flex border-b mb-8">
                <button
                  className={`flex-1 py-3 text-center font-medium transition-colors ${
                    activeTab === "login"
                      ? "border-b-2 border-[#1a4734] text-[#1a4734]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => handleTabSwitch("login")}
                  disabled={isLoading}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium transition-colors ${
                    activeTab === "signup"
                      ? "border-b-2 border-[#1a4734] text-[#1a4734]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => handleTabSwitch("signup")}
                  disabled={isLoading}
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* OTP Verification Step */}
            {currentStep === "otp" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#1a4734]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-[#1a4734]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    Enter 4-Digit Code
                  </label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="0000"
                    className="text-center text-2xl font-mono h-14 tracking-widest border-gray-300 focus:border-[#1a4734] focus:ring-[#1a4734]"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                      setOtp(value)
                      setError("")
                    }}
                    maxLength={4}
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500 text-center">Enter the 4-digit code sent to your email</p>
                </div>

                {/* Resend OTP */}
                <div className="text-center">
                  {otpTimer > 0 ? (
                    <p className="text-sm text-gray-600">Resend code in {otpTimer} seconds</p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-sm text-[#1a4734] hover:text-[#143626] font-medium"
                    >
                      Resend Code
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-[#1a4734] hover:bg-[#143626] h-12 text-white font-medium"
                    disabled={isLoading || otp.length !== 4}
                  >
                    {isLoading ? "Verifying..." : "Verify & Continue"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 bg-transparent"
                    onClick={handleBackToCredentials}
                    disabled={isLoading}
                  >
                    Back to {activeTab === "login" ? "Login" : "Sign Up"}
                  </Button>
                </div>
              </form>
            )}

            {/* Credentials Step */}
            {currentStep === "credentials" && (
              <>
                {/* Login Form */}
                {activeTab === "login" && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 h-12 border-gray-300 focus:border-[#1a4734] focus:ring-[#1a4734]"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#1a4734] focus:ring-[#1a4734]"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                          }
                          disabled={isLoading}
                        />
                        <label htmlFor="remember" className="text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                      <Link href="/forgot-password" className="text-sm text-[#1a4734] hover:text-[#143626]">
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1a4734] hover:bg-[#143626] h-12 text-white font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? "Validating..." : "Continue to Verification"}
                    </Button>
                  </form>
                )}

                {/* Signup Form */}
                {activeTab === "signup" && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="First name"
                            className="pl-10 h-12 border-gray-300 focus:border-[#1a4734] focus:ring-[#1a4734]"
                            value={signupData.firstName}
                            onChange={handleSignupInputChange}
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Last name"
                            className="pl-10 h-12 border-gray-300 focus:border-[#1a4734] focus:ring-[#1a4734]"
                            value={signupData.lastName}
                            onChange={handleSignupInputChange}
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="signupEmail"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 h-12 border-gray-300 focus:border-[#1a4734] focus:ring-[#1a4734]"
                          value={signupData.email}
                          onChange={handleSignupInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-10 h-12 border-gray-300 focus:border-[#1a4734] focus:ring-[#1a4734]"
                          value={signupData.phone}
                          onChange={handleSignupInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="signupPassword"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#1a4734] focus:ring-[#1a4734]"
                          value={signupData.password}
                          onChange={handleSignupInputChange}
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#1a4734] focus:ring-[#1a4734]"
                          value={signupData.confirmPassword}
                          onChange={handleSignupInputChange}
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={signupData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          setSignupData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                        }
                        className="mt-1"
                        disabled={isLoading}
                      />
                      <label htmlFor="agreeToTerms" className="text-sm text-gray-700 leading-5">
                        I agree to the{" "}
                        <Link href="/terms" className="text-[#1a4734] hover:text-[#143626]">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-[#1a4734] hover:text-[#143626]">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1a4734] hover:bg-[#143626] h-12 text-white font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? "Validating..." : "Continue to Verification"}
                    </Button>
                  </form>
                )}

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => handleTabSwitch(activeTab === "login" ? "signup" : "login")}
                      className="text-[#1a4734] hover:text-[#143626] font-medium"
                      disabled={isLoading}
                    >
                      {activeTab === "login" ? "Sign up here" : "Sign in here"}
                    </button>
                  </p>
                </div>
              </>
            )}

            {/* 2FA Security Notice */}
            {currentStep === "credentials" && (
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Enhanced Security</h4>
                    <p className="text-xs text-blue-800 mt-1">
                      We use two-factor authentication to keep your account secure. You'll receive a verification code
                      via email.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Half - Benefits Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src={activeTab === "signup" ? "/images/signup-benefits.png" : "/images/reach-benefits.png"}
          alt={
            activeTab === "signup"
              ? "Why Choose REACH - Features including secure transactions, real-time cryptocurrency trading, competitive gift card rates, global money transfers, and 24/7 customer support with green background and cryptocurrency coins"
              : "Why Choose REACH - Benefits including secure transactions, cryptocurrency trading, gift card rates, money transfers, and customer support with green background and cryptocurrency coins"
          }
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
