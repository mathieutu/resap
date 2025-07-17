'use client'

import { Burger, Container, Group, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLogout } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from './AuthProvider'
import classes from './AdminHeader.module.css'

const links = [
  { link: '/admin', label: 'Dashboard' },
  { link: '/admin/fiches', label: 'Fiches' },
  { link: '/admin/structures', label: 'Structures' },
  { link: '/admin/settings', label: 'Paramètres' },
]

export function AdminHeader() {
  const [opened, { toggle }] = useDisclosure(false)
  const pathname = usePathname()
  const { logout } = useAuth()

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathname === link.link ? '' : undefined}
    >
      {link.label}
    </Link>
  ))

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
          <strong>RESAP Admin</strong>
        </Link>

        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Group>
          <Button
            variant="light"
            color="red"
            size="sm"
            leftSection={<IconLogout size="1rem" />}
            onClick={logout}
            className={classes.logoutButton}
            visibleFrom="xs"
          >
            Déconnexion
          </Button>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Group>
      </Container>
    </header>
  )
}
