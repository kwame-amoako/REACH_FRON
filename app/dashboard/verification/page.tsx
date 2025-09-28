"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Search,
  Settings,
  Phone,
  Copy,
  CheckCircle,
  AlertTriangle,
  Clock,
  Menu,
  X,
  Bell,
  TrendingUp,
  CreditCard,
  Coins,
  ArrowUpRight,
  HelpCircle,
  LogOut,
} from "lucide-react"
import Link from "next/link"

// Sample verification services data
const verificationServices = [
  {
    id: 1,
    name: "WhatsApp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    price: 0.00015,
    country: "United States",
    available: true,
    category: "Social Media",
  },
  {
    id: 2,
    name: "Telegram",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    price: 0.00012,
    country: "United States",
    available: true,
    category: "Social Media",
  },
  {
    id: 3,
    name: "Instagram",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    price: 0.00018,
    country: "United States",
    available: true,
    category: "Social Media",
  },
  {
    id: 4,
    name: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    price: 0.00016,
    country: "United States",
    available: true,
    category: "Social Media",
  },
  {
    id: 5,
    name: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    price: 0.00014,
    country: "United States",
    available: true,
    category: "Social Media",
  },
  {
    id: 6,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    price: 0.0002,
    country: "United States",
    available: true,
    category: "Search Engine",
  },
  {
    id: 7,
    name: "Discord",
    logo: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png",
    price: 0.00013,
    country: "United States",
    available: true,
    category: "Gaming",
  },
  {
    id: 8,
    name: "TikTok",
    logo: "https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png",
    price: 0.00017,
    country: "United States",
    available: false,
    category: "Social Media",
  },
]

