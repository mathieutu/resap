'use client'

import {
  Group,
  Badge,
  Text,
  Alert,
  Table,
  Select,
  TextInput,
  Button,
} from '@mantine/core'
import { IconEdit, IconEye, IconChevronUp, IconChevronDown, IconSearch, IconSelector } from '@tabler/icons-react'
import Link from 'next/link'
import { categories } from '@/data/categories'
import { useState } from 'react'
import { type FicheWithStatus } from '@/services/contentful-management'

type SortField = 'titre' | 'updatedAt'
type SortDirection = 'asc' | 'desc'

interface FichesTableProps {
  fiches: FicheWithStatus[]
}
const normalizeText = (text: string) => text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (accents)

const getCategoryName = (categorieSlug: string) => categories[categorieSlug as keyof typeof categories]?.name || categorieSlug
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR')

export const ficheStatuses = {
  published: 'Publié',
  updated: 'Mis à jour',
  archived: 'Archivé',
  draft: 'Brouillon',
  unknown: 'Inconnu',
} satisfies Record<FicheWithStatus['status'], string>

const StatusBadge = ({ fiche }: { fiche: FicheWithStatus }) => {
  if (fiche.status === 'published') return <Badge color="green" variant="light" size="sm">{ficheStatuses.published}</Badge>
  if (fiche.status === 'updated') return <Badge color="yellow" variant="light" size="sm">{ficheStatuses.updated}</Badge>
  if (fiche.status === 'archived') return <Badge color="gray" variant="light" size="sm">{ficheStatuses.archived}</Badge>
  if (fiche.status === 'draft') return <Badge color="orange" variant="light" size="sm">{ficheStatuses.draft}</Badge>
  return <Badge color="red" variant="light" size="sm">{ficheStatuses.unknown}</Badge>
}

export function FichesTable({ fiches }: FichesTableProps) {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('updatedAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const getSortIcon = (field: SortField) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? <IconChevronUp size="0.9rem" /> : <IconChevronDown size="0.9rem" />
    }
    return <IconSelector size="0.9rem" opacity={0.5} />
  }

  // Filtrage et tri des fiches
  const filteredAndSortedFiches = fiches
    .filter((fiche) => {
      if (searchQuery && !normalizeText(fiche.titre).includes(normalizeText(searchQuery))) {
        return false
      }

      // Filtre par catégorie
      if (categoryFilter && fiche.categorie !== categoryFilter) return false

      // Filtre par statut
      if (statusFilter) {
        if (statusFilter !== fiche.status) return false
      }

      return true
    })
    .toSorted((a, b) => {
      const directionFactor = sortDirection === 'asc' ? 1 : -1

      if (sortField === 'titre') {
        return a.titre.localeCompare(b.titre) * directionFactor
      }

      if (sortField === 'updatedAt') {
        return (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * directionFactor
      }

      return 0
    })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  // Options pour les filtres
  const categoryOptions = [
    { value: '', label: 'Toutes les catégories' },
    ...Object.entries(categories).map(([key, category]) => ({
      value: key,
      label: category.name,
    })),
  ]

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    ...Object.entries(ficheStatuses).map(([value, label]) => ({ value, label })),
  ]

  return (
    <>
      {/* Barre de recherche */}
      <TextInput
        placeholder="Rechercher par titre..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        leftSection={<IconSearch size="1rem" />}
        mb="md"
        style={{ maxWidth: 400 }}
      />

      {/* Filtres */}
      <Group mb="lg" justify="space-between">
        <Group>
          <Select
            placeholder="Filtrer par catégorie"
            data={categoryOptions}
            value={categoryFilter || ''}
            onChange={(value) => setCategoryFilter(value || null)}
            clearable
            style={{ minWidth: 200 }}
          />
          <Select
            placeholder="Filtrer par statut"
            data={statusOptions}
            value={statusFilter || ''}
            onChange={(value) => setStatusFilter(value || null)}
            clearable
            style={{ minWidth: 180 }}
          />
        </Group>

        {/* Compteur de fiches */}
        <Text size="sm" c="dimmed">
          {filteredAndSortedFiches.length} fiche{filteredAndSortedFiches.length > 1 ? 's' : ''} affichée{filteredAndSortedFiches.length > 1 ? 's' : ''} sur {fiches.length} au total
        </Text>
      </Group>

      {filteredAndSortedFiches.length === 0 ? (
        <Alert title="Aucune fiche trouvée" color="blue">
          {fiches.length === 0
            ? 'Il n\'y a actuellement aucune fiche dans Contentful.'
            : `Aucune fiche ne correspond aux critères de recherche${searchQuery ? ` "${searchQuery}"` : ''}${categoryFilter || statusFilter ? ' et filtres' : ''} sélectionnés.`}
        </Alert>
      ) : (
        <Table striped highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th
                style={{ cursor: 'pointer', width: '40%' }}
                onClick={() => handleSort('titre')}
              >
                <Group gap="xs" wrap="nowrap">
                  Titre
                  {getSortIcon('titre')}
                </Group>
              </Table.Th>
              <Table.Th style={{ width: '20%' }}>Catégorie</Table.Th>
              <Table.Th style={{ width: '12%' }}>Statut</Table.Th>
              <Table.Th
                style={{ cursor: 'pointer', width: '15%' }}
                onClick={() => handleSort('updatedAt')}
              >
                <Group gap="xs" wrap="nowrap">
                  Dernière MAJ
                  {getSortIcon('updatedAt')}
                </Group>
              </Table.Th>
              <Table.Th style={{ width: '13%' }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredAndSortedFiches.map((fiche) => (
              <Table.Tr key={fiche.id}>
                <Table.Td style={{ width: '40%' }}>
                  <Text size="sm" truncate title={fiche.titre}>{fiche.titre}</Text>
                </Table.Td>
                <Table.Td style={{ width: '20%' }}>
                  <Badge variant="light" size="sm">{getCategoryName(fiche.categorie)}</Badge>
                </Table.Td>
                <Table.Td style={{ width: '12%' }}>
                  <StatusBadge fiche={fiche} />
                </Table.Td>
                <Table.Td style={{ width: '15%', whiteSpace: 'nowrap' }}>{formatDate(fiche.updatedAt)}</Table.Td>
                <Table.Td style={{ width: '13%' }}>
                  <Group gap="xs" wrap="nowrap">
                    <Button
                      variant="light"
                      size="compact-xs"
                      color="blue"
                      component={Link}
                      href={`/fiches/${fiche.categorie}/${fiche.slug}`}
                      target="_blank"
                      leftSection={<IconEye size="1rem" />}
                    >
                      Voir
                    </Button>
                    <Button
                      variant="light"
                      size="compact-xs"
                      color="orange"
                      component={Link}
                      href={`/admin/fiches/${fiche.id}/modifier`}
                      leftSection={<IconEdit size="1rem" />}
                    >
                      Modifier
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </>
  )
}
