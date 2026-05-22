"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, User, Bell, Shield, Palette, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export function SettingsContent() {
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: "Marcus Rivera",
    email: "marcus@elitetraining.com",
    phone: "+1 (555) 123-4567",
    bio: "NASM Certified Personal Trainer with 10+ years of experience specializing in body transformation and athletic performance.",
    location: "Los Angeles, CA"
  })

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    smsBookings: true,
    emailReminders: true,
    marketingEmails: false
  })

  const [siteSettings, setSiteSettings] = useState({
    siteName: "Elite Training",
    tagline: "Transform Your Body. Elevate Your Life.",
    primaryColor: "#D4AF37",
    enableBooking: true,
    requireDeposit: true,
    depositAmount: "50"
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and site preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="site" className="gap-2">
            <Globe className="h-4 w-4" />
            Site Settings
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and bio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                    MR
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Booking Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email when clients book sessions</p>
                  </div>
                  <Switch
                    checked={notifications.emailBookings}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailBookings: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">SMS Booking Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive text messages for new bookings</p>
                  </div>
                  <Switch
                    checked={notifications.smsBookings}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsBookings: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Reminders</p>
                    <p className="text-sm text-muted-foreground">Send session reminders to clients</p>
                  </div>
                  <Switch
                    checked={notifications.emailReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailReminders: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">Receive tips and updates from us</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="site" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Customize your public website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Site Name</Label>
                    <Input
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        value={siteSettings.primaryColor}
                        onChange={(e) => setSiteSettings({ ...siteSettings, primaryColor: e.target.value })}
                      />
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: siteSettings.primaryColor }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input
                    value={siteSettings.tagline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Enable Online Booking</p>
                    <p className="text-sm text-muted-foreground">Allow clients to book sessions online</p>
                  </div>
                  <Switch
                    checked={siteSettings.enableBooking}
                    onCheckedChange={(checked) => setSiteSettings({ ...siteSettings, enableBooking: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Require Deposit</p>
                    <p className="text-sm text-muted-foreground">Require payment to confirm booking</p>
                  </div>
                  <Switch
                    checked={siteSettings.requireDeposit}
                    onCheckedChange={(checked) => setSiteSettings({ ...siteSettings, requireDeposit: checked })}
                  />
                </div>

                {siteSettings.requireDeposit && (
                  <div className="space-y-2">
                    <Label>Deposit Amount ($)</Label>
                    <Input
                      type="number"
                      value={siteSettings.depositAmount}
                      onChange={(e) => setSiteSettings({ ...siteSettings, depositAmount: e.target.value })}
                      className="w-32"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button>Update Password</Button>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-foreground mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Chrome on MacOS</p>
                        <p className="text-sm text-muted-foreground">Los Angeles, CA - Current session</p>
                      </div>
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Safari on iPhone</p>
                        <p className="text-sm text-muted-foreground">Los Angeles, CA - 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