export default function VerificationPage() {
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [btcBalance, setBtcBalance] = useState(0.05421)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false)
  const [verificationStep, setVerificationStep] = useState<"select" | "processing" | "success" | "failed">("select")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [smsCode, setSmsCode] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [copySuccess, setCopySuccess] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [refundProcessed, setRefundProcessed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const email = localStorage.getItem("userEmail")

    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    if (email) {
      setUserEmail(email)
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const user = registeredUsers.find((u: any) => u.email === email)
      if (user) {
        setUserName(`${user.firstName} ${user.lastName}`)
      }

      // Load user's BTC balance
      const savedBalance = localStorage.getItem(`btcBalance_${email}`)
      if (savedBalance) {
        setBtcBalance(Number.parseFloat(savedBalance))
      }
    }
  }, [router])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timeRemaining])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const filteredServices = verificationServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleServiceSelect = (service: any) => {
    if (!service.available) {
      alert("This service is currently unavailable. Please try another service.")
      return
    }

    if (btcBalance < service.price) {
      alert("Insufficient balance. Please deposit more BTC to continue.")
      return
    }

    setSelectedService(service)
    setIsVerificationDialogOpen(true)
    setVerificationStep("select")
  }

  const startVerification = async () => {
    if (!selectedService) return

    setVerificationStep("processing")

    // Deduct balance
    const newBalance = btcBalance - selectedService.price
    setBtcBalance(newBalance)
    localStorage.setItem(`btcBalance_${userEmail}`, newBalance.toString())

    // Simulate getting phone number and SMS code
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate realistic phone number and SMS code
    const phoneNumbers = [
      "+1 (555) 123-4567",
      "+1 (555) 987-6543",
      "+1 (555) 246-8135",
      "+1 (555) 369-2580",
      "+1 (555) 147-2583",
    ]
    const smsCodes = ["123456", "789012", "345678", "901234", "567890"]

    const randomPhone = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)]
    const randomCode = smsCodes[Math.floor(Math.random() * smsCodes.length)]

    setPhoneNumber(randomPhone)
    setSmsCode(randomCode)
    setTimeRemaining(300) // 5 minutes
    setVerificationStep("success")
  }

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy phone number:", err)
    }
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(smsCode)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy SMS code:", err)
    }
  }

  const handleReportProblem = () => {
    setReportDialogOpen(true)
  }

  const processRefund = async () => {
    if (!selectedService) return

    // Process refund
    const refundAmount = selectedService.price
    const newBalance = btcBalance + refundAmount
    setBtcBalance(newBalance)
    localStorage.setItem(`btcBalance_${userEmail}`, newBalance.toString())

    setRefundProcessed(true)
    setReportDialogOpen(false)

    // Show refund confirmation
    setTimeout(() => {
      alert(`Refund processed successfully! ₿${refundAmount.toFixed(8)} has been added back to your balance.`)
      setIsVerificationDialogOpen(false)
      setRefundProcessed(false)
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a4734] text-white p-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-[#143626] rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <img src="/images/reach-logo.png" alt="Reach" className="h-12 w-34" />
          </div>
          <div className="relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
        </div>

        {/* Side Menu */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-80 h-screen bg-white text-gray-800 shadow-lg z-50">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span>Dashboard</span>
              </Link>

              <Link
                href="/dashboard/deposit"
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2">
                  <CreditCard className="h-5 w-5" />
                </div>
                <span>Deposit</span>
              </Link>

              <Link
                href="/dashboard/gift-cards"
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2">
                  <CreditCard className="h-5 w-5" />
                </div>
                <span>Gift Cards</span>
              </Link>

              <Link
                href="/dashboard/crypto"
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2">
                  <Coins className="h-5 w-5" />
                </div>
                <span>Cryptocurrency</span>
              </Link>

              <Link
                href="/dashboard/transfer"
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <span>Send & Receive</span>
              </Link>

              <Link
                href="/dashboard/verification"
                className="flex items-center space-x-3 p-3 bg-[#1a4734] text-white rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2 bg-white/20 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="font-medium">Number for Verification</span>
              </Link>

              <Link
                href="/dashboard/settings"
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2">
                  <Settings className="h-5 w-5" />
                </div>
                <span>Settings</span>
              </Link>

              <Link
                href="/dashboard/help"
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <span>Help & Support</span>
              </Link>
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 w-full hover:bg-red-50 text-red-600 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SMS Verifications</h1>
              <p className="text-gray-600">Get phone numbers for account verification</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Your Balance</p>
            <p className="text-xl font-bold text-[#1a4734]">₿{btcBalance.toFixed(8)}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for services (e.g., WhatsApp, Telegram, Instagram...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-12 px-4 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !service.available ? "opacity-50" : "hover:border-[#1a4734]"
                }`}
                onClick={() => handleServiceSelect(service)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                          src={`/placeholder-icon.png?height=24&width=24&text=${service.name[0]}`}
                          alt={service.name}
                          className="w-6 h-6"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <p className="text-xs text-gray-500">{service.category}</p>
                      </div>
                    </div>
                    {service.available ? (
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">Unavailable</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{service.country}</p>
                      <p className="text-lg font-bold text-[#1a4734]">₿{service.price.toFixed(8)}</p>
                    </div>
                    <Button
                      size="sm"
                      className={`${
                        service.available
                          ? "bg-[#1a4734] hover:bg-[#143626] text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!service.available}
                    >
                      {service.available ? "Select" : "Unavailable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse all available services.</p>
            </div>
          )}
        </div>

        {/* Verification Dialog */}
        <Dialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {selectedService && (
                  <>
                    <img
                      src={`/placeholder-icon.png?height=24&width=24&text=${selectedService.name[0]}`}
                      alt={selectedService.name}
                      className="w-6 h-6"
                    />
                    <span>{selectedService.name} Verification</span>
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {verificationStep === "select" && "Confirm your verification request"}
                {verificationStep === "processing" && "Processing your request..."}
                {verificationStep === "success" && "Your verification number is ready!"}
                {verificationStep === "failed" && "Verification failed"}
              </DialogDescription>
            </DialogHeader>

            {verificationStep === "select" && selectedService && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Service:</span>
                    <span className="font-medium">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Country:</span>
                    <span className="font-medium">{selectedService.country}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-medium text-[#1a4734]">₿{selectedService.price.toFixed(8)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Your Balance:</span>
                    <span className="font-medium">₿{btcBalance.toFixed(8)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setIsVerificationDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-[#1a4734] hover:bg-[#143626]" onClick={startVerification}>
                    Confirm & Pay
                  </Button>
                </div>
              </div>
            )}

            {verificationStep === "processing" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#1a4734] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600">Getting your verification number...</p>
              </div>
            )}

            {verificationStep === "success" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification Ready!</h3>
                  <p className="text-gray-600 text-sm">
                    Use the details below for your {selectedService?.name} verification
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="font-mono text-lg font-medium">{phoneNumber}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyPhone}
                        className="flex items-center space-x-1 bg-transparent"
                      >
                        <Copy className="w-4 h-4" />
                        <span>{copySuccess ? "Copied!" : "Copy"}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-700">SMS Code Received</p>
                        <p className="font-mono text-xl font-bold text-green-800">{smsCode}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyCode}
                        className="flex items-center space-x-1 border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
                      >
                        <Copy className="w-4 h-4" />
                        <span>{copySuccess ? "Copied!" : "Copy"}</span>
                      </Button>
                    </div>
                  </div>

                  {timeRemaining > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-700">
                          Time remaining: <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                    onClick={handleReportProblem}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Problem
                  </Button>
                  <Button
                    className="flex-1 bg-[#1a4734] hover:bg-[#143626]"
                    onClick={() => setIsVerificationDialogOpen(false)}
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Report Problem Dialog */}
        <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-600">Report Problem</DialogTitle>
              <DialogDescription>
                If you're experiencing issues with the verification, we'll process a refund immediately.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Refund Policy</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      If the verification number doesn't work or you encounter any issues, we'll immediately refund the
                      full amount to your balance.
                    </p>
                  </div>
                </div>
              </div>

              {selectedService && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Refund Amount:</span>
                    <span className="font-medium text-[#1a4734]">₿{selectedService.price.toFixed(8)}</span>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setReportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={processRefund}>
                  Process Refund
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
