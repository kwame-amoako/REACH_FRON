"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Coins,
  TrendingUp,
  Bell,
  Menu,
  X,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react"
import Link from "next/link"

// Add this import
import { Wallet, QrCode, CheckCircle } from "lucide-react"
import { Send, MessageSquare, Clock, CheckCircle2, Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [userCryptoAddress, setUserCryptoAddress] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [copySuccess, setCopySuccess] = useState(false)
  // Add this state variable with the other useState declarations
  const [showCryptoAddress, setShowCryptoAddress] = useState(false)
  const router = useRouter()

  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [messageToSupport, setMessageToSupport] = useState({
    message: "",
  })
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false)
  const [userMessages, setUserMessages] = useState<any[]>([])

  // BTC balance and USD equivalent
  const btcBalance = 0.05421
  const btcToUsdRate = 45250.0
  const usdEquivalent = btcBalance * btcToUsdRate

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const email = localStorage.getItem("userEmail")

    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    if (email) {
      setUserEmail(email)
      // Get user name from registered users
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const user = registeredUsers.find((u: any) => u.email === email)
      if (user) {
        setUserName(`${user.firstName} ${user.lastName}`)
      }

      // Generate or retrieve crypto address for user
      let cryptoAddress = localStorage.getItem(`cryptoAddress_${email}`)
      if (!cryptoAddress) {
        // Generate a Bitcoin-like address for the user
        cryptoAddress = generateCryptoAddress(email)
        localStorage.setItem(`cryptoAddress_${email}`, cryptoAddress)
      }
      setUserCryptoAddress(cryptoAddress)

      // Load user messages
      const messages = JSON.parse(localStorage.getItem("userMessagesToAdmin") || "[]")
      const userSpecificMessages = messages.filter((msg: any) => msg.userEmail === email)
      setUserMessages(userSpecificMessages)
    }
  }, [router])

  const generateCryptoAddress = (email: string) => {
    // Generate a Bitcoin-like address based on user email
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    const emailHash = email.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)

    let address = "bc1q"
    const seed = Math.abs(emailHash)

    for (let i = 0; i < 39; i++) {
      const index = (seed + i * 7) % chars.length
      address += chars[index]
    }

    return address.toLowerCase()
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  // Update the handleCopyAddress function to work with the new UI
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(userCryptoAddress)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 3000)
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }

  const handleQuickMessage = (quickMessage: string) => {
    setMessageToSupport({ message: quickMessage })
  }

  const handleSendMessageToSupport = async () => {
    if (!messageToSupport.message.trim()) {
      alert("Please enter your message!")
      return
    }

    setIsSubmittingMessage(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create message object
    const newMessage = {
      id: Date.now(),
      userId: userEmail,
      userName: userName || "User",
      userEmail: userEmail,
      subject: "Support Request",
      message: messageToSupport.message,
      priority: "medium",
      timestamp: new Date().toLocaleString(),
      status: "sent",
      response: null,
      responseTime: null,
    }

    // Store in localStorage (in real app, this would be sent to backend)
    const existingMessages = JSON.parse(localStorage.getItem("userMessagesToAdmin") || "[]")
    existingMessages.push(newMessage)
    localStorage.setItem("userMessagesToAdmin", JSON.stringify(existingMessages))

    // Update local state
    const userSpecificMessages = existingMessages.filter((msg: any) => msg.userEmail === userEmail)
    setUserMessages(userSpecificMessages)

    // Reset form
    setMessageToSupport({ message: "" })
    setIsSubmittingMessage(false)

    alert("Your message has been sent to our support team successfully! You will receive a response soon.")
  }

  const quickMessageOptions = [
    "I'm having trouble with my account login",
    "I need help with a transaction",
    "My deposit is not showing up",
    "I can't access my crypto wallet",
    "I need help with gift card redemption",
    "I have a question about fees",
    "I want to report a technical issue",
    "I need help with account verification",
  ]

  const recentTransactions = [
    {
      id: 1,
      type: "gift-card",
      title: "Amazon Gift Card",
      amount: -0.00442,
      status: "Completed",
      time: "Today, 2:30 PM",
      icon: CreditCard,
    },
    {
      id: 2,
      type: "crypto",
      title: "BTC Purchase",
      amount: -0.01105,
      status: "Completed",
      time: "Yesterday, 4:15 PM",
      icon: Coins,
    },
    {
      id: 3,
      type: "transfer",
      title: "Money Received",
      amount: 0.02652,
      status: "Completed",
      time: "2 days ago",
      icon: ArrowDownLeft,
    },
    {
      id: 4,
      type: "deposit",
      title: "Account Deposit",
      amount: 0.01105,
      status: "Completed",
      time: "3 days ago",
      icon: Plus,
    },
  ]

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
                className="flex items-center space-x-3 p-3 bg-[#1a4734] text-white rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="font-medium">Dashboard</span>
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
        {/* Dashboard Title and Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        </div>

        {/* Total Balance Card */}
        <Card className="bg-[#1a4734] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium opacity-90">Welcome back</h3>
                <p className="text-xl font-bold">{userName || "User"}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>

                {/* Crypto Address Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowCryptoAddress(!showCryptoAddress)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30"
                    title={showCryptoAddress ? "Hide Address" : "View Address"}
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="text-sm font-medium">{showCryptoAddress ? "Hide" : "Address"}</span>
                  </button>

                  {/* Address Dropdown */}
                  {showCryptoAddress && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 z-50">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">Your Crypto Address</h4>
                          <button onClick={() => setShowCryptoAddress(false)} className="p-1 hover:bg-gray-100 rounded">
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <p className="text-xs text-gray-600 mb-2">Bitcoin Address</p>
                          <p className="font-mono text-sm break-all text-gray-800 leading-relaxed">
                            {userCryptoAddress}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={handleCopyAddress}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-[#1a4734] hover:bg-[#143626] text-white rounded-lg transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                            <span className="text-sm font-medium">{copySuccess ? "Copied!" : "Copy Address"}</span>
                          </button>

                          <button
                            onClick={() => {
                              /* QR Code functionality can be added here */
                            }}
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                            title="Show QR Code"
                          >
                            <QrCode className="h-4 w-4" />
                          </button>
                        </div>

                        {copySuccess && (
                          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-xs text-green-700 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Address copied to clipboard successfully!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Deposit Button */}
                <div className="relative">
                  <Link href="/dashboard/deposit">
                    <button className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30">
                      <Plus className="h-4 w-4" />
                      <span className="text-sm font-medium">Deposit</span>
                    </button>
                  </Link>
                </div>

                <Coins className="h-5 w-5 opacity-75" />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm opacity-75 mb-1">Total Balance (BTC)</p>
                <p className="text-3xl font-bold">{showBalance ? `₿${btcBalance.toFixed(5)}` : "••••••"}</p>
              </div>

              {/* USD Equivalent */}
              <div className="pt-2 border-t border-white/20">
                <div>
                  <p className="text-xs opacity-75 mb-1">USD Equivalent</p>
                  <p className="text-lg font-semibold">{showBalance ? `$${usdEquivalent.toFixed(2)}` : "••••••"}</p>
                </div>
              </div>

              <p className="text-sm opacity-75 flex items-center pt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2.5% changes from last week
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/gift-cards">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-[#1a4734]" />
                <h3 className="font-medium text-sm">Gift Cards</h3>
                <p className="text-xs text-gray-600 mt-1">Trade & Redeem</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/crypto">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Coins className="h-8 w-8 mx-auto mb-2 text-[#1a4734]" />
                <h3 className="font-medium text-sm">Crypto</h3>
                <p className="text-xs text-gray-600 mt-1">Buy & Sell</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/transfer">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <ArrowUpRight className="h-8 w-8 mx-auto mb-2 text-[#1a4734]" />
                <h3 className="font-medium text-sm">Transfer or Withdrawal</h3>
                <p className="text-xs text-gray-600 mt-1">Send & Withdraw</p>
              </CardContent>
            </Card>
          </Link>

          {/* Number for Verification Button */}
          <Link href="/dashboard/verification">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Phone className="h-8 w-8 mx-auto mb-2 text-[#1a4734]" />
                <h3 className="font-medium text-sm">Number for Verification</h3>
                <p className="text-xs text-gray-600 mt-1">SMS & Voice</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Gift Cards Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Gift Cards</h3>
              <CreditCard className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">₿0.07162</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +4.3% from last week
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link href="/dashboard/transactions">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction) => {
              const Icon = transaction.icon
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        transaction.type === "gift-card"
                          ? "bg-blue-100"
                          : transaction.type === "crypto"
                            ? "bg-purple-100"
                            : transaction.type === "transfer"
                              ? "bg-green-100"
                              : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          transaction.type === "gift-card"
                            ? "text-blue-600"
                            : transaction.type === "crypto"
                              ? "text-purple-600"
                              : transaction.type === "transfer"
                                ? "text-green-600"
                                : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.title}</p>
                      <p className="text-sm text-gray-600">{transaction.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-gray-900"}`}>
                      {transaction.amount > 0 ? "+" : ""}₿{Math.abs(transaction.amount).toFixed(5)}
                    </p>
                    <p className="text-sm text-green-600">{transaction.status}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Floating Message to Support Button */}
        <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
          <DialogTrigger asChild>
            <button className="fixed bottom-6 right-6 bg-[#1a4734] hover:bg-[#143626] text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50">
              <MessageSquare className="h-6 w-6" />
              <span className="sr-only">Contact support</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white border border-gray-200 text-gray-900 max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">Contact Support</DialogTitle>
              <DialogDescription className="text-gray-600">
                Send a message to our support team or view your previous conversations.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="new-message" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new-message">New Message</TabsTrigger>
                <TabsTrigger value="my-messages">My Messages ({userMessages.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="new-message" className="space-y-4">
                {/* Quick Message Options */}
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">Quick Options</Label>
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    {quickMessageOptions.slice(0, 4).map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickMessage(option)}
                        className="text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                        disabled={isSubmittingMessage}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <details className="mb-4">
                    <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                      Show more options...
                    </summary>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {quickMessageOptions.slice(4).map((option, index) => (
                        <button
                          key={index + 4}
                          onClick={() => handleQuickMessage(option)}
                          className="text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                          disabled={isSubmittingMessage}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </details>
                </div>

                <div>
                  <Label htmlFor="messageContent" className="text-gray-700 font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="messageContent"
                    value={messageToSupport.message}
                    onChange={(e) => setMessageToSupport({ ...messageToSupport, message: e.target.value })}
                    className="mt-1 border-gray-300 focus:border-[#1a4734] focus:ring-[#1a4734] min-h-32"
                    placeholder="Please describe your issue or question in detail..."
                    rows={6}
                    disabled={isSubmittingMessage}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <strong>Response Time:</strong> We typically respond within 24 hours. Our support team is here
                        to help!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsMessageDialogOpen(false)}
                    disabled={isSubmittingMessage}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendMessageToSupport}
                    disabled={isSubmittingMessage || !messageToSupport.message.trim()}
                    className="bg-[#1a4734] hover:bg-[#143626] text-white"
                  >
                    {isSubmittingMessage ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="my-messages" className="space-y-4">
                {userMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No messages yet</p>
                    <p className="text-sm text-gray-500">Your support conversations will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {userMessages
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((message) => (
                        <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  message.response ? "bg-green-500" : "bg-yellow-500"
                                }`}
                              ></div>
                              <span className="text-sm font-medium text-gray-900">
                                {message.response ? "Resolved" : "Pending"}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm text-gray-800 mb-2">
                              <strong>Your message:</strong>
                            </p>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{message.message}</p>
                          </div>

                          {message.response && (
                            <div className="border-t border-gray-100 pt-3">
                              <p className="text-sm text-gray-800 mb-2 flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
                                <strong>Support Response:</strong>
                              </p>
                              <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200">
                                {message.response}
                              </p>
                              {message.responseTime && (
                                <p className="text-xs text-gray-500 mt-2">Responded on: {message.responseTime}</p>
                              )}
                            </div>
                          )}

                          {!message.response && (
                            <div className="border-t border-gray-100 pt-3">
                              <p className="text-sm text-gray-600 flex items-center">
                                <Clock className="h-4 w-4 text-yellow-600 mr-1" />
                                Waiting for support response...
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
