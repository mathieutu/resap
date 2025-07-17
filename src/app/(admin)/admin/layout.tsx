'use client'

import { MantineProvider, ColorSchemeScript, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { AuthProvider } from '@/components/Admin/AuthProvider'
import { AdminPage } from '@/components/Admin/AdminPage'

const theme = createTheme({
  primaryColor: 'blue',
})

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider theme={theme}>
        <Notifications />
        <AuthProvider>
          <AdminPage>
            {children}
          </AdminPage>
        </AuthProvider>
      </MantineProvider>
    </>
  )
}
