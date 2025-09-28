"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  CreditCard,
  ArrowRight,
  Check,
  Smartphone,
  Wallet,
  X,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  Plus,
  Download,
  Mail,
  Copy,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function GiftCardsPage() {
  const [selectedCard, setSelectedCard] = useState<any>(null)
  const [selectedPrice, setSelectedPrice] = useState<any>(null)
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState<"success" | "failed" | "insufficient" | null>(null)
  const [showGiftCardResult, setShowGiftCardResult] = useState(false)
  const [generatedGiftCard, setGeneratedGiftCard] = useState<any>(null)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const [isEmailSending, setIsEmailSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [userBalance, setUserBalance] = useState(2450.0) // User's Reach account balance
  const [userAccountNumber, setUserAccountNumber] = useState("")

  // Mobile Money States
  const [selectedProvider, setSelectedProvider] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")

  // Card Payment States
  const [cardNumber, setCardNumber] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")

  // Generate unique account number for user
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    if (userEmail) {
      // Generate a unique account number based on user email
      const accountNumber = `REACH${Date.now().toString().slice(-8)}`
      setUserAccountNumber(accountNumber)
    }
  }, [])

  const giftCards = [
    {
      id: 1,
      name: "Amazon",
      image: "/images/crypto-trading.jpeg",
      category: "shopping",
      prices: [
        { amount: 25, price: 23.5 },
        { amount: 50, price: 46.0 },
        { amount: 100, price: 91.0 },
      ],
    },
    {
      id: 2,
      name: "Apple iTunes",
      image: "/placeholder.svg?height=60&width=60",
      category: "entertainment",
      prices: [
        { amount: 25, price: 22.75 },
        { amount: 50, price: 45.0 },
        { amount: 100, price: 89.5 },
      ],
    },
    {
      id: 3,
      name: "Google Play",
      image: "/placeholder.svg?height=60&width=60",
      category: "entertainment",
      prices: [
        { amount: 25, price: 23.25 },
        { amount: 50, price: 45.5 },
        { amount: 100, price: 90.0 },
      ],
    },
    {
      id: 4,
      name: "Steam",
      image: "/placeholder.svg?height=60&width=60",
      category: "gaming",
      prices: [
        { amount: 25, price: 22.5 },
        { amount: 50, price: 44.5 },
        { amount: 100, price: 88.0 },
      ],
    },
    {
      id: 5,
      name: "Walmart",
      image: "/placeholder.svg?height=60&width=60",
      category: "shopping",
      prices: [
        { amount: 25, price: 23.75 },
        { amount: 50, price: 46.5 },
        { amount: 100, price: 92.0 },
      ],
    },
    {
      id: 6,
      name: "Target",
      image: "/placeholder.svg?height=60&width=60",
      category: "shopping",
      prices: [
        { amount: 25, price: 23.0 },
        { amount: 50, price: 45.25 },
        { amount: 100, price: 89.75 },
      ],
    },
  ]

  const myGiftCards = [
    { id: 1, name: "Amazon", amount: 500, code: "AMZN-****-****-1234", status: "Active" },
    { id: 2, name: "Apple iTunes", amount: 100, code: "APPL-****-****-5678", status: "Used" },
    { id: 3, name: "Google Play", amount: 250, code: "GOOG-****-****-9012", status: "Active" },
  ]

  const mobileProviders = [
    { id: "mtn", name: "MTN", logo: "/images/mtn-logo.png" },
    { id: "airteltigo", name: "AirtelTigo", logo: "/images/airteltigo-logo.png" },
    { id: "telecel", name: "Telecel", logo: "/images/telecel-logo.png" },
  ]

  const generateGiftCardCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) result += "-"
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const generateGiftCard = () => {
    const code = generateGiftCardCode()
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)

    return {
      id: Date.now(),
      brand: selectedCard.name,
      amount: selectedPrice.amount,
      code: code,
      pin: Math.floor(Math.random() * 9000) + 1000, // 4-digit PIN
      expiryDate: expiryDate.toLocaleDateString(),
      purchaseDate: new Date().toLocaleDateString(),
      purchaseTime: new Date().toLocaleTimeString(),
    }
  }

  const handleBuyCard = (card: any) => {
    setSelectedCard(card)
    setSelectedPrice(null)
    setShowPaymentOptions(false)
    setSelectedPaymentMethod("")
    setShowPaymentForm(false)
    setPaymentResult(null)
    setShowGiftCardResult(false)
    setGeneratedGiftCard(null)
    resetFormStates()
  }

  const handlePriceSelect = (price: any) => {
    setSelectedPrice(price)
    setShowPaymentOptions(true)
  }

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
    setShowPaymentForm(true)
  }

  const resetFormStates = () => {
    setSelectedProvider("")
    setMobileNumber("")
    setCardNumber("")
    setExpiryMonth("")
    setExpiryYear("")
    setCvv("")
  }

  const simulatePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (selectedPaymentMethod === "ewallet") {
      // Check if user has sufficient balance
      if (userBalance >= selectedPrice.price) {
        // Deduct amount from user balance
        setUserBalance((prev) => prev - selectedPrice.price)
        setPaymentResult("success")
        // Generate gift card
        const newGiftCard = generateGiftCard()
        setGeneratedGiftCard(newGiftCard)
      } else {
        setPaymentResult("insufficient")
      }
    } else {
      // For other payment methods, simulate random success/failure
      const isSuccess = Math.random() > 0.3
      if (isSuccess) {
        setPaymentResult("success")
        // Generate gift card
        const newGiftCard = generateGiftCard()
        setGeneratedGiftCard(newGiftCard)
      } else {
        setPaymentResult("failed")
      }
    }

    setIsProcessing(false)
  }

  const handleDoneClick = () => {
    if (paymentResult === "success" && generatedGiftCard) {
      setShowGiftCardResult(true)
    } else {
      handleCloseModal()
    }
  }

  const handleCloseModal = () => {
    setSelectedCard(null)
    setSelectedPrice(null)
    setShowPaymentOptions(false)
    setSelectedPaymentMethod("")
    setShowPaymentForm(false)
    setPaymentResult(null)
    setIsProcessing(false)
    setShowGiftCardResult(false)
    setGeneratedGiftCard(null)
    setShowEmailDialog(false)
    setEmailAddress("")
    setEmailSent(false)
    resetFormStates()
  }

  const handleDownloadGiftCard = () => {
    // Create a canvas to generate the gift card image
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    canvas.width = 600
    canvas.height = 400

    // Background gradient
    const gradient = ctx!.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#1a4734")
    gradient.addColorStop(1, "#2d5a47")
    ctx!.fillStyle = gradient
    ctx!.fillRect(0, 0, canvas.width, canvas.height)

    // Card border
    ctx!.strokeStyle = "#ffffff"
    ctx!.lineWidth = 3
    ctx!.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)

    // Brand name
    ctx!.fillStyle = "#ffffff"
    ctx!.font = "bold 36px Arial"
    ctx!.textAlign = "center"
    ctx!.fillText(generatedGiftCard.brand, canvas.width / 2, 80)

    // Amount
    ctx!.font = "bold 48px Arial"
    ctx!.fillText(`$${generatedGiftCard.amount}`, canvas.width / 2, 140)

    // Gift Card text
    ctx!.font = "24px Arial"
    ctx!.fillText("GIFT CARD", canvas.width / 2, 180)

    // Code
    ctx!.font = "bold 20px monospace"
    ctx!.fillText("Code:", canvas.width / 2, 230)
    ctx!.fillText(generatedGiftCard.code, canvas.width / 2, 260)

    // PIN
    ctx!.fillText("PIN:", canvas.width / 2, 300)
    ctx!.fillText(generatedGiftCard.pin.toString(), canvas.width / 2, 330)

    // Expiry date
    ctx!.font = "16px Arial"
    ctx!.fillText(`Expires: ${generatedGiftCard.expiryDate}`, canvas.width / 2, 370)

    // Download the image
    const link = document.createElement("a")
    link.download = `${generatedGiftCard.brand}_GiftCard_$${generatedGiftCard.amount}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const handleSendToEmail = async () => {
    if (!emailAddress) return

    setIsEmailSending(true)

    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsEmailSending(false)
    setEmailSent(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setShowEmailDialog(false)
      setEmailAddress("")
      setEmailSent(false)
    }, 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const isFormValid = () => {
    if (selectedPaymentMethod === "mobile") {
      return selectedProvider && mobileNumber.length >= 10
    } else if (selectedPaymentMethod === "ewallet") {
      return true // E-wallet just needs account verification
    } else if (selectedPaymentMethod === "card") {
      return cardNumber.length >= 16 && expiryMonth && expiryYear && cvv.length >= 3
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a4734] text-white p-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Gift Cards</h1>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="buy">Buy Cards</TabsTrigger>
            <TabsTrigger value="trade">Trade Cards</TabsTrigger>
            <TabsTrigger value="my-cards">My Cards</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-6">
            {/* Gift Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {giftCards.map((card) => (
                <Card key={card.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={card.image || "/placeholder.svg"}
                        alt={card.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{card.name}</h3>
                        <p className="text-sm text-gray-600">Gift Card</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-[#1a4734] hover:bg-[#143626]" onClick={() => handleBuyCard(card)}>
                        Buy Card
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trade" className="space-y-6">
            {/* Trade Form */}
            <Card>
              <CardHeader>
                <CardTitle>Trade Gift Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-type">Card Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazon">Amazon</SelectItem>
                        <SelectItem value="apple">Apple iTunes</SelectItem>
                        <SelectItem value="google">Google Play</SelectItem>
                        <SelectItem value="steam">Steam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Card Amount ($)</Label>
                    <Input id="amount" type="number" placeholder="Enter amount" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-code">Card Code/PIN</Label>
                  <Input id="card-code" placeholder="Enter card code or PIN" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-image">Upload Card Image</Label>
                  <Input id="card-image" type="file" accept="image/*" />
                </div>

                <Button className="w-full bg-[#1a4734] hover:bg-[#143626]">Submit for Trading</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-cards" className="space-y-6">
            {/* My Gift Cards */}
            <div className="space-y-4">
              {myGiftCards.map((card) => (
                <Card key={card.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#1a4734]/10 rounded-lg">
                          <CreditCard className="h-6 w-6 text-[#1a4734]" />
                        </div>
                        <div>
                          <h3 className="font-medium">{card.name}</h3>
                          <p className="text-sm text-gray-600">{card.code}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${card.amount}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            card.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {card.status}
                        </span>
                      </div>
                    </div>
                    {card.status === "Active" && (
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" className="bg-[#1a4734] hover:bg-[#143626]">
                          Redeem
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Buy Card Modal */}
        {selectedCard && !showGiftCardResult && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-URkEmNWPGJrhdSbm1ej4MzV4VrN6MF.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-URkEmNWPGJrhdSbm1ej4MzV4VrN6MF.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Buy {selectedCard.name} Gift Card</h2>
                  <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Payment Result */}
                {paymentResult && (
                  <div className="mb-6">
                    {paymentResult === "success" ? (
                      <div className="text-center p-6 bg-green-50 rounded-lg">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-green-800 mb-2">Payment Successful!</h3>
                        <p className="text-green-700 mb-2">
                          Your {selectedCard.name} ${selectedPrice.amount} gift card has been purchased successfully.
                        </p>
                        {selectedPaymentMethod === "ewallet" && (
                          <p className="text-sm text-green-600">New Reach Account Balance: ${userBalance.toFixed(2)}</p>
                        )}
                        <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={handleDoneClick}>
                          Done
                        </Button>
                      </div>
                    ) : paymentResult === "insufficient" ? (
                      <div className="text-center p-6 bg-orange-50 rounded-lg">
                        <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-orange-800 mb-2">Insufficient Funds</h3>
                        <p className="text-orange-700 mb-2">
                          Your Reach account balance (${userBalance.toFixed(2)}) is insufficient for this purchase ($
                          {selectedPrice.price}).
                        </p>
                        <div className="flex flex-col space-y-2 mt-4">
                          <Link href="/dashboard/deposit">
                            <Button className="w-full bg-[#1a4734] hover:bg-[#143626]">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Funds to Account
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setPaymentResult(null)
                              setShowPaymentForm(false)
                              setShowPaymentOptions(true)
                              setSelectedPaymentMethod("")
                            }}
                          >
                            Choose Different Payment Method
                          </Button>
                          <Button variant="ghost" onClick={handleCloseModal}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-red-50 rounded-lg">
                        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-red-800 mb-2">Payment Failed</h3>
                        <p className="text-red-700">
                          Your payment could not be processed. Please try again or use a different payment method.
                        </p>
                        <div className="flex space-x-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setPaymentResult(null)
                              setShowPaymentForm(true)
                            }}
                          >
                            Try Again
                          </Button>
                          <Button className="bg-red-600 hover:bg-red-700" onClick={handleCloseModal}>
                            Close
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Processing State */}
                {isProcessing && (
                  <div className="text-center p-6">
                    <Loader2 className="h-16 w-16 text-[#1a4734] mx-auto mb-4 animate-spin" />
                    <h3 className="text-lg font-bold mb-2">Processing Payment...</h3>
                    <p className="text-gray-600">Please wait while we process your payment.</p>
                  </div>
                )}

                {/* Price Selection */}
                {!showPaymentOptions && !showPaymentForm && !paymentResult && !isProcessing && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Select Card Amount</h3>
                    <div className="space-y-3">
                      {selectedCard.prices.map((priceOption: any, index: number) => (
                        <div
                          key={index}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors hover:border-[#1a4734] ${
                            selectedPrice?.amount === priceOption.amount
                              ? "border-[#1a4734] bg-[#1a4734]/5"
                              : "border-gray-200"
                          }`}
                          onClick={() => handlePriceSelect(priceOption)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">${priceOption.amount} Gift Card</p>
                              <p className="text-sm text-gray-600">Pay ${priceOption.price}</p>
                            </div>
                            <div className="flex items-center">
                              {selectedPrice?.amount === priceOption.amount && (
                                <Check className="h-5 w-5 text-[#1a4734]" />
                              )}
                              <ArrowRight className="h-4 w-4 text-gray-400 ml-2" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Method Selection */}
                {showPaymentOptions && !showPaymentForm && !paymentResult && !isProcessing && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium">Order Summary</h3>
                      <p className="text-sm text-gray-600">
                        {selectedCard.name} ${selectedPrice.amount} Gift Card
                      </p>
                      <p className="font-bold">Total: ${selectedPrice.price}</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-900">Select Payment Method</h3>

                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors hover:border-[#1a4734] ${
                          selectedPaymentMethod === "ewallet" ? "border-[#1a4734] bg-[#1a4734]/5" : "border-gray-200"
                        }`}
                        onClick={() => handlePaymentMethodSelect("ewallet")}
                      >
                        <div className="flex items-center space-x-3">
                          <Wallet className="h-6 w-6 text-[#1a4734]" />
                          <div className="flex-1">
                            <p className="font-medium">Reach E-Wallet</p>
                            <p className="text-sm text-gray-600">Pay with your Reach account balance</p>
                            <p className="text-xs text-[#1a4734] font-medium">Balance: ${userBalance.toFixed(2)}</p>
                          </div>
                          {selectedPaymentMethod === "ewallet" && <Check className="h-5 w-5 text-[#1a4734]" />}
                        </div>
                      </div>

                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors hover:border-[#1a4734] ${
                          selectedPaymentMethod === "mobile" ? "border-[#1a4734] bg-[#1a4734]/5" : "border-gray-200"
                        }`}
                        onClick={() => handlePaymentMethodSelect("mobile")}
                      >
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-6 w-6 text-[#1a4734]" />
                          <div>
                            <p className="font-medium">Mobile Money</p>
                            <p className="text-sm text-gray-600">Pay with mobile wallet</p>
                          </div>
                          {selectedPaymentMethod === "mobile" && <Check className="h-5 w-5 text-[#1a4734] ml-auto" />}
                        </div>
                      </div>

                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors hover:border-[#1a4734] ${
                          selectedPaymentMethod === "card" ? "border-[#1a4734] bg-[#1a4734]/5" : "border-gray-200"
                        }`}
                        onClick={() => handlePaymentMethodSelect("card")}
                      >
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-[#1a4734]" />
                          <div>
                            <p className="font-medium">Card Payment</p>
                            <p className="text-sm text-gray-600">Pay with debit/credit card</p>
                          </div>
                          {selectedPaymentMethod === "card" && <Check className="h-5 w-5 text-[#1a4734] ml-auto" />}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setShowPaymentOptions(false)}
                    >
                      Back to Amount Selection
                    </Button>
                  </div>
                )}

                {/* Payment Forms */}
                {showPaymentForm && !paymentResult && !isProcessing && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium">Order Summary</h3>
                      <p className="text-sm text-gray-600">
                        {selectedCard.name} ${selectedPrice.amount} Gift Card
                      </p>
                      <p className="font-bold">Total: ${selectedPrice.price}</p>
                    </div>

                    {/* E-Wallet Form */}
                    {selectedPaymentMethod === "ewallet" && (
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">Reach E-Wallet Payment</h3>

                        <div className="p-4 bg-[#1a4734]/5 rounded-lg">
                          <div className="flex items-center space-x-3 mb-3">
                            <Wallet className="h-6 w-6 text-[#1a4734]" />
                            <div>
                              <p className="font-medium text-[#1a4734]">Your Reach Account</p>
                              <p className="text-sm text-gray-600">Account Number: {userAccountNumber}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Current Balance:</p>
                              <p className="font-bold text-lg">${userBalance.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">After Purchase:</p>
                              <p
                                className={`font-bold text-lg ${
                                  userBalance >= selectedPrice.price ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                ${(userBalance - selectedPrice.price).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {userBalance < selectedPrice.price && (
                          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="h-5 w-5 text-orange-500" />
                              <p className="text-sm text-orange-700">
                                Insufficient balance. You need ${(selectedPrice.price - userBalance).toFixed(2)} more.
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="ewallet-amount">Purchase Amount</Label>
                          <Input
                            id="ewallet-amount"
                            type="number"
                            value={selectedPrice.price}
                            readOnly
                            className="bg-gray-50"
                          />
                        </div>
                      </div>
                    )}

                    {/* Mobile Money Form */}
                    {selectedPaymentMethod === "mobile" && (
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">Mobile Money Payment</h3>

                        <div className="space-y-2">
                          <Label>Select Provider</Label>
                          <div className="grid grid-cols-1 gap-3">
                            {mobileProviders.map((provider) => (
                              <div
                                key={provider.id}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors hover:border-[#1a4734] ${
                                  selectedProvider === provider.id
                                    ? "border-[#1a4734] bg-[#1a4734]/5"
                                    : "border-gray-200"
                                }`}
                                onClick={() => setSelectedProvider(provider.id)}
                              >
                                <div className="flex items-center space-x-3">
                                  <Image
                                    src={provider.logo || "/placeholder.svg"}
                                    alt={provider.name}
                                    width={40}
                                    height={40}
                                    className="rounded"
                                  />
                                  <span className="font-medium">{provider.name}</span>
                                  {selectedProvider === provider.id && (
                                    <Check className="h-5 w-5 text-[#1a4734] ml-auto" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mobile-number">Mobile Number</Label>
                          <Input
                            id="mobile-number"
                            type="tel"
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mobile-amount">Amount</Label>
                          <Input
                            id="mobile-amount"
                            type="number"
                            value={selectedPrice.price}
                            readOnly
                            className="bg-gray-50"
                          />
                        </div>
                      </div>
                    )}

                    {/* Card Payment Form */}
                    {selectedPaymentMethod === "card" && (
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">Card Payment</h3>

                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <div className="relative">
                            <Input
                              id="card-number"
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber.replace(/(.{4})/g, "$1 ").trim()}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "")
                                setCardNumber(value)
                              }}
                              maxLength={19} // 16 digits + 3 spaces
                              className="border-gray-300 focus:border-[#1a4734] focus:ring-1 focus:ring-[#1a4734]"
                            />
                            {cardNumber && cardNumber.length >= 16 && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Check className="h-4 w-4 text-green-500" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">Enter your 16-digit card number</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry-month">Expiry Month</Label>
                            <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                              <SelectTrigger className="bg-white border-gray-300 shadow-sm hover:border-gray-400 focus:border-[#1a4734] focus:ring-1 focus:ring-[#1a4734] focus:ring-offset-0">
                                <input
                                  type="text"
                                  placeholder="MM or Select Month"
                                  value={expiryMonth}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "").slice(0, 2)
                                    if (value === "" || (Number.parseInt(value) >= 1 && Number.parseInt(value) <= 12)) {
                                      setExpiryMonth(
                                        value.length === 1 && Number.parseInt(value) > 1
                                          ? value.padStart(2, "0")
                                          : value,
                                      )
                                    }
                                  }}
                                  onFocus={(e) => e.target.select()}
                                  className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
                                  maxLength={2}
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-300 shadow-xl rounded-md z-[100] max-h-60 overflow-auto">
                                {Array.from({ length: 12 }, (_, i) => {
                                  const monthNum = String(i + 1).padStart(2, "0")
                                  const monthName = new Date(2024, i, 1).toLocaleString("default", { month: "long" })
                                  return (
                                    <SelectItem
                                      key={i + 1}
                                      value={monthNum}
                                      className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer px-3 py-2 text-gray-900 bg-white"
                                    >
                                      {monthNum} - {monthName}
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                            {expiryMonth && (
                              <div className="flex items-center text-xs text-green-600">
                                <Check className="h-3 w-3 mr-1" />
                                {new Date(2024, Number.parseInt(expiryMonth) - 1, 1).toLocaleString("default", {
                                  month: "long",
                                })}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="expiry-year">Expiry Year</Label>
                            <Select value={expiryYear} onValueChange={setExpiryYear}>
                              <SelectTrigger className="bg-white border-gray-300 shadow-sm hover:border-gray-400 focus:border-[#1a4734] focus:ring-1 focus:ring-[#1a4734] focus:ring-offset-0">
                                <input
                                  type="text"
                                  placeholder="YY or Select Year"
                                  value={expiryYear}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "").slice(0, 2)
                                    const currentYear = new Date().getFullYear()
                                    const fullYear = Number.parseInt(`20${value}`)
                                    if (value === "" || (fullYear >= currentYear && fullYear <= currentYear + 20)) {
                                      setExpiryYear(value)
                                    }
                                  }}
                                  onFocus={(e) => e.target.select()}
                                  className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
                                  maxLength={2}
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-300 shadow-xl rounded-md z-[100] max-h-60 overflow-auto">
                                {Array.from({ length: 15 }, (_, i) => {
                                  const year = new Date().getFullYear() + i
                                  const yearShort = String(year).slice(-2)
                                  return (
                                    <SelectItem
                                      key={i}
                                      value={yearShort}
                                      className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer px-3 py-2 text-gray-900 bg-white"
                                    >
                                      {yearShort} - {year}
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                            {expiryYear && (
                              <div className="flex items-center text-xs text-green-600">
                                <Check className="h-3 w-3 mr-1" />
                                20{expiryYear}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* CVV Field */}
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV/CVC</Label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              type="text"
                              placeholder="Enter 3 or 4 digit code"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                              maxLength={4}
                              className="border-gray-300 focus:border-[#1a4734] focus:ring-1 focus:ring-[#1a4734]"
                            />
                            {cvv && cvv.length >= 3 && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Check className="h-4 w-4 text-green-500" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">3-digit code on back of card (4 digits for Amex)</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="card-amount">Amount</Label>
                          <Input
                            id="card-amount"
                            type="number"
                            value={selectedPrice.price}
                            readOnly
                            className="bg-gray-50"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-3 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setShowPaymentForm(false)}
                      >
                        Back
                      </Button>
                      <Button
                        className="flex-1 bg-[#1a4734] hover:bg-[#143626]"
                        onClick={simulatePayment}
                        disabled={
                          !isFormValid() || (selectedPaymentMethod === "ewallet" && userBalance < selectedPrice.price)
                        }
                      >
                        Pay ${selectedPrice.price}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gift Card Result Modal */}
        {showGiftCardResult && generatedGiftCard && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
            <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#1a4734]">Your Gift Card</h2>
                  <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Gift Card Display */}
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-[#1a4734] to-[#2d5a47] rounded-xl p-6 text-white relative overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      <div className="w-full h-full bg-white rounded-full transform translate-x-8 -translate-y-8"></div>
                    </div>

                    <div className="relative z-10">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">{generatedGiftCard.brand}</h3>
                        <div className="text-3xl font-bold mb-4">${generatedGiftCard.amount}</div>
                        <p className="text-sm opacity-90 mb-6">GIFT CARD</p>

                        <div className="space-y-3">
                          <div className="bg-white/10 rounded-lg p-3">
                            <p className="text-xs opacity-75 mb-1">Code</p>
                            <div className="flex items-center justify-between">
                              <p className="font-mono text-sm">{generatedGiftCard.code}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:bg-white/20 h-6 w-6 p-0"
                                onClick={() => copyToClipboard(generatedGiftCard.code)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="bg-white/10 rounded-lg p-3">
                            <p className="text-xs opacity-75 mb-1">PIN</p>
                            <div className="flex items-center justify-between">
                              <p className="font-mono text-sm">{generatedGiftCard.pin}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:bg-white/20 h-6 w-6 p-0"
                                onClick={() => copyToClipboard(generatedGiftCard.pin.toString())}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-xs opacity-75">
                          <p>
                            Purchased: {generatedGiftCard.purchaseDate} at {generatedGiftCard.purchaseTime}
                          </p>
                          <p>Expires: {generatedGiftCard.expiryDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-[#1a4734] hover:bg-[#143626] text-white"
                    onClick={handleDownloadGiftCard}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    DOWNLOAD
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-[#1a4734] text-[#1a4734] hover:bg-[#1a4734] hover:text-white bg-transparent"
                    onClick={() => setShowEmailDialog(true)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    SEND TO EMAIL
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full text-gray-600 hover:text-gray-800"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Dialog */}
        <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send Gift Card to Email</DialogTitle>
            </DialogHeader>

            {!emailSent ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </div>

                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <p className="font-medium mb-1">Gift Card Details:</p>
                  <p>
                    {generatedGiftCard?.brand} ${generatedGiftCard?.amount} Gift Card
                  </p>
                  <p>Code: {generatedGiftCard?.code}</p>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowEmailDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-[#1a4734] hover:bg-[#143626]"
                    onClick={handleSendToEmail}
                    disabled={!emailAddress || isEmailSending}
                  >
                    {isEmailSending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Email Sent Successfully!</h3>
                <p className="text-green-700">Your gift card has been sent to {emailAddress}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
