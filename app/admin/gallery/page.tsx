"use client"

import { useAuth } from "@/components/admin/auth-provider"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { GalleryContent } from "@/components/admin/gallery-content"

export default function GalleryPage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64">
        <GalleryContent />
      </main>
    </div>
  )
}
