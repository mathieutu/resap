import {
  Title,
  Button,
  Group,
  Alert,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { getAllFichesForAdmin } from '@/services/contentful-management'
import { FichesTable } from '@/components/Admin/FichesTable'

export default async function AdminFiches() {
  let fiches
  try {
    fiches = await getAllFichesForAdmin()
  } catch (_error) {
    return (
      <Alert title="Erreur" color="red">
        Erreur lors du chargement des fiches depuis Contentful
      </Alert>
    )
  }

  return (
    <>
      <Group justify="space-between" mb="xl">
        <Title order={1}>Gestion des fiches</Title>
        <Button
          component={Link}
          href="/admin/fiches/nouveau"
          leftSection={<IconPlus size="1rem" />}
        >
          Nouvelle fiche
        </Button>
      </Group>

      <FichesTable fiches={fiches} />
    </>
  )
}
