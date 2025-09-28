"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Coins,
  DollarSign,
  QrCode,
  Copy,
  Wallet,
  CreditCard,
  Smartphone,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CryptoPage() {
  const [activeTab, setActiveTab] = useState("trade")
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [showWalletOptions, setShowWalletOptions] = useState(false)
  const [showPaymentMethod, setShowPaymentMethod] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState<"success" | "failed" | null>(null)
  const [showSellWallet, setShowSellWallet] = useState(false)
  const [sellStatus, setSellStatus] = useState<"waiting" | "credited" | null>(null)

  const cryptoData = [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 45250.0,
      change: 2.5,
      balance: 0.025,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: 3200.0,
      change: -1.2,
      balance: 0.5,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Binance Coin",
      symbol: "BNB",
      price: 420.0,
      change: 3.8,
      balance: 2.0,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Litecoin",
      symbol: "LTC",
      price: 85.0,
      change: 1.5,
      balance: 5.0,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Tether",
      symbol: "USDT",
      price: 1.0,
      change: 0.1,
      balance: 1000.0,
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const mobileProviders = [
    { id: "mtn", name: "MTN", logo: "/images/mtn-logo.png" },
    { id: "airteltigo", name: "AirtelTigo", logo: "/images/airteltigo-logo.png" },
    { id: "telecel", name: "Telecel", logo: "/images/telecel-logo.png" },
  ]

  const recentTrades = [
    { id: 1, type: "buy", crypto: "BTC", amount: 0.005, price: 45000, date: "2024-01-15" },
    { id: 2, type: "sell", crypto: "ETH", amount: 0.2, price: 3150, date: "2024-01-14" },
    { id: 3, type: "buy", crypto: "LTC", amount: 2.0, price: 85, date: "2024-01-13" },
  ]

  const ourWalletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

  const handleBuyCrypto = () => {
    if (!selectedCrypto || !buyAmount) {
      alert("Please select cryptocurrency and enter amount")
      return
    }
    setShowWalletOptions(true)
  }

  const handleWalletSubmit = () => {
    if (!walletAddress) {
      alert("Please enter wallet address or scan QR code")
      return
    }
    setShowWalletOptions(false)
    setShowPaymentMethod(true)
  }

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
  }

  const simulatePayment = async () => {
    setIsProcessing(true)
    setShowPaymentMethod(false)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Random success/failure
    const isSuccess = Math.random() > 0.3
    setPaymentResult(isSuccess ? "success" : "failed")
    setIsProcessing(false)
  }

  const handleSellCrypto = async () => {
    if (!selectedCrypto || !sellAmount) {
      alert("Please select cryptocurrency and enter amount")
      return
    }

    setShowSellWallet(true)
  }

  const handleSellConfirm = async () => {
    setShowSellWallet(false)
    setSellStatus("waiting")

    // Simulate waiting for crypto transfer
    await new Promise((resolve) => setTimeout(resolve, 5000))

    setSellStatus("credited")
  }

  const resetStates = () => {
    setShowWalletOptions(false)
    setShowPaymentMethod(false)
    setSelectedPaymentMethod("")
    setSelectedProvider("")
    setMobileNumber("")
    setCardNumber("")
    setExpiryMonth("")
    setExpiryYear("")
    setCvv("")
    setPaymentResult(null)
    setWalletAddress("")
    setBuyAmount("")
    setSellAmount("")
    setSelectedCrypto("")
    setShowSellWallet(false)
    setSellStatus(null)
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
          <h1 className="text-xl font-bold">Cryptocurrency</h1>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Portfolio Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coins className="h-5 w-5" />
              <span>Portfolio Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#1a4734]">$2,850.50</p>
                <p className="text-sm text-gray-600">Total Value</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">+$125.30</p>
                <p className="text-sm text-gray-600">24h Change</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-600">Assets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">+4.6%</p>
                <p className="text-sm text-gray-600">Total Return</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Beautiful Tab Navigation */}
        <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-sm">
          <Button
            onClick={() => setActiveTab("trade")}
            className={`flex-1 h-12 font-medium transition-all ${
              activeTab === "trade"
                ? "bg-[#1a4734] text-white shadow-md"
                : "bg-transparent text-gray-600 hover:bg-gray-100"
            }`}
          >
            <DollarSign className="h-5 w-5 mr-2" />
            Trade
          </Button>
          <Button
            onClick={() => setActiveTab("market")}
            className={`flex-1 h-12 font-medium transition-all ${
              activeTab === "market"
                ? "bg-[#1a4734] text-white shadow-md"
                : "bg-transparent text-gray-600 hover:bg-gray-100"
            }`}
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Market
          </Button>
          <Button
            onClick={() => setActiveTab("portfolio")}
            className={`flex-1 h-12 font-medium transition-all ${
              activeTab === "portfolio"
                ? "bg-[#1a4734] text-white shadow-md"
                : "bg-transparent text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Wallet className="h-5 w-5 mr-2" />
            Portfolio
          </Button>
        </div>

        {/* Trade Tab */}
        {activeTab === "trade" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buy Crypto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Buy Crypto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buy-crypto">Select Cryptocurrency</Label>
                  <select
                    className="w-full p-3 border rounded-md bg-white"
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                  >
                    <option value="">Choose crypto</option>
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="BNB">Binance Coin (BNB)</option>
                    <option value="LTC">Litecoin (LTC)</option>
                    <option value="USDT">Tether (USDT)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buy-amount">Amount (USD)</Label>
                  <Input
                    id="buy-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">You will receive:</p>
                  <p className="font-bold">
                    ~
                    {selectedCrypto === "BTC"
                      ? "0.0022 BTC"
                      : selectedCrypto === "ETH"
                        ? "0.031 ETH"
                        : selectedCrypto === "LTC"
                          ? "1.18 LTC"
                          : selectedCrypto === "USDT"
                            ? `${buyAmount || "0"} USDT`
                            : "Select crypto"}
                  </p>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 h-12" onClick={handleBuyCrypto}>
                  Buy Crypto
                </Button>
              </CardContent>
            </Card>

            {/* Sell Crypto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Sell Crypto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sell-crypto">Select Cryptocurrency</Label>
                  <select
                    className="w-full p-3 border rounded-md bg-white"
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                  >
                    <option value="">Choose crypto</option>
                    <option value="BTC">Bitcoin (BTC) - 0.025</option>
                    <option value="ETH">Ethereum (ETH) - 0.5</option>
                    <option value="BNB">Binance Coin (BNB) - 2.0</option>
                    <option value="LTC">Litecoin (LTC) - 5.0</option>
                    <option value="USDT">Tether (USDT) - 1000.0</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sell-amount">Amount</Label>
                  <Input
                    id="sell-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">You will receive:</p>
                  <p className="font-bold">
                    ~$
                    {sellAmount
                      ? (
                          Number.parseFloat(sellAmount) *
                          (selectedCrypto === "BTC"
                            ? 45250
                            : selectedCrypto === "ETH"
                              ? 3200
                              : selectedCrypto === "LTC"
                                ? 85
                                : selectedCrypto === "USDT"
                                  ? 1
                                  : 0)
                        ).toFixed(2)
                      : "0.00"}
                  </p>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 h-12" onClick={handleSellCrypto}>
                  Sell Crypto
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Market Tab */}
        {activeTab === "market" && (
          <div className="space-y-4">
            {cryptoData.map((crypto) => (
              <Card key={crypto.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{crypto.name}</h3>
                        <p className="text-sm text-gray-600">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${crypto.price.toLocaleString()}</p>
                      <div
                        className={`flex items-center text-sm ${
                          crypto.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {crypto.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {crypto.change >= 0 ? "+" : ""}
                        {crypto.change}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            {/* My Holdings */}
            <Card>
              <CardHeader>
                <CardTitle>My Holdings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cryptoData.map((crypto) => (
                  <div key={crypto.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{crypto.name}</p>
                        <p className="text-sm text-gray-600">
                          {crypto.balance} {crypto.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(crypto.balance * crypto.price).toFixed(2)}</p>
                      <p className={`text-sm ${crypto.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {crypto.change >= 0 ? "+" : ""}
                        {crypto.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTrades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${trade.type === "buy" ? "bg-green-100" : "bg-red-100"}`}>
                        <DollarSign className={`h-4 w-4 ${trade.type === "buy" ? "text-green-600" : "text-red-600"}`} />
                      </div>
                      <div>
                        <p className="font-medium">
                          {trade.type === "buy" ? "Bought" : "Sold"} {trade.crypto}
                        </p>
                        <p className="text-sm text-gray-600">{trade.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {trade.amount} {trade.crypto}
                      </p>
                      <p className="text-sm text-gray-600">${trade.price}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Wallet Address Modal for Buy */}
        {showWalletOptions && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{
              backgroundImage: "url('/images/digital-pattern.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">Enter Wallet Address</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wallet-address">Wallet Address</Label>
                  <Input
                    id="wallet-address"
                    placeholder="Enter your wallet address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">Or</p>
                  <Button variant="outline" className="w-full h-12 bg-transparent">
                    <QrCode className="h-5 w-5 mr-2" />
                    Scan Wallet QR Code
                  </Button>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowWalletOptions(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-[#1a4734] hover:bg-[#143626]" onClick={handleWalletSubmit}>
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Method Modal */}
        {showPaymentMethod && (
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
            <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

              <div className="space-y-4">
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
                  </div>
                </div>

                {/* Mobile Money Form */}
                {selectedPaymentMethod === "mobile" && (
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium">Mobile Money Payment</h3>

                    <div className="space-y-2">
                      <Label>Select Provider</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {mobileProviders.map((provider) => (
                          <div
                            key={provider.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors hover:border-[#1a4734] ${
                              selectedProvider === provider.id ? "border-[#1a4734] bg-[#1a4734]/5" : "border-gray-200"
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
                        className="h-12"
                      />
                    </div>

                    <Button
                      className="w-full bg-[#1a4734] hover:bg-[#143626] h-12"
                      onClick={simulatePayment}
                      disabled={!selectedProvider || !mobileNumber}
                    >
                      Pay ${buyAmount}
                    </Button>
                  </div>
                )}

                {/* Card Payment Form */}
                {selectedPaymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium">Card Payment</h3>

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

                    <Button
                      className="w-full bg-[#1a4734] hover:bg-[#143626] h-12"
                      onClick={simulatePayment}
                      disabled={!cardNumber || !expiryMonth || !expiryYear || !cvv}
                    >
                      Pay ${buyAmount}
                    </Button>
                  </div>
                )}

                <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowPaymentMethod(false)}>
                  Back
                </Button>
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
            <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
              <Loader2 className="h-16 w-16 text-[#1a4734] mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-bold mb-2">Processing Payment...</h3>
              <p className="text-gray-600">Please wait while we process your payment.</p>
            </div>
          </div>
        )}

        {/* Payment Result Modal */}
        {paymentResult && (
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
            <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
              {paymentResult === "success" ? (
                <>
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-green-800 mb-2">Payment Successful!</h3>
                  <p className="text-green-700 mb-4">Your {selectedCrypto} purchase has been completed successfully.</p>
                </>
              ) : (
                <>
                  <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-red-800 mb-2">Payment Failed</h3>
                  <p className="text-red-700 mb-4">Your payment could not be processed. Please try again.</p>
                </>
              )}
              <Button className="bg-[#1a4734] hover:bg-[#143626]" onClick={resetStates}>
                Done
              </Button>
            </div>
          </div>
        )}

        {/* Sell Wallet Display Modal */}
        {showSellWallet && (
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
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">Send Crypto to Our Wallet</h2>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-32 w-32 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Scan QR code to send {selectedCrypto}</p>
                </div>

                <div className="space-y-2">
                  <Label>Our Wallet Address</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={ourWalletAddress} readOnly className="bg-gray-50 text-sm" />
                    <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(ourWalletAddress)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Amount to send:</strong> {sellAmount} {selectedCrypto}
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>You will receive:</strong> $
                    {sellAmount
                      ? (
                          Number.parseFloat(sellAmount) *
                          (selectedCrypto === "BTC"
                            ? 45250
                            : selectedCrypto === "ETH"
                              ? 3200
                              : selectedCrypto === "LTC"
                                ? 85
                                : selectedCrypto === "USDT"
                                  ? 1
                                  : 0)
                        ).toFixed(2)
                      : "0.00"}
                  </p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowSellWallet(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-[#1a4734] hover:bg-[#143626]" onClick={handleSellConfirm}>
                    I've Sent the Crypto
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sell Status Modals */}
        {sellStatus === "waiting" && (
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
            <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
              <Loader2 className="h-16 w-16 text-[#1a4734] mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-bold mb-2">WAITING</h3>
              <p className="text-gray-600">Waiting for crypto confirmation...</p>
            </div>
          </div>
        )}

        {sellStatus === "credited" && (
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
            <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-green-800 mb-2">FUNDS CREDITED TO REACH E-WALLET</h3>
              <p className="text-green-700 mb-4">Your funds have been successfully credited to your Reach account.</p>
              <div className="flex space-x-2">
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full bg-[#1a4734] hover:bg-[#143626]">Go to Dashboard</Button>
                </Link>
                <Link href="/dashboard/transfer" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Transfer Funds
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
