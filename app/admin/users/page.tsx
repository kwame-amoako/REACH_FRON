"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MoreHorizontal, UserPlus, Download, Eye, Edit, Ban, CheckCircle, XCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      balance: 1250.5,
      status: "active",
      role: "user",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      totalTransactions: 45,
      kycStatus: "verified",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      phone: "+1234567891",
      balance: 850.25,
      status: "active",
      role: "premium",
      joinDate: "2024-01-20",
      lastActive: "1 day ago",
      totalTransactions: 32,
      kycStatus: "verified",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1234567892",
      balance: 0.0,
      status: "blocked",
      role: "user",
      joinDate: "2024-02-01",
      lastActive: "1 week ago",
      totalTransactions: 12,
      kycStatus: "pending",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1234567893",
      balance: 2100.75,
      status: "active",
      role: "vip",
      joinDate: "2023-12-10",
      lastActive: "30 mins ago",
      totalTransactions: 89,
      kycStatus: "verified",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      phone: "+1234567894",
      balance: 450.0,
      status: "suspended",
      role: "user",
      joinDate: "2024-01-25",
      lastActive: "3 days ago",
      totalTransactions: 23,
      kycStatus: "rejected",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "blocked":
        return "bg-red-600"
      case "suspended":
        return "bg-yellow-600"
      case "pending":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "vip":
        return "bg-purple-600"
      case "premium":
        return "bg-blue-600"
      case "user":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getKycColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-400"
      case "pending":
        return "text-yellow-400"
      case "rejected":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage and monitor all platform users</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
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
            <div className="text-2xl font-bold text-white">12,847</div>
            <p className="text-sm text-gray-400">Total Users</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-400">11,234</div>
            <p className="text-sm text-gray-400">Active Users</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-400">1,456</div>
            <p className="text-sm text-gray-400">Pending KYC</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-400">157</div>
            <p className="text-sm text-gray-400">Blocked Users</p>
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
                  placeholder="Search users by name or email..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Users ({filteredUsers.length})</CardTitle>
          <CardDescription className="text-gray-400">
            Complete list of platform users with their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Balance</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">KYC</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Last Active</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white">{user.email}</p>
                        <p className="text-sm text-gray-400">{user.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-white">{formatCurrency(user.balance)}</p>
                      <p className="text-sm text-gray-400">{user.totalTransactions} transactions</p>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusColor(user.status)} text-white`}>{user.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${getRoleColor(user.role)} text-white`}>{user.role}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {user.kycStatus === "verified" && <CheckCircle className="w-4 h-4 text-green-400 mr-1" />}
                        {user.kycStatus === "rejected" && <XCircle className="w-4 h-4 text-red-400 mr-1" />}
                        <span className={`text-sm ${getKycColor(user.kycStatus)}`}>{user.kycStatus}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-400">{user.lastActive}</p>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-700 border-gray-600">
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-600">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-600">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:bg-gray-600">
                            <Ban className="w-4 h-4 mr-2" />
                            Block User
                          </DropdownMenuItem>
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
    </div>
  )
}
