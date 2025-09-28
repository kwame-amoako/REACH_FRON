"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Coins,
  QrCode,
  Copy,
  X,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DepositPage() {
  const [depositAmount, setDepositAmount] = useState("")
  const [showCryptoModal, setShowCryptoModal] = useState(false)
  const [showMobileModal, setShowMobileModal] = useState(false)
  const [showCardModal, setShowCardModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState<"success" | "failed" | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [qrCodeData, setQrCodeData] = useState("")
  const [validationError, setValidationError] = useState("")

  // Card form states
  const [cardNumber, setCardNumber] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")

  // User's crypto address
  const userCryptoAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

  const mobileProviders = [
    { id: "mtn", name: "MTN", logo: "/images/mtn-logo.png", color: "bg-yellow-500" },
    { id: "airteltigo", name: "AirtelTigo", logo: "/images/airteltigo-logo.png", color: "bg-red-500" },
    { id: "telecel", name: "Telecel", logo: "/images/telecel-logo.png", color: "bg-blue-500" },
  ]

  // Generate QR code data when crypto modal opens
  useEffect(() => {
    if (showCryptoModal && depositAmount) {
      // Simulate QR code data generation (in real app, use a QR library)
      const qrData = `bitcoin:${userCryptoAddress}?amount=${(Number.parseFloat(depositAmount) / 45250).toFixed(8)}&label=REACH Deposit`
      setQrCodeData(qrData)
    }
  }, [showCryptoModal, depositAmount, userCryptoAddress])

  const validateAmount = (amount: string) => {
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount < 50) {
      setValidationError("Minimum deposit amount is $50")
      return false
    }
    setValidationError("")
    return true
  }

  const handleAmountChange = (value: string) => {
    setDepositAmount(value)
    if (value) {
      validateAmount(value)
    } else {
      setValidationError("")
    }
  }

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(userCryptoAddress)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 3000)
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }

  const simulatePayment = async (method: string) => {
    if (!validateAmount(depositAmount)) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing with different timing for different methods
    const processingTime = method === "crypto" ? 5000 : method === "mobile" ? 3000 : 4000
    await new Promise((resolve) => setTimeout(resolve, processingTime))

    // Higher success rate for different methods
    const successRates = {
      crypto: 0.95,
      mobile: 0.85,
      card: 0.9,
    }

    const isSuccess = Math.random() < (successRates[method as keyof typeof successRates] || 0.8)
    setPaymentResult(isSuccess ? "success" : "failed")
    setIsProcessing(false)
  }

  const resetStates = () => {
    setShowCryptoModal(false)
    setShowMobileModal(false)
    setShowCardModal(false)
    setSelectedProvider("")
    setMobileNumber("")
    setCardNumber("")
    setExpiryMonth("")
    setExpiryYear("")
    setCvv("")
    setCardholderName("")
    setPaymentResult(null)
    setIsProcessing(false)
    setCopySuccess(false)
    setValidationError("")
    setDepositAmount("")
  }

  const openModal = (modalType: string) => {
    if (!validateAmount(depositAmount)) {
      return
    }

    switch (modalType) {
      case "crypto":
        setShowCryptoModal(true)
        break
      case "mobile":
        setShowMobileModal(true)
        break
      case "card":
        setShowCardModal(true)
        break
    }
  }

  // Generate QR Code SVG (simplified version)
  const generateQRCodeSVG = (data: string) => {
    // This is a simplified QR code representation
    // In a real app, use a proper QR code library like 'qrcode' or 'react-qr-code'
    const size = 200
    const modules = 25
    const moduleSize = size / modules

    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`

    // Generate a pattern based on the data (simplified)
    for (let i = 0; i < modules; i++) {
      for (let j = 0; j < modules; j++) {
        const shouldFill = (i + j + data.length) % 3 === 0
        if (shouldFill) {
          svg += `<rect x="${i * moduleSize}" y="${j * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="black"/>`
        }
      }
    }

    svg += "</svg>"
    return svg
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
          <h1 className="text-xl font-bold">Deposit Funds</h1>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Deposit Amount */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Deposit Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount (minimum $50)"
                value={depositAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className={`text-lg h-12 ${validationError ? "border-red-500" : ""}`}
                min="50"
              />
              {validationError && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{validationError}</span>
                </div>
              )}
            </div>

            {/* Minimum deposit notice */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Minimum deposit amount is $50 USD
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Special Payment Method Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Crypto Button */}
              <button
                onClick={() => openModal("crypto")}
                disabled={!depositAmount || Number.parseFloat(depositAmount) < 50}
                className="group relative overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Coins className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Cryptocurrency</h3>
                    <p className="text-sm opacity-90">Deposit with Bitcoin</p>
                  </div>
                </div>
              </button>

              {/* Mobile Money Button */}
              <button
                onClick={() => openModal("mobile")}
                disabled={!depositAmount || Number.parseFloat(depositAmount) < 50}
                className="group relative overflow-hidden bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Smartphone className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Mobile Money</h3>
                    <p className="text-sm opacity-90">MTN, Telecel, AirtelTigo</p>
                  </div>
                </div>
              </button>

              {/* Card Button */}
              <button
                onClick={() => openModal("card")}
                disabled={!depositAmount || Number.parseFloat(depositAmount) < 50}
                className="group relative overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    <CreditCard className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Card Payment</h3>
                    <p className="text-sm opacity-90">Visa, Mastercard</p>
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Crypto Modal */}
        {showCryptoModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-1zZicLhXKbRTC8FZRvM6u0Wke2dlzg.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute inset-0 bg-opacity-60"
              style={{
                backgroundImage:
                  "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-1zZicLhXKbRTC8FZRvM6u0Wke2dlzg.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative z-10">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Deposit Cryptocurrency</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowCryptoModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Amount Display */}
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-orange-700">Deposit Amount</p>
                        <p className="text-2xl font-bold text-orange-900">${depositAmount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-orange-700">Bitcoin Amount</p>
                        <p className="text-lg font-semibold text-orange-900">
                          ≈ ₿{(Number.parseFloat(depositAmount) / 45250).toFixed(8)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-4 p-4">
                      {qrCodeData ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: generateQRCodeSVG(qrCodeData),
                          }}
                        />
                      ) : (
                        <QrCode className="h-32 w-32 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Scan QR code to deposit Bitcoin</p>
                    <p className="text-xs text-gray-500">Or copy the address below</p>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label>Your Bitcoin Address</Label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="font-mono text-sm break-all text-gray-800 mb-3">{userCryptoAddress}</p>
                      <Button
                        onClick={handleCopyAddress}
                        className="w-full bg-[#1a4734] hover:bg-[#143626]"
                        variant={copySuccess ? "outline" : "default"}
                      >
                        {copySuccess ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Address
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Instructions:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>
                        • Send exactly ₿{(Number.parseFloat(depositAmount) / 45250).toFixed(8)} to the address above
                      </li>
                      <li>• Minimum deposit: $50 USD</li>
                      <li>• Funds will appear after 3 confirmations</li>
                      <li>• Processing time: 10-30 minutes</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => simulatePayment("crypto")}
                    className="w-full bg-orange-600 hover:bg-orange-700 h-12"
                  >
                    I've Sent the Bitcoin
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Money Modal */}
        {showMobileModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-1zZicLhXKbRTC8FZRvM6u0Wke2dlzg.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute inset-0 bg-opacity-60"
              style={{
                backgroundImage:
                  "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-1zZicLhXKbRTC8FZRvM6u0Wke2dlzg.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative z-10">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Mobile Money Deposit</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowMobileModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Amount Display */}
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">Deposit Amount</p>
                    <p className="text-2xl font-bold text-green-900">${depositAmount}</p>
                  </div>

                  {/* Provider Selection */}
                  <div className="space-y-3">
                    <Label>Select Mobile Money Provider</Label>
                    {mobileProviders.map((provider) => (
                      <div
                        key={provider.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedProvider === provider.id
                            ? "border-[#1a4734] bg-[#1a4734]/5 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedProvider(provider.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${provider.color}`}>
                              <Image
                                src={provider.logo || "/placeholder.svg"}
                                alt={provider.name}
                                width={32}
                                height={32}
                                className="rounded"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                              <p className="text-sm text-gray-600">Mobile Money</p>
                            </div>
                          </div>
                          {selectedProvider === provider.id && (
                            <div className="p-1 bg-[#1a4734] rounded-full">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Number Input */}
                  {selectedProvider && (
                    <div className="space-y-2">
                      <Label htmlFor="mobile-number">Mobile Number</Label>
                      <Input
                        id="mobile-number"
                        type="tel"
                        placeholder="Enter your mobile number (e.g., 0241234567)"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="h-12"
                      />
                      <p className="text-xs text-gray-500">
                        Enter your {mobileProviders.find((p) => p.id === selectedProvider)?.name} number
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    onClick={() => simulatePayment("mobile")}
                    disabled={!selectedProvider || !mobileNumber || mobileNumber.length < 10}
                    className="w-full bg-green-600 hover:bg-green-700 h-12"
                  >
                    Deposit ${depositAmount}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Modal */}
        {showCardModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-1zZicLhXKbRTC8FZRvM6u0Wke2dlzg.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute inset-0 bg-opacity-60"
              style={{
                backgroundImage:
                  "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-1zZicLhXKbRTC8FZRvM6u0Wke2dlzg.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative z-10">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Card Payment</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowCardModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Amount Display */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">Deposit Amount</p>
                    <p className="text-2xl font-bold text-blue-900">${depositAmount}</p>
                  </div>

                  {/* Card Form */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardholder-name">Cardholder Name</Label>
                      <Input
                        id="cardholder-name"
                        type="text"
                        placeholder="John Doe"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-month">Expiry Month</Label>
                        <Input
                          id="expiry-month"
                          placeholder="MM"
                          value={expiryMonth}
                          onChange={(e) => setExpiryMonth(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry-year">Expiry Year</Label>
                        <Input
                          id="expiry-year"
                          placeholder="YY"
                          value={expiryYear}
                          onChange={(e) => setExpiryYear(e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={() => simulatePayment("card")}
                    disabled={!cardNumber || !cardholderName || !expiryMonth || !expiryYear || !cvv}
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12"
                  >
                    Pay ${depositAmount}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing Modal */}
        {isProcessing && (
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
            <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
              <div className="relative">
                <Loader2 className="h-20 w-20 text-[#1a4734] mx-auto mb-6 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#1a4734]/10 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Processing Payment...</h3>
              <p className="text-gray-600 mb-4">Please wait while we process your deposit.</p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-[#1a4734] rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-[#1a4734] rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#1a4734] rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Result Modal */}
        {paymentResult && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-1zZicLhXKbRTC8FZRvM6u0Wke2dlzg.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute inset-0 bg-opacity-60"
              style={{
                backgroundImage:
                  "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-1zZicLhXKbRTC8FZRvM6u0Wke2dlzg.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              className="bg-white rounded-lg max-w-md w-full p-8 text-center relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-28_08-19-55.jpg-URkEmNWPGJrhdSbm1ej4MzV4VrN6MF.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-white bg-opacity-90 rounded-lg"></div>

              {/* Content with relative positioning to appear above overlay */}
              <div className="relative z-10">
                {paymentResult === "success" ? (
                  <>
                    <div className="relative mb-6">
                      <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-3">Success!</h3>
                    <p className="text-green-700 mb-6">
                      Your deposit of ${depositAmount} has been processed successfully and will be credited to your
                      account shortly.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="relative mb-6">
                      <XCircle className="h-20 w-20 text-red-500 mx-auto" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-red-800 mb-3">Failed!</h3>
                    <p className="text-red-700 mb-6">
                      Your deposit could not be processed. Please try again or contact our support team for assistance.
                    </p>
                  </>
                )}
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 bg-white/80 backdrop-blur-sm" onClick={resetStates}>
                    Make Another Deposit
                  </Button>
                  <Link href="/dashboard" className="flex-1">
                    <Button className="w-full bg-[#1a4734] hover:bg-[#143626]">Go to Dashboard</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
