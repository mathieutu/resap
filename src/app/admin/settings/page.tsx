'use client'

import {
  Title,
  Card,
  Text,
  Button,
  Stack,
  Group,
  Divider,
} from '@mantine/core'
import { IconKey, IconDatabase, IconSettings } from '@tabler/icons-react'

function SettingsContent() {
  return (
    <>
      <Title order={1} mb="xl">
        Paramètres
      </Title>

      <Stack gap="md">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group mb="md">
            <IconKey size="1.5rem" />
            <Title order={3}>Authentification</Title>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Gérer les paramètres d&apos;authentification de l&apos;interface d&apos;administration.
          </Text>
          <Button variant="light">
            Changer le mot de passe
          </Button>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group mb="md">
            <IconDatabase size="1.5rem" />
            <Title order={3}>Contentful</Title>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Configuration de la connexion à Contentful CMS.
          </Text>
          <Group>
            <Button variant="light">
              Tester la connexion
            </Button>
            <Button variant="outline">
              Configurer les clés API
            </Button>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group mb="md">
            <IconSettings size="1.5rem" />
            <Title order={3}>Général</Title>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Paramètres généraux de l&apos;application.
          </Text>

          <Stack gap="sm">
            <Divider label="Actions de maintenance" labelPosition="left" />
            <Group>
              <Button color="orange" variant="light">
                Synchroniser les données
              </Button>
              <Button color="red" variant="outline">
                Vider le cache
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </>
  )
}

export default function AdminSettings() {
  return (
    <SettingsContent />
  )
}
