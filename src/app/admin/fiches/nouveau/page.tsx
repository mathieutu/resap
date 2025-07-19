'use client'

import {
  Title,
  Card,
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  Button,
  Stack,
  Group,
  FileInput,
  Grid,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconDeviceFloppy, IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { categories } from '@/data/categories'

interface FicheFormData {
  titre: string
  categorie: string
  description: string
  resume: string
  contenu: string
  tags: string[]
  illustration?: File | null
}

function CreateFicheContent() {
  const form = useForm<FicheFormData>({
    initialValues: {
      titre: '',
      categorie: '',
      description: '',
      resume: '',
      contenu: '',
      tags: [],
      illustration: null,
    },
    validate: {
      titre: (value) => (value.length < 3 ? 'Le titre doit contenir au moins 3 caractères' : null),
      categorie: (value) => (!value ? 'Veuillez sélectionner une catégorie' : null),
      description: (value) => (value.length < 10 ? 'La description doit contenir au moins 10 caractères' : null),
      resume: (value) => (value.length < 10 ? 'Le résumé doit contenir au moins 10 caractères' : null),
      contenu: (value) => (value.length < 50 ? 'Le contenu doit contenir au moins 50 caractères' : null),
    },
  })

  const categorieOptions = Object.entries(categories).map(([key, value]) => ({
    value: key,
    label: value.name,
  }))

  const handleSubmit = async (values: FicheFormData) => {
    try {
      // Ici on implémenterait la logique pour sauvegarder dans Contentful
      // eslint-disable-next-line no-console
      console.log('Données du formulaire:', values)

      notifications.show({
        title: 'Succès',
        message: 'La fiche a été créée avec succès !',
        color: 'green',
      })
    } catch (_error) {
      notifications.show({
        title: 'Erreur',
        message: 'Une erreur est survenue lors de la création de la fiche.',
        color: 'red',
      })
    }
  }

  return (
    <>
      <Group justify="space-between" mb="xl">
        <Title order={1}>Nouvelle fiche</Title>
        <Button
          component={Link}
          href="/admin/fiches"
          variant="light"
          leftSection={<IconArrowLeft size="1rem" />}
        >
          Retour à la liste
        </Button>
      </Group>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Stack gap="md">
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <TextInput
                  label="Titre de la fiche"
                  placeholder="Saisissez le titre de la fiche"
                  {...form.getInputProps('titre')}
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Select
                  label="Catégorie"
                  placeholder="Sélectionnez une catégorie"
                  data={categorieOptions}
                  {...form.getInputProps('categorie')}
                  required
                />
              </Grid.Col>
            </Grid>

            <Textarea
              label="Description courte"
              placeholder="Description qui apparaîtra dans les résultats de recherche"
              rows={3}
              {...form.getInputProps('description')}
              required
            />

            <Textarea
              label="Résumé"
              placeholder="Résumé de la fiche qui apparaîtra sur la page"
              rows={4}
              {...form.getInputProps('resume')}
              required
            />

            <Textarea
              label="Contenu principal"
              placeholder="Contenu détaillé de la fiche (support Markdown)"
              rows={10}
              {...form.getInputProps('contenu')}
              required
            />

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <MultiSelect
                  label="Tags"
                  placeholder="Ajoutez des tags pour faciliter la recherche"
                  data={[
                    'urgence',
                    'hébergement',
                    'alimentation',
                    'santé',
                    'social',
                    'aide',
                    'accompagnement',
                  ]}
                  {...form.getInputProps('tags')}
                  searchable
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <FileInput
                  label="Illustration"
                  placeholder="Sélectionnez une image d'illustration"
                  accept="image/*"
                  {...form.getInputProps('illustration')}
                />
              </Grid.Col>
            </Grid>

            <Group justify="flex-end" mt="md">
              <Button
                type="button"
                variant="light"
                component={Link}
                href="/admin/fiches"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                leftSection={<IconDeviceFloppy size="1rem" />}
              >
                Créer la fiche
              </Button>
            </Group>
          </Stack>
        </Card>
      </form>
    </>
  )
}

export default function CreateFiche() {
  return (
    <CreateFicheContent />
  )
}
