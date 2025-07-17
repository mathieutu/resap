'use client'

import { AppShell, Burger, Group, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLogout } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from './AuthProvider'
import classes from './AdminHeader.module.css'

interface AdminLayoutProps {
  children: React.ReactNode
}

const links = [
  { link: '/admin', label: 'Dashboard' },
  { link: '/admin/fiches', label: 'Fiches' },
  { link: '/admin/structures', label: 'Structures' },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const [opened, { toggle }] = useDisclosure()
  const pathname = usePathname()
  const { logout } = useAuth()

  const headerItems = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathname === link.link ? '' : undefined}
    >
      {link.label}
    </Link>
  ))

  const navbarItems = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.navbarLink}
      data-active={pathname === link.link ? '' : undefined}
      onClick={() => toggle()} // Ferme la navbar sur mobile après clic
    >
      {link.label}
    </Link>
  ))

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <strong>RESAP Admin</strong>
            </Link>
          </Group>

          <Group gap={5} visibleFrom="sm">
            {headerItems}
          </Group>

          <Button
            variant="light"
            color="red"
            size="sm"
            leftSection={<IconLogout size="1rem" />}
            onClick={logout}
            visibleFrom="xs"
          >
            Déconnexion
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Group mb="md" justify="space-between">
          <strong>Navigation</strong>
          <Button
            variant="light"
            color="red"
            size="xs"
            leftSection={<IconLogout size="0.8rem" />}
            onClick={logout}
            hiddenFrom="xs"
          >
            Déconnexion
          </Button>
        </Group>
        {navbarItems}
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
