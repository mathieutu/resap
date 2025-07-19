'use client'

import { Title, Text, Grid, Card, Group, Badge } from '@mantine/core'
import { IconFileText, IconUsers, IconSettings } from '@tabler/icons-react'

function DashboardContent() {
  return (
    <>
      <Title order={1} mb="xl">
        Tableau de bord
      </Title>

      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Fiches</Text>
              <IconFileText size="1.2rem" />
            </Group>
            <Text size="xl" fw={700} c="blue">
              156
            </Text>
            <Text size="sm" c="dimmed">
              Fiches publiées
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Structures</Text>
              <IconUsers size="1.2rem" />
            </Group>
            <Text size="xl" fw={700} c="green">
              89
            </Text>
            <Text size="sm" c="dimmed">
              Structures référencées
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>En attente</Text>
              <IconSettings size="1.2rem" />
            </Group>
            <Text size="xl" fw={700} c="orange">
              12
            </Text>
            <Text size="sm" c="dimmed">
              Modérations en attente
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Title order={2} mt="xl" mb="md">
        Actions récentes
      </Title>

      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group justify="space-between" mb="xs">
          <Text fw={500}>Nouvelle fiche ajoutée</Text>
          <Badge color="green" variant="light">
            Aujourd&apos;hui
          </Badge>
        </Group>
        <Text size="sm" c="dimmed">
          &quot;Centre d&apos;accueil d&apos;urgence&quot; - Ajouté par l&apos;administrateur
        </Text>
      </Card>
    </>
  )
}

export default function AdminDashboard() {
  return (
    <DashboardContent />
  )
}
