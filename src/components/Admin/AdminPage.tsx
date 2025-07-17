'use client'

import { useAuth } from '@/components/Admin/AuthProvider'
import { LoginForm } from '@/components/Admin/LoginForm'
import { AdminLayout } from '@/components/Admin/AdminLayout'

interface AdminPageProps {
  children: React.ReactNode
}

export function AdminPage({ children }: AdminPageProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <AdminLayout>{children}</AdminLayout>
}
