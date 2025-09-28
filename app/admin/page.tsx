"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  CreditCard,
  Gift,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  MessageSquare,
  Eye,
  Download,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Send,
  Trash2,
  Archive,
} from "lucide-react"

// Sample data
const dashboardStats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Total Transactions",
    value: "18,392",
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
    color: "text-green-600",
  },
  {
    title: "Gift Cards Sold",
    value: "1,234",
    change: "-2.1%",
    trend: "down",
    icon: Gift,
    color: "text-purple-600",
  },
  {
    title: "Total Revenue",
    value: "$89,432",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-yellow-600",
  },
]

const recentTransactions = [
  {
    id: "TXN001",
    user: "John Doe",
    email: "john@example.com",
    type: "Gift Card Purchase",
    amount: "$50.00",
    status: "completed",
    date: "2024-01-15 10:30 AM",
    method: "Credit Card",
  },
  {
    id: "TXN002",
    user: "Jane Smith",
    email: "jane@example.com",
    type: "Crypto Exchange",
    amount: "$125.50",
    status: "pending",
    date: "2024-01-15 09:15 AM",
    method: "Bank Transfer",
  },
  {
    id: "TXN003",
    user: "Mike Johnson",
    email: "mike@example.com",
    type: "Money Transfer",
    amount: "$75.25",
    status: "failed",
    date: "2024-01-15 08:45 AM",
    method: "PayPal",
  },
  {
    id: "TXN004",
    user: "Sarah Wilson",
    email: "sarah@example.com",
    type: "Gift Card Purchase",
    amount: "$100.00",
    status: "completed",
    date: "2024-01-15 08:20 AM",
    method: "Credit Card",
  },
  {
    id: "TXN005",
    user: "David Brown",
    email: "david@example.com",
    type: "Deposit",
    amount: "$200.00",
    status: "completed",
    date: "2024-01-15 07:55 AM",
    method: "Bank Transfer",
  },
]

const recentUsers = [
  {
    id: "USR001",
    name: "Alice Cooper",
    email: "alice@example.com",
    joinDate: "2024-01-15",
    status: "active",
    balance: "$150.00",
    transactions: 12,
  },
  {
    id: "USR002",
    name: "Bob Martin",
    email: "bob@example.com",
    joinDate: "2024-01-14",
    status: "active",
    balance: "$89.50",
    transactions: 8,
  },
  {
    id: "USR003",
    name: "Carol Davis",
    email: "carol@example.com",
    joinDate: "2024-01-14",
    status: "suspended",
    balance: "$0.00",
    transactions: 3,
  },
  {
    id: "USR004",
    name: "Daniel Lee",
    email: "daniel@example.com",
    joinDate: "2024-01-13",
    status: "active",
    balance: "$275.25",
    transactions: 15,
  },
  {
    id: "USR005",
    name: "Emma White",
    email: "emma@example.com",
    joinDate: "2024-01-13",
    status: "active",
    balance: "$45.75",
    transactions: 5,
  },
]

const userMessages = [
  {
    id: "MSG001",
    user: "John Doe",
    email: "john@example.com",
    subject: "Payment Issue",
    message: "I'm having trouble with my payment not going through. Can you help?",
    status: "unread",
    priority: "high",
    date: "2024-01-15 11:30 AM",
    category: "Payment",
  },
  {
    id: "MSG002",
    user: "Jane Smith",
    email: "jane@example.com",
    subject: "Account Verification",
    message: "My account verification is taking longer than expected. When will it be completed?",
    status: "replied",
    priority: "medium",
    date: "2024-01-15 10:15 AM",
    category: "Account",
  },
  {
    id: "MSG003",
    user: "Mike Johnson",
    email: "mike@example.com",
    subject: "Gift Card Not Received",
    message: "I purchased a gift card 2 hours ago but haven't received it yet.",
    status: "unread",
    priority: "high",
    date: "2024-01-15 09:45 AM",
    category: "Gift Cards",
  },
  {
    id: "MSG004",
    user: "Sarah Wilson",
    email: "sarah@example.com",
    subject: "Feature Request",
    message: "Would it be possible to add support for more cryptocurrency options?",
    status: "read",
    priority: "low",
    date: "2024-01-15 08:30 AM",
    category: "Feature",
  },
  {
    id: "MSG005",
    user: "David Brown",
    email: "david@example.com",
    subject: "Transaction Refund",
    message: "I need a refund for transaction TXN123. The service was not delivered.",
    status: "replied",
    priority: "high",
    date: "2024-01-15 07:20 AM",
    category: "Refund",
  },
]

