"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Plus, Edit, Trash2, Users, Lock } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  isSystem: boolean
  color: string
}

export default function RolesPage() {
  const [permissions] = useState<Permission[]>([
    // User Management
    { id: "users.view", name: "View Users", description: "View user profiles and information", category: "Users" },
    { id: "users.create", name: "Create Users", description: "Create new user accounts", category: "Users" },
    { id: "users.edit", name: "Edit Users", description: "Modify user profiles and settings", category: "Users" },
    { id: "users.delete", name: "Delete Users", description: "Delete user accounts", category: "Users" },
    { id: "users.block", name: "Block Users", description: "Block or suspend user accounts", category: "Users" },

    // Transaction Management
    {
      id: "transactions.view",
      name: "View Transactions",
      description: "View transaction history",
      category: "Transactions",
    },
    {
      id: "transactions.approve",
      name: "Approve Transactions",
      description: "Approve pending transactions",
      category: "Transactions",
    },
    {
      id: "transactions.refund",
      name: "Process Refunds",
      description: "Process transaction refunds",
      category: "Transactions",
    },
    {
      id: "transactions.export",
      name: "Export Transactions",
      description: "Export transaction data",
      category: "Transactions",
    },

    // Gift Card Management
    { id: "giftcards.view", name: "View Gift Cards", description: "View gift card inventory", category: "Gift Cards" },
    { id: "giftcards.create", name: "Create Gift Cards", description: "Add new gift cards", category: "Gift Cards" },
    { id: "giftcards.edit", name: "Edit Gift Cards", description: "Modify gift card details", category: "Gift Cards" },
    { id: "giftcards.delete", name: "Delete Gift Cards", description: "Remove gift cards", category: "Gift Cards" },

    // Role Management
    { id: "roles.view", name: "View Roles", description: "View system roles", category: "Roles" },
    { id: "roles.create", name: "Create Roles", description: "Create new roles", category: "Roles" },
    { id: "roles.edit", name: "Edit Roles", description: "Modify role permissions", category: "Roles" },
    { id: "roles.delete", name: "Delete Roles", description: "Delete custom roles", category: "Roles" },

    // System Settings
    { id: "system.settings", name: "System Settings", description: "Access system configuration", category: "System" },
    { id: "system.logs", name: "View Logs", description: "Access system logs", category: "System" },
    { id: "system.backup", name: "System Backup", description: "Create and restore backups", category: "System" },
  ])

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "super_admin",
      name: "Super Admin",
      description: "Full system access with all permissions",
      permissions: permissions.map((p) => p.id),
      userCount: 1,
      isSystem: true,
      color: "bg-purple-600",
    },
    {
      id: "support",
      name: "Support Agent",
      description: "Customer support with limited access",
      permissions: [
        "users.view",
        "users.edit",
        "users.block",
        "transactions.view",
        "transactions.refund",
        "giftcards.view",
      ],
      userCount: 5,
      isSystem: true,
      color: "bg-blue-600",
    },
    {
      id: "moderator",
      name: "Moderator",
      description: "Content moderation and user management",
      permissions: ["users.view", "users.edit", "users.block", "transactions.view", "giftcards.view", "giftcards.edit"],
      userCount: 3,
      isSystem: false,
      color: "bg-green-600",
    },
  ])

  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  const handleCreateRole = () => {
    if (!newRole.name.trim()) {
      alert("Please enter a role name")
      return
    }

    const role: Role = {
      id: `role_${Date.now()}`,
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      userCount: 0,
      isSystem: false,
      color: "bg-gray-600",
    }

    setRoles([...roles, role])
    setNewRole({ name: "", description: "", permissions: [] })
    setIsCreateRoleOpen(false)
  }

  const handlePermissionToggle = (permissionId: string) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId)
    if (role?.isSystem) {
      alert("Cannot delete system roles")
      return
    }

    if (confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((r) => r.id !== roleId))
    }
  }

  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, Permission[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Roles & Permissions</h1>
          <p className="text-gray-400">Manage user roles and access permissions</p>
        </div>
        <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription className="text-gray-400">
                Define a new role with specific permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roleName" className="text-gray-300">
                  Role Name
                </Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <Label htmlFor="roleDescription" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="roleDescription"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter role description"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-gray-300 mb-3 block">Permissions</Label>
                <div className="space-y-4">
                  {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                    <div key={category} className="border border-gray-600 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
                        {category}
                      </h4>
                      <div className="space-y-2">
                        {categoryPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-start space-x-3">
                            <Checkbox
                              id={permission.id}
                              checked={newRole.permissions.includes(permission.id)}
                              onCheckedChange={() => handlePermissionToggle(permission.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <Label htmlFor={permission.id} className="text-gray-300 font-medium cursor-pointer">
                                {permission.name}
                              </Label>
                              <p className="text-sm text-gray-400">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateRoleOpen(false)}
                  className="border-gray-600 text-gray-300 bg-transparent"
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateRole} className="bg-blue-600 hover:bg-blue-700">
                  Create Role
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{roles.length}</div>
                <p className="text-sm text-gray-400">Total Roles</p>
              </div>
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-400">{roles.filter((r) => r.isSystem).length}</div>
                <p className="text-sm text-gray-400">System Roles</p>
              </div>
              <Lock className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">{permissions.length}</div>
                <p className="text-sm text-gray-400">Total Permissions</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${role.color}`} />
                  <CardTitle className="text-white">{role.name}</CardTitle>
                </div>
                {role.isSystem && <Badge className="bg-purple-600 text-white text-xs">System</Badge>}
              </div>
              <CardDescription className="text-gray-400">{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Users</span>
                  <span className="text-white font-medium">{role.userCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Permissions</span>
                  <span className="text-white font-medium">{role.permissions.length}</span>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Permission Categories:</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.keys(groupedPermissions).map((category) => {
                      const hasPermissionInCategory = role.permissions.some((permId) =>
                        groupedPermissions[category].some((perm) => perm.id === permId),
                      )
                      return hasPermissionInCategory ? (
                        <Badge key={category} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          {category}
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {!role.isSystem && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                      className="border-gray-600 text-red-400 hover:bg-gray-700 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permissions Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">All Permissions</CardTitle>
          <CardDescription className="text-gray-400">Complete list of available system permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryPermissions.map((permission) => (
                    <div key={permission.id} className="p-3 bg-gray-700/50 rounded-lg">
                      <h4 className="font-medium text-white">{permission.name}</h4>
                      <p className="text-sm text-gray-400">{permission.description}</p>
                      <p className="text-xs text-gray-500 mt-1">ID: {permission.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
