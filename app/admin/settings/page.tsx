"use client"

import { useAuth } from "@/components/admin/auth-provider"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SettingsContent } from "@/components/admin/settings-content"

export default function SettingsPage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64">
        <SettingsContent />
      </main>
    </div>
  )
}
