'use client'

import { useAuth } from '@/components/admin/auth-provider'
import { AdminLogin } from '@/components/admin/admin-login'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) {
    return null
  }

  return <AdminLogin />
}
