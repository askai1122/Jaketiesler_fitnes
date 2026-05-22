'use client'

import { useAuth } from '@/components/admin/auth-provider'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import ClientsContent from '@/components/admin/clients-content'
import { redirect } from 'next/navigation'

export default function ClientsPage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:ml-64 p-6 pt-20 lg:pt-6">
        <ClientsContent />
      </main>
    </div>
  )
}
