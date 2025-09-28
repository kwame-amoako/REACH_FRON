"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Gift,
  ShoppingCart,
  Gamepad2,
  Music,
  Smartphone,
  Upload,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GiftCardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Dialog states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<any>(null)

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    denominations: [] as number[],
    exchangeRate: 0,
    image: null as File | null,
  })

  const [giftCards, setGiftCards] = useState([
    {
      id: 1,
      name: "Amazon Gift Card",
      category: "E-commerce",
      denominations: [25, 50, 100, 200],
      exchangeRate: 0.85,
      status: "active",
      totalSold: 1247,
      revenue: 105995,
      remaining: 150,
      icon: ShoppingCart,
      description: "Shop millions of products on Amazon",
    },
    {
      id: 2,
      name: "iTunes Gift Card",
      category: "Entertainment",
      denominations: [15, 25, 50, 100],
      exchangeRate: 0.8,
      status: "active",
      totalSold: 892,
      revenue: 71360,
      remaining: 89,
      icon: Music,
      description: "Buy music, movies, and apps on iTunes",
    },
    {
      id: 3,
      name: "Google Play Gift Card",
      category: "Entertainment",
      denominations: [10, 25, 50, 100],
      exchangeRate: 0.82,
      status: "active",
      totalSold: 1156,
      revenue: 94792,
      remaining: 203,
      icon: Smartphone,
      description: "Purchase apps, games, and content on Google Play",
    },
    {
      id: 4,
      name: "Steam Gift Card",
      category: "Gaming",
      denominations: [20, 50, 100],
      exchangeRate: 0.88,
      status: "active",
      totalSold: 634,
      revenue: 55792,
      remaining: 45,
      icon: Gamepad2,
      description: "Buy games and content on Steam",
    },
    {
      id: 5,
      name: "Walmart Gift Card",
      category: "E-commerce",
      denominations: [25, 50, 100, 200],
      exchangeRate: 0.83,
      status: "inactive",
      totalSold: 423,
      revenue: 35109,
      remaining: 0,
      icon: ShoppingCart,
      description: "Shop at Walmart stores and online",
    },
    {
      id: 6,
      name: "Xbox Gift Card",
      category: "Gaming",
      denominations: [25, 50, 100],
      exchangeRate: 0.86,
      status: "active",
      totalSold: 789,
      revenue: 67874,
      remaining: 112,
      icon: Gamepad2,
      description: "Buy games and content on Xbox",
    },
  ])

  const handleView = (card: any) => {
    setSelectedCard(card)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (card: any) => {
    setSelectedCard(card)
    setEditForm({
      name: card.name,
      denominations: card.denominations,
      exchangeRate: card.exchangeRate,
      image: null,
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (card: any) => {
    setSelectedCard(card)
    setIsDeleteDialogOpen(true)
  }

  const executeDelete = () => {
    if (!selectedCard) return

    setGiftCards((prev) => prev.filter((card) => card.id !== selectedCard.id))
    setIsDeleteDialogOpen(false)
    setSelectedCard(null)
    alert("Gift card deleted successfully!")
  }

  const executeEdit = () => {
    if (!selectedCard) return

    setGiftCards((prev) =>
      prev.map((card) =>
        card.id === selectedCard.id
          ? {
              ...card,
              name: editForm.name,
              denominations: editForm.denominations,
              exchangeRate: editForm.exchangeRate,
            }
          : card,
      ),
    )

    setIsEditDialogOpen(false)
    setSelectedCard(null)
    setEditForm({ name: "", denominations: [], exchangeRate: 0, image: null })
    alert("Gift card updated successfully!")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setEditForm({ ...editForm, image: file })
    }
  }

  const addDenomination = (value: string) => {
    const num = Number.parseInt(value)
    if (num && !editForm.denominations.includes(num)) {
      setEditForm({
        ...editForm,
        denominations: [...editForm.denominations, num].sort((a, b) => a - b),
      })
    }
  }

  const removeDenomination = (value: number) => {
    setEditForm({
      ...editForm,
      denominations: editForm.denominations.filter((d) => d !== value),
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "inactive":
        return "bg-red-600"
      case "pending":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "E-commerce":
        return "bg-blue-600"
      case "Entertainment":
        return "bg-purple-600"
      case "Gaming":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getRemainingColor = (remaining: number) => {
    if (remaining === 0) return "text-red-400"
    if (remaining < 50) return "text-yellow-400"
    return "text-green-400"
  }

  const filteredGiftCards = giftCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || card.category === categoryFilter
    const matchesStatus = statusFilter === "all" || card.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const totalRevenue = giftCards.reduce((sum, card) => sum + card.revenue, 0)
  const totalSold = giftCards.reduce((sum, card) => sum + card.totalSold, 0)
  const activeCards = giftCards.filter((card) => card.status === "active").length
  const categories = [...new Set(giftCards.map((card) => card.category))].length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gift Card Management</h1>
          <p className="text-gray-400">Manage gift card inventory and sales</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Gift Card
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
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</div>
                <p className="text-sm text-gray-400">Total Revenue</p>
              </div>
              <Gift className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-400">{totalSold.toLocaleString()}</div>
                <p className="text-sm text-gray-400">Cards Sold</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-400">{activeCards}</div>
                <p className="text-sm text-gray-400">Active Cards</p>
              </div>
              <Eye className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-400">{categories}</div>
                <p className="text-sm text-gray-400">Categories</p>
              </div>
              <Gift className="w-8 h-8 text-yellow-400" />
            </div>
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
                  placeholder="Search gift cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGiftCards.map((card) => (
          <Card key={card.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{card.name}</CardTitle>
                    <Badge className={`${getCategoryColor(card.category)} text-white text-xs`}>{card.category}</Badge>
                  </div>
                </div>
                <Badge className={`${getStatusColor(card.status)} text-white`}>{card.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">{card.description}</p>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Denominations</p>
                  <div className="flex flex-wrap gap-1">
                    {card.denominations.map((amount) => (
                      <Badge key={amount} variant="outline" className="border-gray-600 text-gray-300">
                        ${amount}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Exchange Rate</p>
                    <p className="text-white font-medium">{(card.exchangeRate * 100).toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Remaining</p>
                    <p className={`font-medium ${getRemainingColor(card.remaining)}`}>
                      {card.remaining.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Revenue</p>
                  <p className="text-green-400 font-medium">{formatCurrency(card.revenue)}</p>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  onClick={() => handleView(card)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  onClick={() => handleEdit(card)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-red-400 hover:bg-gray-700 bg-transparent"
                  onClick={() => handleDelete(card)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Gift Card Details</DialogTitle>
            <DialogDescription className="text-gray-400">Complete information about this gift card</DialogDescription>
          </DialogHeader>

          {selectedCard && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                  <selectedCard.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedCard.name}</h3>
                  <Badge className={`${getCategoryColor(selectedCard.category)} text-white`}>
                    {selectedCard.category}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-400">Cards Remaining</p>
                  <p className={`text-2xl font-bold ${getRemainingColor(selectedCard.remaining)}`}>
                    {selectedCard.remaining.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-400">Total Sold</p>
                  <p className="text-2xl font-bold text-blue-400">{selectedCard.totalSold.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-400">Exchange Rate</p>
                  <p className="text-2xl font-bold text-white">{(selectedCard.exchangeRate * 100).toFixed(0)}%</p>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(selectedCard.revenue)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Available Denominations</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCard.denominations.map((amount: number) => (
                    <Badge key={amount} className="bg-blue-600 text-white">
                      ${amount}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                  className="border-gray-600 text-gray-300 bg-transparent"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Gift Card</DialogTitle>
            <DialogDescription className="text-gray-400">Update gift card details and pricing</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="editName" className="text-gray-300">
                Gift Card Name
              </Label>
              <Input
                id="editName"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="editRate" className="text-gray-300">
                Exchange Rate (%)
              </Label>
              <Input
                id="editRate"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={editForm.exchangeRate}
                onChange={(e) => setEditForm({ ...editForm, exchangeRate: Number.parseFloat(e.target.value) })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label className="text-gray-300">Denominations</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editForm.denominations.map((amount) => (
                  <Badge
                    key={amount}
                    className="bg-blue-600 text-white cursor-pointer hover:bg-red-600"
                    onClick={() => removeDenomination(amount)}
                  >
                    ${amount} ×
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Add denomination"
                  className="bg-gray-700 border-gray-600 text-white"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addDenomination((e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ""
                    }
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addDenomination(input.value)
                    input.value = ""
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="editImage" className="text-gray-300">
                Update Image
              </Label>
              <div className="mt-2">
                <label className="flex items-center justify-center w-full h-24 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-700/50">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-400">
                      {editForm.image ? editForm.image.name : "Click to upload new image"}
                    </p>
                  </div>
                  <input id="editImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-gray-600 text-gray-300 bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={executeEdit} className="bg-blue-600 hover:bg-blue-700">
                Update Gift Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete Gift Card</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this gift card? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedCard && (
            <div className="space-y-4">
              <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <selectedCard.icon className="w-8 h-8 text-red-400" />
                  <div>
                    <h4 className="font-medium text-white">{selectedCard.name}</h4>
                    <p className="text-sm text-gray-400">{selectedCard.category}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="border-gray-600 text-gray-300 bg-transparent"
                >
                  Cancel
                </Button>
                <Button onClick={executeDelete} className="bg-red-600 hover:bg-red-700">
                  Delete Gift Card
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
