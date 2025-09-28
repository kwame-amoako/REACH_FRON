"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Download,
  Eye,
  MoreHorizontal,
  RefreshCw,
  X,
  Pause,
  CreditCard,
  User,
  Hash,
  Clock,
  DollarSign,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Transaction Action Dialog States
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [actionType, setActionType] = useState<"cancel" | "hold" | null>(null)
  const [actionReason, setActionReason] = useState("")

  // Transaction Details Dialog State
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [detailsTransaction, setDetailsTransaction] = useState<any>(null)

  const [transactions, setTransactions] = useState([
    {
      id: "TXN001",
      user: "John Doe",
      email: "john@example.com",
      type: "Deposit",
      amount: 500.0,
      status: "completed",
      method: "Bank Transfer",
      date: "2024-01-20",
      time: "14:30",
      reference: "REF001234",
      description: "Account deposit via bank transfer",
      bankDetails: "Chase Bank - Account ending in 4567",
      fees: 2.5,
    },
    {
      id: "TXN002",
      user: "Sarah Smith",
      email: "sarah@example.com",
      type: "Gift Card Purchase",
      amount: 100.0,
      status: "pending",
      method: "Credit Card",
      date: "2024-01-20",
      time: "13:45",
      reference: "REF001235",
      description: "Amazon Gift Card - $100",
      cardDetails: "Visa ending in 1234",
      fees: 3.0,
    },
    {
      id: "TXN003",
      user: "Mike Johnson",
      email: "mike@example.com",
      type: "Transfer",
      amount: 250.0,
      status: "completed",
      method: "Mobile Money",
      date: "2024-01-20",
      time: "12:15",
      reference: "REF001236",
      description: "Transfer to +233 24 567 8901",
      mobileDetails: "MTN Mobile Money",
      fees: 5.0,
    },
    {
      id: "TXN004",
      user: "Emily Davis",
      email: "emily@example.com",
      type: "Withdrawal",
      amount: 300.0,
      status: "failed",
      method: "Bank Transfer",
      date: "2024-01-20",
      time: "11:20",
      reference: "REF001237",
      description: "Withdrawal to bank account",
      bankDetails: "Wells Fargo - Account ending in 7890",
      fees: 5.0,
      failureReason: "Insufficient funds in source account",
    },
    {
      id: "TXN005",
      user: "David Wilson",
      email: "david@example.com",
      type: "Bill Payment",
      amount: 75.0,
      status: "completed",
      method: "Wallet Balance",
      date: "2024-01-20",
      time: "10:30",
      reference: "REF001238",
      description: "Electricity Bill Payment - ECG",
      billDetails: "Account: 123456789, Meter: 987654321",
      fees: 1.5,
    },
    {
      id: "TXN006",
      user: "Lisa Brown",
      email: "lisa@example.com",
      type: "Crypto Exchange",
      amount: 1200.0,
      status: "processing",
      method: "Bitcoin",
      date: "2024-01-20",
      time: "09:45",
      reference: "REF001239",
      description: "Bitcoin to USD conversion",
      cryptoDetails: "0.025 BTC at $48,000 per BTC",
      fees: 24.0,
    },
    {
      id: "TXN007",
      user: "Tom Anderson",
      email: "tom@example.com",
      type: "Refund",
      amount: 150.0,
      status: "completed",
      method: "Mobile Money",
      date: "2024-01-19",
      time: "16:20",
      reference: "REF001240",
      description: "Refund for cancelled gift card order",
      refundReason: "Customer requested cancellation within 24 hours",
      fees: 0.0,
    },
    {
      id: "TXN008",
      user: "Anna White",
      email: "anna@example.com",
      type: "Deposit",
      amount: 800.0,
      status: "pending",
      method: "Credit Card",
      date: "2024-01-19",
      time: "15:10",
      reference: "REF001241",
      description: "Account deposit via credit card",
      cardDetails: "Mastercard ending in 5678",
      fees: 8.0,
    },
  ])

  const handleTransactionAction = (transaction: any, action: "cancel" | "hold") => {
    setSelectedTransaction(transaction)
    setActionType(action)
    setIsActionDialogOpen(true)
  }

  const handleViewDetails = (transaction: any) => {
    setDetailsTransaction(transaction)
    setIsDetailsDialogOpen(true)
  }

  const downloadReceipt = (transaction: any) => {
    // Create receipt content
    const receiptContent = `
REACH FINANCIAL SERVICES
Transaction Receipt
========================

Transaction ID: ${transaction.id}
Reference: ${transaction.reference}
Date: ${transaction.date} at ${transaction.time}

Customer Information:
Name: ${transaction.user}
Email: ${transaction.email}

Transaction Details:
Type: ${transaction.type}
Amount: ${formatCurrency(transaction.amount)}
Payment Method: ${transaction.method}
Status: ${transaction.status.toUpperCase()}
Description: ${transaction.description}

${transaction.fees ? `Processing Fee: ${formatCurrency(transaction.fees)}` : ""}
${transaction.bankDetails ? `Bank Details: ${transaction.bankDetails}` : ""}
${transaction.cardDetails ? `Card Details: ${transaction.cardDetails}` : ""}
${transaction.mobileDetails ? `Mobile Details: ${transaction.mobileDetails}` : ""}
${transaction.cryptoDetails ? `Crypto Details: ${transaction.cryptoDetails}` : ""}
${transaction.billDetails ? `Bill Details: ${transaction.billDetails}` : ""}
${transaction.failureReason ? `Failure Reason: ${transaction.failureReason}` : ""}
${transaction.refundReason ? `Refund Reason: ${transaction.refundReason}` : ""}

========================
Thank you for using Reach Financial Services
Support: support@reachfinancial.com
Phone: +233 20 123 4567
    `.trim()

    // Create and download file
    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `receipt-${transaction.id}-${transaction.date}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const executeTransactionAction = () => {
    if (!selectedTransaction || !actionType) return

    // Update transaction status
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === selectedTransaction.id ? { ...t, status: actionType === "cancel" ? "cancelled" : "on_hold" } : t,
      ),
    )

    // Log the action
    console.log(`${actionType} transaction ${selectedTransaction.id}:`, actionReason)

    // Reset and close dialog
    setActionReason("")
    setSelectedTransaction(null)
    setActionType(null)
    setIsActionDialogOpen(false)

    alert(`Transaction ${actionType === "cancel" ? "cancelled" : "put on hold"} successfully!`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600"
      case "pending":
        return "bg-yellow-600"
      case "processing":
        return "bg-blue-600"
      case "failed":
        return "bg-red-600"
      case "cancelled":
        return "bg-gray-600"
      case "on_hold":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Deposit":
        return "text-green-400"
      case "Withdrawal":
        return "text-red-400"
      case "Transfer":
        return "text-blue-400"
      case "Gift Card Purchase":
        return "text-purple-400"
      case "Bill Payment":
        return "text-yellow-400"
      case "Crypto Exchange":
        return "text-orange-400"
      case "Refund":
        return "text-pink-400"
      default:
        return "text-gray-400"
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const totalTransactions = transactions.length
  const completedTransactions = transactions.filter((t) => t.status === "completed").length
  const pendingTransactions = transactions.filter((t) => t.status === "pending").length
  const totalVolume = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Transaction Management</h1>
          <p className="text-gray-400">Monitor and manage all platform transactions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-white">{totalTransactions.toLocaleString()}</div>
            <p className="text-sm text-gray-400">Total Transactions</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-400">{completedTransactions.toLocaleString()}</div>
            <p className="text-sm text-gray-400">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-400">{pendingTransactions.toLocaleString()}</div>
            <p className="text-sm text-gray-400">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-400">{formatCurrency(totalVolume)}</div>
            <p className="text-sm text-gray-400">Total Volume</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by user, transaction ID, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Deposit">Deposit</SelectItem>
                <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                <SelectItem value="Transfer">Transfer</SelectItem>
                <SelectItem value="Gift Card Purchase">Gift Card</SelectItem>
                <SelectItem value="Bill Payment">Bill Payment</SelectItem>
                <SelectItem value="Crypto Exchange">Crypto</SelectItem>
                <SelectItem value="Refund">Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription className="text-gray-400">
            Complete list of platform transactions with details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Transaction</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Method</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-white">{transaction.id}</p>
                        <p className="text-sm text-gray-400">{transaction.reference}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {transaction.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{transaction.user}</p>
                          <p className="text-sm text-gray-400">{transaction.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-sm font-medium ${getTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-white">{formatCurrency(transaction.amount)}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-300">{transaction.method}</p>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusColor(transaction.status)} text-white`}>{transaction.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm text-white">{transaction.date}</p>
                        <p className="text-xs text-gray-400">{transaction.time}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-700 border-gray-600">
                          <DropdownMenuItem
                            className="text-gray-300 hover:bg-gray-600"
                            onClick={() => handleViewDetails(transaction)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-gray-300 hover:bg-gray-600"
                            onClick={() => downloadReceipt(transaction)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Receipt
                          </DropdownMenuItem>
                          {(transaction.status === "pending" || transaction.status === "processing") && (
                            <>
                              <DropdownMenuItem
                                className="text-orange-400 hover:bg-gray-600"
                                onClick={() => handleTransactionAction(transaction, "hold")}
                              >
                                <Pause className="w-4 h-4 mr-2" />
                                Hold Transaction
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-400 hover:bg-gray-600"
                                onClick={() => handleTransactionAction(transaction, "cancel")}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancel Transaction
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Transaction Details</DialogTitle>
            <DialogDescription className="text-gray-400">Complete information about this transaction</DialogDescription>
          </DialogHeader>

          {detailsTransaction && (
            <div className="space-y-6">
              {/* Transaction Header */}
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-white">{detailsTransaction.id}</h3>
                  <p className="text-sm text-gray-400">Reference: {detailsTransaction.reference}</p>
                </div>
                <Badge className={`${getStatusColor(detailsTransaction.status)} text-white`}>
                  {detailsTransaction.status}
                </Badge>
              </div>

              {/* Transaction Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-400" />
                    Customer Information
                  </h4>
                  <div className="space-y-2 pl-7">
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="text-white font-medium">{detailsTransaction.user}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">{detailsTransaction.email}</p>
                    </div>
                  </div>
                </div>

                {/* Transaction Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white flex items-center">
                    <Hash className="w-5 h-5 mr-2 text-green-400" />
                    Transaction Information
                  </h4>
                  <div className="space-y-2 pl-7">
                    <div>
                      <p className="text-sm text-gray-400">Type</p>
                      <p className={`font-medium ${getTypeColor(detailsTransaction.type)}`}>
                        {detailsTransaction.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Description</p>
                      <p className="text-white">{detailsTransaction.description}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
                    Payment Information
                  </h4>
                  <div className="space-y-2 pl-7">
                    <div>
                      <p className="text-sm text-gray-400">Method</p>
                      <p className="text-white font-medium">{detailsTransaction.method}</p>
                    </div>
                    {detailsTransaction.bankDetails && (
                      <div>
                        <p className="text-sm text-gray-400">Bank Details</p>
                        <p className="text-white">{detailsTransaction.bankDetails}</p>
                      </div>
                    )}
                    {detailsTransaction.cardDetails && (
                      <div>
                        <p className="text-sm text-gray-400">Card Details</p>
                        <p className="text-white">{detailsTransaction.cardDetails}</p>
                      </div>
                    )}
                    {detailsTransaction.mobileDetails && (
                      <div>
                        <p className="text-sm text-gray-400">Mobile Details</p>
                        <p className="text-white">{detailsTransaction.mobileDetails}</p>
                      </div>
                    )}
                    {detailsTransaction.cryptoDetails && (
                      <div>
                        <p className="text-sm text-gray-400">Crypto Details</p>
                        <p className="text-white">{detailsTransaction.cryptoDetails}</p>
                      </div>
                    )}
                    {detailsTransaction.billDetails && (
                      <div>
                        <p className="text-sm text-gray-400">Bill Details</p>
                        <p className="text-white">{detailsTransaction.billDetails}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Amount Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
                    Amount Information
                  </h4>
                  <div className="space-y-2 pl-7">
                    <div>
                      <p className="text-sm text-gray-400">Transaction Amount</p>
                      <p className="text-white font-bold text-lg">{formatCurrency(detailsTransaction.amount)}</p>
                    </div>
                    {detailsTransaction.fees && (
                      <div>
                        <p className="text-sm text-gray-400">Processing Fee</p>
                        <p className="text-white">{formatCurrency(detailsTransaction.fees)}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-400">Total Amount</p>
                      <p className="text-white font-medium">
                        {formatCurrency(detailsTransaction.amount + (detailsTransaction.fees || 0))}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Date & Time Information */}
                <div className="space-y-4 md:col-span-2">
                  <h4 className="text-lg font-medium text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-400" />
                    Date & Time Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-7">
                    <div>
                      <p className="text-sm text-gray-400">Transaction Date</p>
                      <p className="text-white font-medium">{detailsTransaction.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Transaction Time</p>
                      <p className="text-white font-medium">{detailsTransaction.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <Badge className={`${getStatusColor(detailsTransaction.status)} text-white`}>
                        {detailsTransaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                {(detailsTransaction.failureReason || detailsTransaction.refundReason) && (
                  <div className="space-y-4 md:col-span-2">
                    <h4 className="text-lg font-medium text-white">Additional Information</h4>
                    <div className="pl-7">
                      {detailsTransaction.failureReason && (
                        <div className="p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
                          <p className="text-sm text-gray-400">Failure Reason</p>
                          <p className="text-red-400">{detailsTransaction.failureReason}</p>
                        </div>
                      )}
                      {detailsTransaction.refundReason && (
                        <div className="p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                          <p className="text-sm text-gray-400">Refund Reason</p>
                          <p className="text-blue-400">{detailsTransaction.refundReason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsDialogOpen(false)}
                  className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
                >
                  Close
                </Button>
                <Button
                  onClick={() => downloadReceipt(detailsTransaction)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Transaction Action Dialog */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>{actionType === "cancel" ? "Cancel Transaction" : "Hold Transaction"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {actionType === "cancel"
                ? "Are you sure you want to cancel this transaction? This action cannot be undone."
                : "Put this transaction on hold temporarily. You can resume it later."}
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h4 className="font-medium text-white mb-2">Transaction Details</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300">ID: {selectedTransaction.id}</p>
                  <p className="text-gray-300">User: {selectedTransaction.user}</p>
                  <p className="text-gray-300">Amount: {formatCurrency(selectedTransaction.amount)}</p>
                  <p className="text-gray-300">Type: {selectedTransaction.type}</p>
                </div>
              </div>

              <div>
                <Label htmlFor="actionReason" className="text-gray-300">
                  Reason for {actionType === "cancel" ? "cancellation" : "holding"} *
                </Label>
                <Textarea
                  id="actionReason"
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                  placeholder={`Enter reason for ${actionType === "cancel" ? "cancelling" : "holding"} this transaction...`}
                  rows={3}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsActionDialogOpen(false)}
                  className="border-gray-600 text-gray-300 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={executeTransactionAction}
                  className={
                    actionType === "cancel" ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700"
                  }
                  disabled={!actionReason.trim()}
                >
                  {actionType === "cancel" ? "Cancel Transaction" : "Hold Transaction"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
