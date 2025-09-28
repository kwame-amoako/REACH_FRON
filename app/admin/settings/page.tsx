"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Shield, Users, DollarSign, Bell, Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Reach Financial",
    siteDescription: "Your trusted financial platform",
    contactEmail: "support@reach.com",
    adminEmail: "admin@reach.com",

    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,

    // User Settings
    allowRegistration: true,
    emailVerification: true,
    autoApproveUsers: false,
    defaultUserRole: "user",

    // Financial Settings
    transactionFee: 2.5,
    minDeposit: 10,
    maxDeposit: 10000,
    minWithdrawal: 5,
    maxWithdrawal: 5000,

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    maintenanceMode: false,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert("Settings saved successfully!")
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
          <p className="text-gray-400">Configure platform settings and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="general" className="data-[state=active]:bg-blue-600">
            <Settings className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-blue-600">
            <Users className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="financial" className="data-[state=active]:bg-blue-600">
            <DollarSign className="w-4 h-4 mr-2" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">General Settings</CardTitle>
              <CardDescription className="text-gray-400">Basic platform configuration and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="siteName" className="text-gray-300">
                    Site Name
                  </Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail" className="text-gray-300">
                    Contact Email
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="siteDescription" className="text-gray-300">
                  Site Description
                </Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="adminEmail" className="text-gray-300">
                  Admin Email
                </Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure security policies and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-400">Require 2FA for admin accounts</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="sessionTimeout" className="text-gray-300">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="maxLoginAttempts" className="text-gray-300">
                    Max Login Attempts
                  </Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleSettingChange("maxLoginAttempts", Number.parseInt(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="passwordMinLength" className="text-gray-300">
                  Minimum Password Length
                </Label>
                <Input
                  id="passwordMinLength"
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => handleSettingChange("passwordMinLength", Number.parseInt(e.target.value))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">User Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure user registration and account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Allow User Registration</Label>
                  <p className="text-sm text-gray-400">Allow new users to register accounts</p>
                </div>
                <Switch
                  checked={settings.allowRegistration}
                  onCheckedChange={(checked) => handleSettingChange("allowRegistration", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Email Verification Required</Label>
                  <p className="text-sm text-gray-400">Require email verification for new accounts</p>
                </div>
                <Switch
                  checked={settings.emailVerification}
                  onCheckedChange={(checked) => handleSettingChange("emailVerification", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Auto-Approve Users</Label>
                  <p className="text-sm text-gray-400">Automatically approve new user accounts</p>
                </div>
                <Switch
                  checked={settings.autoApproveUsers}
                  onCheckedChange={(checked) => handleSettingChange("autoApproveUsers", checked)}
                />
              </div>

              <div>
                <Label htmlFor="defaultUserRole" className="text-gray-300">
                  Default User Role
                </Label>
                <Select
                  value={settings.defaultUserRole}
                  onValueChange={(value) => handleSettingChange("defaultUserRole", value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Financial Settings</CardTitle>
              <CardDescription className="text-gray-400">Configure transaction limits and fees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="transactionFee" className="text-gray-300">
                  Transaction Fee (%)
                </Label>
                <Input
                  id="transactionFee"
                  type="number"
                  step="0.1"
                  value={settings.transactionFee}
                  onChange={(e) => handleSettingChange("transactionFee", Number.parseFloat(e.target.value))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="minDeposit" className="text-gray-300">
                    Minimum Deposit ($)
                  </Label>
                  <Input
                    id="minDeposit"
                    type="number"
                    value={settings.minDeposit}
                    onChange={(e) => handleSettingChange("minDeposit", Number.parseInt(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="maxDeposit" className="text-gray-300">
                    Maximum Deposit ($)
                  </Label>
                  <Input
                    id="maxDeposit"
                    type="number"
                    value={settings.maxDeposit}
                    onChange={(e) => handleSettingChange("maxDeposit", Number.parseInt(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="minWithdrawal" className="text-gray-300">
                    Minimum Withdrawal ($)
                  </Label>
                  <Input
                    id="minWithdrawal"
                    type="number"
                    value={settings.minWithdrawal}
                    onChange={(e) => handleSettingChange("minWithdrawal", Number.parseInt(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="maxWithdrawal" className="text-gray-300">
                    Maximum Withdrawal ($)
                  </Label>
                  <Input
                    id="maxWithdrawal"
                    type="number"
                    value={settings.maxWithdrawal}
                    onChange={(e) => handleSettingChange("maxWithdrawal", Number.parseInt(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Notification Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure system notifications and maintenance mode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Email Notifications</Label>
                  <p className="text-sm text-gray-400">Send email notifications to users</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">SMS Notifications</Label>
                  <p className="text-sm text-gray-400">Send SMS notifications to users</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Push Notifications</Label>
                  <p className="text-sm text-gray-400">Send push notifications to mobile apps</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Maintenance Mode</Label>
                  <p className="text-sm text-gray-400">Enable maintenance mode for the platform</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
