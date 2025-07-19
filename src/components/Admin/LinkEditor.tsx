'use client'

import {
  Stack,
  Group,
  TextInput,
  Button,
  Paper,
  Text,
  ActionIcon,
  Textarea,
  FileInput,
  Radio,
  Collapse,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus, IconTrash, IconExternalLink, IconUpload, IconEdit, IconX } from '@tabler/icons-react'
import { useState } from 'react'

// Types pour les liens avec état local
export type PendingLink = {
  id: string // ID temporaire pour l'interface
  titre: string
  url?: string
  fichier?: string // Asset ID pour fichiers existants
  description?: string
  file?: File // Fichier en attente d'upload
  isNew?: boolean // Nouveau lien à créer
  isDeleted?: boolean // Lien marqué pour suppression
  isModified?: boolean // Lien existant modifié
}

export type Link = {
  id: string
  titre: string
  url?: string
  fichier?: string
  description?: string
}

interface LinkEditorProps {
  label: string
  description?: string
  links: PendingLink[]
  onLinksChangeAction: (links: PendingLink[]) => void
}

type LinkFormData = {
  titre: string
  url: string
  description: string
  linkType: 'url' | 'file'
  file: File | null
}

export function LinkEditor({
  label,
  description,
  links,
  onLinksChangeAction,
}: LinkEditorProps) {
  const [showForm, { toggle: toggleForm, close: closeForm }] = useDisclosure(false)
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null)

  const visibleLinks = links.filter(link => !link.isDeleted)
  const isEditing = editingLinkId !== null

  const form = useForm<LinkFormData>({
    initialValues: {
      titre: '',
      url: '',
      description: '',
      linkType: 'url',
      file: null,
    },
    validate: {
      titre: (value) => (!value ? 'Le titre est requis' : null),
      url: (value, values) => {
        if (values.linkType === 'url' && !value) {
          return 'L\'URL est requise'
        }
        return null
      },
      file: (value, values) => {
        if (values.linkType === 'file' && !value) {
          return 'Le fichier est requis'
        }
        return null
      },
    },
  })

  const openCreateForm = () => {
    setEditingLinkId(null)
    form.reset()
    toggleForm()
  }

  const openEditForm = (link: PendingLink) => {
    setEditingLinkId(link.id)
    form.setValues({
      titre: link.titre,
      url: link.url || '',
      description: link.description || '',
      linkType: link.file || link.fichier ? 'file' : 'url',
      file: link.file || null,
    })
    if (!showForm) {
      toggleForm()
    }
  }

  const handleSubmit = () => {
    const validation = form.validate()
    if (validation.hasErrors) return

    const { values } = form

    if (isEditing) {
      // Modifier un lien existant
      const updatedLinks = links.map(link => (
        link.id === editingLinkId
          ? {
              ...link,
              titre: values.titre,
              url: values.linkType === 'url' ? values.url : undefined,
              file: values.linkType === 'file' ? values.file || undefined : undefined,
              description: values.description || '',
              isModified: !link.isNew, // Marquer comme modifié seulement si ce n'est pas un nouveau lien
            }
          : link
      ))
      onLinksChangeAction(updatedLinks)
    } else {
      // Créer un nouveau lien
      const newLink: PendingLink = {
        id: `temp-${Date.now()}`, // ID temporaire
        titre: values.titre,
        description: values.description || '',
        isNew: true,
      }

      if (values.linkType === 'file' && values.file) {
        newLink.file = values.file
      } else {
        newLink.url = values.url
      }

      onLinksChangeAction([...links, newLink])
    }

    closeForm()
    form.reset()
    setEditingLinkId(null)
  }

  const handleDeleteLink = (linkId: string) => {
    const linkToDelete = links.find(link => link.id === linkId)

    if (linkToDelete?.isNew) {
      // Supprimer complètement les nouveaux liens
      const updatedLinks = links.filter(link => link.id !== linkId)
      onLinksChangeAction(updatedLinks)
    } else {
      // Marquer les liens existants pour suppression
      const updatedLinks = links.map(link => (
        link.id === linkId ? { ...link, isDeleted: true } : link
      ))
      onLinksChangeAction(updatedLinks)
    }
  }

  const handleCancel = () => {
    closeForm()
    form.reset()
    setEditingLinkId(null)
  }

  return (
    <Stack gap="md">
      <div>
        <Text fw={500} size="sm" mb="xs">{label}</Text>
        {description && <Text size="xs" c="dimmed" mb="sm">{description}</Text>}
      </div>

      {/* Liens visibles */}
      {visibleLinks.length > 0 && (
        <Stack gap="xs">
          {visibleLinks.map((link) => (
            <Paper key={link.id} p="md" withBorder>
              <Group justify="space-between" align="flex-start">
                <div style={{ flex: 1 }}>
                  <Group gap="xs" align="center">
                    <Text fw={500} size="sm">{link.titre}</Text>
                    {link.isNew && (
                      <Text size="xs" c="blue" fw={500}>NOUVEAU</Text>
                    )}
                    {link.isModified && (
                      <Text size="xs" c="orange" fw={500}>MODIFIÉ</Text>
                    )}
                  </Group>
                  {link.url && (
                    <Text
                      size="xs"
                      c="blue"
                      component="a"
                      href={link.url}
                      target="_blank"
                      style={{ textDecoration: 'none' }}
                    >
                      {link.url} <IconExternalLink size="0.8rem" style={{ display: 'inline' }} />
                    </Text>
                  )}
                  {link.file && (
                    <Text size="xs" c="green">
                      Fichier: {link.file.name} ({(link.file.size / 1024 / 1024).toFixed(2)} MB)
                    </Text>
                  )}
                  {link.description && (
                    <Text size="xs" c="dimmed" mt="xs">{link.description}</Text>
                  )}
                </div>
                <Group gap="xs">
                  <ActionIcon
                    variant="light"
                    size="sm"
                    onClick={() => openEditForm(link)}
                  >
                    <IconEdit size="1rem" />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    variant="light"
                    size="sm"
                    onClick={() => handleDeleteLink(link.id)}
                  >
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </Group>
              </Group>
            </Paper>
          ))}
        </Stack>
      )}

      {/* Bouton pour ajouter un nouveau lien */}
      {!showForm && (
        <Button
          leftSection={<IconPlus size="1rem" />}
          variant="light"
          onClick={openCreateForm}
          size="sm"
        >
          Ajouter un nouveau lien
        </Button>
      )}

      {/* Formulaire inline pour créer/éditer un lien */}
      <Collapse in={showForm}>
        <Paper p="md" withBorder style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
          <Stack gap="sm">
            <Group justify="space-between" align="center">
              <Text fw={500} size="sm">
                {isEditing ? 'Modifier le lien' : 'Ajouter un nouveau lien'}
              </Text>
              <ActionIcon
                variant="subtle"
                size="sm"
                onClick={handleCancel}
              >
                <IconX size="1rem" />
              </ActionIcon>
            </Group>

            <Stack gap="sm">
              <Radio.Group
                {...form.getInputProps('linkType')}
                label="Type de lien"
                required
              >
                <Group mt="xs">
                  <Radio value="url" label="Lien web (URL)" />
                  <Radio value="file" label="Fichier à uploader" />
                </Group>
              </Radio.Group>

              <TextInput
                label="Titre"
                placeholder="Titre du lien"
                required
                {...form.getInputProps('titre')}
              />

              {form.values.linkType === 'url' ? (
                <TextInput
                  label="URL"
                  placeholder="https://..."
                  required
                  {...form.getInputProps('url')}
                />
              ) : (
                <Stack gap="xs">
                  <FileInput
                    label="Fichier"
                    placeholder="Sélectionner un fichier"
                    leftSection={<IconUpload size="1rem" />}
                    required
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
                    {...form.getInputProps('file')}
                  />
                  {form.values.file && (
                    <Text size="xs" c="blue">
                      Fichier sélectionné: {form.values.file.name} ({(form.values.file.size / 1024 / 1024).toFixed(2)} MB)
                    </Text>
                  )}
                </Stack>
              )}

              <Textarea
                label="Description (optionnel)"
                placeholder="Description du lien"
                autosize
                minRows={2}
                {...form.getInputProps('description')}
              />

              <Group justify="flex-end" mt="sm">
                <Button variant="light" onClick={handleCancel}>
                  Annuler
                </Button>
                <Button onClick={handleSubmit}>
                  {isEditing ? 'Modifier' : 'Ajouter'}
                </Button>
              </Group>
            </Stack>
          </Stack>
        </Paper>
      </Collapse>
    </Stack>
  )
}
