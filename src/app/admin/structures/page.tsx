'use client'

import {
  Title,
  Button,
  Table,
  Group,
  Badge,
  ActionIcon,
  Text,
} from '@mantine/core'
import { IconPlus, IconEdit, IconTrash, IconEye } from '@tabler/icons-react'
import Link from 'next/link'

function StructuresContent() {
  // Données factices pour le moment
  const structures = [
    {
      id: 1,
      nom: 'Centre Hospitalier Universitaire',
      type: 'Santé',
      ville: 'Lyon',
      statut: 'Actif',
      derniereMaj: '15/07/2025',
    },
    {
      id: 2,
      nom: 'Foyer d\'Accueil d\'Urgence',
      type: 'Hébergement',
      ville: 'Villeurbanne',
      statut: 'Actif',
      derniereMaj: '14/07/2025',
    },
    {
      id: 3,
      nom: 'Centre d\'Action Sociale',
      type: 'Social',
      ville: 'Lyon',
      statut: 'En révision',
      derniereMaj: '13/07/2025',
    },
  ]

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Actif': return 'green'
      case 'En révision': return 'orange'
      case 'Inactif': return 'gray'
      default: return 'blue'
    }
  }

  return (
    <>
      <Group justify="space-between" mb="xl">
        <Title order={1}>Gestion des structures</Title>
        <Button
          component={Link}
          href="/admin/structures/nouveau"
          leftSection={<IconPlus size="1rem" />}
        >
          Nouvelle structure
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Ville</Table.Th>
            <Table.Th>Statut</Table.Th>
            <Table.Th>Dernière MAJ</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {structures.map((structure) => (
            <Table.Tr key={structure.id}>
              <Table.Td>
                <Text fw={500}>{structure.nom}</Text>
              </Table.Td>
              <Table.Td>
                <Badge variant="light">{structure.type}</Badge>
              </Table.Td>
              <Table.Td>{structure.ville}</Table.Td>
              <Table.Td>
                <Badge color={getStatusColor(structure.statut)} variant="light">
                  {structure.statut}
                </Badge>
              </Table.Td>
              <Table.Td>{structure.derniereMaj}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="light" color="blue">
                    <IconEye size="1rem" />
                  </ActionIcon>
                  <ActionIcon variant="light" color="orange">
                    <IconEdit size="1rem" />
                  </ActionIcon>
                  <ActionIcon variant="light" color="red">
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}

export default function AdminStructures() {
  return (
    <StructuresContent />
  )
}
