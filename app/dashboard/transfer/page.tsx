"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Wallet,
  Smartphone,
  Coins,
  X,
  CheckCircle,
  XCircle,
  Loader2,
  Check,
  Mail,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TransferPage() {
  const [transferAmount, setTransferAmount] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [selectedTransferMethod, setSelectedTransferMethod] = useState("")
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState<"success" | "failed" | null>(null)

  // Payment method states
  const [selectedProvider, setSelectedProvider] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [cryptoAddress, setCryptoAddress] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState("")

  const recentContacts = [
    { id: 1, name: "John Doe", email: "john@example.com", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const mobileProviders = [
    { id: "mtn", name: "MTN", logo: "/images/mtn-logo.png", color: "from-yellow-400 to-yellow-600" },
    { id: "airteltigo", name: "AirtelTigo", logo: "/images/airteltigo-logo.png", color: "from-red-400 to-red-600" },
    { id: "telecel", name: "Telecel", logo: "/images/telecel-logo.png", color: "from-blue-400 to-blue-600" },
  ]

  const cryptoOptions = [
    { id: "btc", name: "Bitcoin", symbol: "BTC", icon: "₿" },
    { id: "eth", name: "Ethereum", symbol: "ETH", icon: "Ξ" },
    { id: "usdt", name: "Tether", symbol: "USDT", icon: "₮" },
  ]

  const handleTransfer = () => {
    if (!transferAmount) {
      alert("Please enter transfer amount")
      return
    }
    setShowTransferModal(true)
  }

  const handleTransferMethodSelect = (method: string) => {
    setSelectedTransferMethod(method)
    setShowPaymentForm(true)
  }

  const simulatePayment = async () => {
    setIsProcessing(true)
    setShowPaymentForm(false)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Random success/failure
    const isSuccess = Math.random() > 0.2
    setPaymentResult(isSuccess ? "success" : "failed")
    setIsProcessing(false)
  }

  const resetStates = () => {
    setShowTransferModal(false)
    setSelectedTransferMethod("")
    setShowPaymentForm(false)
    setSelectedProvider("")
    setMobileNumber("")
    setCryptoAddress("")
    setSelectedCrypto("")
    setPaymentResult(null)
    setIsProcessing(false)
    setTransferAmount("")
    setRecipientEmail("")
  }

  const isFormValid = () => {
    if (selectedTransferMethod === "reach-wallet") {
      return recipientEmail.includes("@")
    } else if (selectedTransferMethod === "mobile") {
      return selectedProvider && mobileNumber.length >= 10
    } else if (selectedTransferMethod === "crypto") {
      return selectedCrypto && cryptoAddress.length >= 26
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
          <h1 className="text-xl font-bold">Transfer or Withdrawal</h1>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Transfer Amount */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Transfer Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount to transfer"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="text-lg h-12"
                min="1"
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 flex items-center">
                <Wallet className="h-4 w-4 mr-2" />
                Choose your transfer destination below
              </p>
            </div>

            <Button
              className="w-full bg-[#1a4734] hover:bg-[#143626] h-12"
              onClick={handleTransfer}
              disabled={!transferAmount || Number.parseFloat(transferAmount) < 1}
            >
              Continue to Transfer Options
            </Button>
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => {
                    setRecipientEmail(contact.email)
                    if (transferAmount) {
                      setShowTransferModal(true)
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Quick Transfer
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transfer Method Selection Modal */}
        {showTransferModal && !showPaymentForm && !paymentResult && !isProcessing && (
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
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Choose Transfer Method</h2>
                  <Button variant="ghost" size="sm" onClick={resetStates}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Transfer Summary */}
                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Transfer Amount</h3>
                  <p className="text-2xl font-bold text-[#1a4734]">${transferAmount}</p>
                </div>

                {/* Beautiful Transfer Method Buttons */}
                <div className="space-y-4">
                  {/* Reach Wallet Button */}
                  <button
                    onClick={() => handleTransferMethodSelect("reach-wallet")}
                    className="group relative overflow-hidden bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-600 hover:to-emerald-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-30 transition-opacity">
                      <Wallet className="h-8 w-8" />
                    </div>
                    <div className="relative z-10 flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                        <Wallet className="h-8 w-8" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-lg font-bold">Reach Wallet</h3>
                        <p className="text-sm opacity-90">Transfer to another Reach account</p>
                        <p className="text-xs opacity-75 mt-1">Instant • No fees • Secure</p>
                      </div>
                      <div className="text-right">
                        <div className="w-6 h-6 border-2 border-white/50 rounded-full flex items-center justify-center">
                          <ArrowUpRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Mobile Money Button */}
                  <button
                    onClick={() => handleTransferMethodSelect("mobile")}
                    className="group relative overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-30 transition-opacity">
                      <Smartphone className="h-8 w-8" />
                    </div>
                    <div className="relative z-10 flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                        <Smartphone className="h-8 w-8" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-lg font-bold">Mobile Money</h3>
                        <p className="text-sm opacity-90">Withdraw to mobile wallet</p>
                        <p className="text-xs opacity-75 mt-1">MTN • Telecel • AirtelTigo</p>
                      </div>
                      <div className="text-right">
                        <div className="w-6 h-6 border-2 border-white/50 rounded-full flex items-center justify-center">
                          <ArrowUpRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Cryptocurrency Button */}
                  <button
                    onClick={() => handleTransferMethodSelect("crypto")}
                    className="group relative overflow-hidden bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-30 transition-opacity">
                      <Coins className="h-8 w-8" />
                    </div>
                    <div className="relative z-10 flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                        <Coins className="h-8 w-8" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-lg font-bold">Cryptocurrency</h3>
                        <p className="text-sm opacity-90">Withdraw to crypto wallet</p>
                        <p className="text-xs opacity-75 mt-1">Bitcoin • Ethereum • USDT</p>
                      </div>
                      <div className="text-right">
                        <div className="w-6 h-6 border-2 border-white/50 rounded-full flex items-center justify-center">
                          <ArrowUpRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Forms Modal */}
        {showPaymentForm && !paymentResult && !isProcessing && (
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
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">
                    {selectedTransferMethod === "reach-wallet" && "Transfer to Reach Wallet"}
                    {selectedTransferMethod === "mobile" && "Mobile Money Withdrawal"}
                    {selectedTransferMethod === "crypto" && "Cryptocurrency Withdrawal"}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={resetStates}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Transfer Summary */}
                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Transfer Details</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">${transferAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium capitalize">{selectedTransferMethod.replace("-", " ")}</span>
                    </div>
                  </div>
                </div>

                {/* Reach Wallet Form */}
                {selectedTransferMethod === "reach-wallet" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center space-x-3 mb-3">
                        <Wallet className="h-6 w-6 text-emerald-600" />
                        <div>
                          <p className="font-medium text-emerald-800">Transfer to Reach Wallet</p>
                          <p className="text-sm text-emerald-600">Send money to another Reach user</p>
                        </div>
                      </div>
                      <div className="text-sm text-emerald-700">
                        <p>• Instant transfer</p>
                        <p>• No fees</p>
                        <p>• Secure and encrypted</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipient-email">Recipient's Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="recipient-email"
                          type="email"
                          placeholder="Enter recipient's Reach account email"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          className="pl-10 h-12"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Enter the email address associated with the recipient's Reach account
                      </p>
                    </div>
                  </div>
                )}

                {/* Mobile Money Form */}
                {selectedTransferMethod === "mobile" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Mobile Money Provider</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {mobileProviders.map((provider) => (
                          <div
                            key={provider.id}
                            className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                              selectedProvider === provider.id
                                ? "border-[#1a4734] bg-[#1a4734]/5 shadow-md"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedProvider(provider.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${provider.color}`}>
                                  <Image
                                    src={provider.logo || "/placeholder.svg"}
                                    alt={provider.name}
                                    width={24}
                                    height={24}
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
                    </div>

                    {selectedProvider && (
                      <div className="space-y-2">
                        <Label htmlFor="mobile-number">Mobile Number</Label>
                        <Input
                          id="mobile-number"
                          type="tel"
                          placeholder="Enter mobile number (e.g., 0241234567)"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="h-12"
                        />
                        <p className="text-xs text-gray-500">
                          Enter your {mobileProviders.find((p) => p.id === selectedProvider)?.name} number
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Cryptocurrency Form */}
                {selectedTransferMethod === "crypto" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Cryptocurrency</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {cryptoOptions.map((crypto) => (
                          <div
                            key={crypto.id}
                            className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                              selectedCrypto === crypto.id
                                ? "border-[#1a4734] bg-[#1a4734]/5 shadow-md"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedCrypto(crypto.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                                  {crypto.icon}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{crypto.name}</h3>
                                  <p className="text-sm text-gray-600">{crypto.symbol}</p>
                                </div>
                              </div>
                              {selectedCrypto === crypto.id && (
                                <div className="p-1 bg-[#1a4734] rounded-full">
                                  <Check className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedCrypto && (
                      <div className="space-y-2">
                        <Label htmlFor="crypto-address">Wallet Address</Label>
                        <Input
                          id="crypto-address"
                          type="text"
                          placeholder={`Enter your ${cryptoOptions.find((c) => c.id === selectedCrypto)?.name} wallet address`}
                          value={cryptoAddress}
                          onChange={(e) => setCryptoAddress(e.target.value)}
                          className="h-12 font-mono text-sm"
                        />
                        <p className="text-xs text-gray-500">
                          Double-check your wallet address. Crypto transfers are irreversible.
                        </p>
                      </div>
                    )}

                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-800">
                        <strong>Important:</strong> Cryptocurrency transfers are irreversible. Please verify the wallet
                        address carefully.
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-6">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowPaymentForm(false)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-[#1a4734] hover:bg-[#143626]"
                    onClick={simulatePayment}
                    disabled={!isFormValid()}
                  >
                    Transfer ${transferAmount}
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
            <div className="bg-white rounded-lg max-w-md w-full p-8 text-center relative z-10 shadow-2xl">
              <Loader2 className="h-20 w-20 text-[#1a4734] mx-auto mb-6 animate-spin" />
              <h3 className="text-xl font-bold mb-3">Processing Transfer...</h3>
              <p className="text-gray-600">Please wait while we process your ${transferAmount} transfer.</p>
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
            <div className="bg-white rounded-lg max-w-md w-full p-8 text-center relative z-10 shadow-2xl">
              {paymentResult === "success" ? (
                <>
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-green-800 mb-3">Transfer Successful!</h3>
                  <p className="text-green-700 mb-6">
                    ${transferAmount} has been successfully transferred via {selectedTransferMethod.replace("-", " ")}.
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-red-800 mb-3">Transfer Failed</h3>
                  <p className="text-red-700 mb-6">
                    Your transfer could not be processed. Please try again or contact support.
                  </p>
                </>
              )}
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={resetStates}>
                  Make Another Transfer
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full bg-[#1a4734] hover:bg-[#143626]">Go to Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