export default function AdminDashboard() {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [messageReply, setMessageReply] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      failed: { color: "bg-red-100 text-red-800", icon: XCircle },
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      suspended: { color: "bg-red-100 text-red-800", icon: XCircle },
      unread: { color: "bg-blue-100 text-blue-800", icon: MessageSquare },
      read: { color: "bg-gray-100 text-gray-800", icon: Eye },
      replied: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
      medium: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      low: { color: "bg-gray-100 text-gray-800", icon: Activity },
    }

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
    const Icon = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    )
  }

  const handleSendReply = () => {
    if (messageReply.trim() && selectedMessage) {
      console.log("Sending reply:", messageReply)
      // Update message status to replied
      const updatedMessage = { ...selectedMessage, status: "replied" }
      setSelectedMessage(updatedMessage)
      setMessageReply("")
      // Here you would typically send the reply to your backend
    }
  }

  const unreadMessagesCount = userMessages.filter((msg) => msg.status === "unread").length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div className="text-white text-lg">Loading Dashboard...</div>
          <div className="text-gray-400 text-sm mt-2">Please wait</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome to the Reach Financial admin panel</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon
          const isPositive = stat.trend === "up"

          return (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-700 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-400 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-blue-600">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-blue-600">
            Users
          </TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-blue-600 relative">
            Messages
            {unreadMessagesCount > 0 && (
              <Badge className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                {unreadMessagesCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recent Transactions</CardTitle>
                  <CardDescription className="text-gray-400">Latest transaction activity</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                    >
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
                          <p className="text-sm font-medium text-white">{transaction.user}</p>
                          <p className="text-xs text-gray-400">{transaction.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">{transaction.amount}</p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Users */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recent Users</CardTitle>
                  <CardDescription className="text-gray-400">Newly registered users</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-green-600 text-white text-xs">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">{user.balance}</p>
                        {getStatusBadge(user.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">All Transactions</CardTitle>
                  <CardDescription className="text-gray-400">Manage and monitor all transactions</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {transaction.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{transaction.user}</p>
                        <p className="text-sm text-gray-400">{transaction.email}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-white">{transaction.amount}</p>
                        <p className="text-sm text-gray-400">{transaction.type}</p>
                      </div>
                      {getStatusBadge(transaction.status)}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-800 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              View detailed information about this transaction
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-gray-400">Transaction ID</Label>
                                  <p className="text-white">{selectedTransaction.id}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Amount</Label>
                                  <p className="text-white">{selectedTransaction.amount}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">User</Label>
                                  <p className="text-white">{selectedTransaction.user}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Status</Label>
                                  {getStatusBadge(selectedTransaction.status)}
                                </div>
                                <div>
                                  <Label className="text-gray-400">Type</Label>
                                  <p className="text-white">{selectedTransaction.type}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Method</Label>
                                  <p className="text-white">{selectedTransaction.method}</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download Receipt
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                                >
                                  Send Email
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">All Users</CardTitle>
                  <CardDescription className="text-gray-400">Manage user accounts and permissions</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search users..." className="pl-10 bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Add User</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-green-600 text-white">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <p className="text-xs text-gray-500">Joined: {user.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-white">{user.balance}</p>
                        <p className="text-sm text-gray-400">{user.transactions} transactions</p>
                      </div>
                      {getStatusBadge(user.status)}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-800 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              View and manage user information
                            </DialogDescription>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-gray-400">User ID</Label>
                                  <p className="text-white">{selectedUser.id}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Name</Label>
                                  <p className="text-white">{selectedUser.name}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Email</Label>
                                  <p className="text-white">{selectedUser.email}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Status</Label>
                                  {getStatusBadge(selectedUser.status)}
                                </div>
                                <div>
                                  <Label className="text-gray-400">Balance</Label>
                                  <p className="text-white">{selectedUser.balance}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Transactions</Label>
                                  <p className="text-white">{selectedUser.transactions}</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button className="bg-blue-600 hover:bg-blue-700">Edit User</Button>
                                <Button
                                  variant="outline"
                                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                                >
                                  View Transactions
                                </Button>
                                <Button variant="destructive">Suspend User</Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    User Messages & Support Tickets
                    {unreadMessagesCount > 0 && (
                      <Badge className="bg-red-600 text-white">{unreadMessagesCount} unread</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-400">Manage customer support and inquiries</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search messages..." className="pl-10 bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Messages</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-purple-600 text-white">
                          {message.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">{message.user}</p>
                          {getPriorityBadge(message.priority)}
                        </div>
                        <p className="text-sm text-gray-400">{message.email}</p>
                        <p className="text-sm font-medium text-white mt-1">{message.subject}</p>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{message.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.date} • {message.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(message.status)}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => setSelectedMessage(message)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              Message Details
                              {selectedMessage && getPriorityBadge(selectedMessage.priority)}
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                              View and respond to customer message
                            </DialogDescription>
                          </DialogHeader>
                          {selectedMessage && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-gray-400">From</Label>
                                  <p className="text-white">{selectedMessage.user}</p>
                                  <p className="text-sm text-gray-400">{selectedMessage.email}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Date</Label>
                                  <p className="text-white">{selectedMessage.date}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Category</Label>
                                  <p className="text-white">{selectedMessage.category}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Status</Label>
                                  {getStatusBadge(selectedMessage.status)}
                                </div>
                              </div>

                              <div>
                                <Label className="text-gray-400">Subject</Label>
                                <p className="text-white font-medium">{selectedMessage.subject}</p>
                              </div>

                              <div>
                                <Label className="text-gray-400">Message</Label>
                                <div className="bg-gray-700/50 p-4 rounded-lg mt-2">
                                  <p className="text-white">{selectedMessage.message}</p>
                                </div>
                              </div>

                              <div>
                                <Label className="text-gray-400">Reply</Label>
                                <Textarea
                                  placeholder="Type your reply here..."
                                  value={messageReply}
                                  onChange={(e) => setMessageReply(e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white mt-2"
                                  rows={4}
                                />
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={handleSendReply}
                                  disabled={!messageReply.trim()}
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Reply
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                                >
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
                                </Button>
                                <Button variant="destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
