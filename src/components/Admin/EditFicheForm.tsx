'use client'

import {
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  Button,
  Stack,
  Group,
  Paper,
  Title,
  Alert,
  TagsInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { updateFiche, type FicheData } from '@/services/contentful-management'
import { categories } from '@/data/categories'
import { types } from '@/data/structures_types'
import { redirect } from 'next/navigation'

interface EditFicheFormProps {
  fiche: FicheData
}

const generateSlug = (titre: string): string => titre
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
  .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/-+/g, '-') // Replace multiple hyphens with single
  .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

export function EditFicheForm({ fiche }: EditFicheFormProps) {
  const form = useForm<FicheData>({
    initialValues: fiche,
    validate: {
      titre: (value) => (!value ? 'Le titre est requis' : null),
      slug: (value) => {
        if (!value) return 'L\'identifiant est requis'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          return 'L\'identifiant doit être en minuscule et ne doit contenir que des lettres, chiffres et "-"'
        }
        return null
      },
      categorie: (value) => (!value ? 'La catégorie est requise' : null),
      description: (value) => {
        if (!value) return 'La description est requise'
        if (value.length > 280) return 'La description ne peut pas dépasser 280 caractères'
        return null
      },
      typeDispositif: (value) => (!value?.length ? 'Au moins un type de dispositif est requis' : null),
    },
  })

  const handleSubmit = async (values: FicheData) => {
    try {
      await updateFiche(values)

      notifications.show({
        title: 'Succès',
        message: 'Fiche mise à jour avec succès',
        color: 'green',
        icon: <IconCheck size="1rem" />,
      })
    } catch (_err) {
      // eslint-disable-next-line no-console
      console.log('Error updating fiche:', _err)

      notifications.show({
        title: 'Erreur',
        message: 'Une erreur est survenue lors de la mise à jour',
        color: 'red',
        icon: <IconX size="1rem" />,
      })
      return
    }

    redirect('/admin/fiches')
  }

  const handleTitreChange = (value: string) => {
    form.setFieldValue('titre', value)
    // Auto-generate slug only if it's empty or matches the previous auto-generated slug
    const currentSlug = form.values.slug
    const expectedSlug = generateSlug(form.values.titre)

    if (!currentSlug || currentSlug === expectedSlug) {
      form.setFieldValue('slug', generateSlug(value))
    }
  }

  const categoryOptions = Object.entries(categories).map(([key, category]) => ({
    value: key,
    label: category.name,
  }))

  return (
    <Paper p="xl" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="lg">
          <Title order={2}>Informations de base</Title>

          <TextInput
            label="Titre"
            placeholder="Titre de la fiche"
            required
            {...form.getInputProps('titre')}
            onChange={(event) => handleTitreChange(event.currentTarget.value)}
          />

          <TextInput
            label="Identifiant (slug)"
            placeholder="identifiant-url"
            description="Utilisé dans l'URL. Doit être unique et contenir uniquement des lettres minuscules, chiffres et tirets."
            required
            {...form.getInputProps('slug')}
          />

          <Select
            label="Catégorie"
            placeholder="Sélectionner une catégorie"
            required
            data={categoryOptions}
            {...form.getInputProps('categorie')}
          />

          <Textarea
            label="Description"
            placeholder="Description courte (max 280 caractères)"
            description={`${form.values.description.length}/280 caractères`}
            required
            maxLength={280}
            autosize
            minRows={3}
            {...form.getInputProps('description')}
          />

          <MultiSelect
            label="Types de dispositif"
            placeholder="Sélectionner les types de dispositif"
            required
            data={Object.keys(types)}
            searchable
            {...form.getInputProps('typeDispositif')}
          />

          <TagsInput
            label="Tags"
            placeholder="Ajouter des tags"
            description="Appuyez sur Entrée pour ajouter un tag"
            {...form.getInputProps('tags')}
          />

          <Title order={3} mt="xl">Contenu</Title>

          <Alert color="blue">
            Les champs de contenu riche (Résumé et Contenu) nécessitent un éditeur spécialisé qui sera implémenté prochainement.
          </Alert>

          <Group justify="flex-end" mt="xl">
            <Button type="submit" loading={form.submitting} size="md">
              Enregistrer les modifications
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}
