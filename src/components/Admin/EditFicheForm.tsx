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
  Image,
  Text,
  Box,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { updateFiche, type FicheData, createOrUpdateLink, deleteLink, uploadFileToContentful } from '@/services/contentful-management'
import { LinkEditor, type PendingLink } from '@/components/Admin/LinkEditor'
import { categories } from '@/data/categories'
import { types } from '@/data/structures_types'
import { redirect } from 'next/navigation'
import { useState } from 'react'

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

// Convertir les liens existants vers le format PendingLink
const convertToPendingLinks = (links: FicheData['pourEnSavoirPlus']): PendingLink[] => links.map(link => ({
    id: link.id,
    titre: link.titre,
    url: link.url,
    fichier: link.fichier,
    description: link.description,
  }))

export function EditFicheForm({ fiche }: EditFicheFormProps) {
  const [pourEnSavoirPlus, setPourEnSavoirPlus] = useState<PendingLink[]>(convertToPendingLinks(fiche.pourEnSavoirPlus))
  const [outils, setOutils] = useState<PendingLink[]>(convertToPendingLinks(fiche.outils))
  const [patients, setPatients] = useState<PendingLink[]>(convertToPendingLinks(fiche.patients))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<Omit<FicheData, 'pourEnSavoirPlus' | 'outils' | 'patients'>>({
    initialValues: {
      id: fiche.id,
      titre: fiche.titre,
      slug: fiche.slug,
      categorie: fiche.categorie,
      illustration: fiche.illustration,
      description: fiche.description,
      typeDispositif: fiche.typeDispositif,
      tags: fiche.tags,
      resume: fiche.resume,
      contenu: fiche.contenu,
    },
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
      illustration: (value) => (!value?.id ? 'L\'illustration est requise' : null),
      description: (value) => {
        if (!value) return 'La description est requise'
        if (value.length > 280) return 'La description ne peut pas dépasser 280 caractères'
        return null
      },
      typeDispositif: (value) => (!value?.length ? 'Au moins un type de dispositif est requis' : null),
    },
  })

  // Traiter les liens lors de l'enregistrement
  const processLinks = async (pendingLinks: PendingLink[]) => {
    const processedLinkIds: string[] = []

    for (const link of pendingLinks) {
      if (link.isDeleted && !link.isNew) {
        // Supprimer les liens existants marqués pour suppression
        try {
          await deleteLink(link.id)
        } catch (error) {
          console.error('Erreur lors de la suppression du lien:', error)
          throw new Error(`Erreur lors de la suppression du lien "${link.titre}"`)
        }
      } else if (!link.isDeleted) {
        // Traiter les nouveaux liens et les liens modifiés
        try {
          let linkData = {
            titre: link.titre,
            description: link.description,
            url: link.url,
            fichier: link.fichier,
          }

          // Si c'est un nouveau lien avec un fichier à uploader
          if (link.isNew && link.file) {
            const assetId = await uploadFileToContentful(link.file)
            linkData = {
              ...linkData,
              fichier: assetId,
              url: undefined, // Fichier et URL sont mutuellement exclusifs
            }
          }

          // Créer ou mettre à jour le lien
          const linkId = await createOrUpdateLink({
            ...linkData,
            id: link.isNew ? undefined : link.id,
          })

          processedLinkIds.push(linkId)
        } catch (error) {
          console.error('Erreur lors du traitement du lien:', error)
          throw new Error(`Erreur lors du traitement du lien "${link.titre}"`)
        }
      }
    }

    return processedLinkIds
  }

  const handleSubmit = async (values: Omit<FicheData, 'pourEnSavoirPlus' | 'outils' | 'patients'>) => {
    setIsSubmitting(true)

    try {
      // Traiter tous les liens en parallèle
      const [pourEnSavoirPlusIds, outilsIds, patientsIds] = await Promise.all([
        processLinks(pourEnSavoirPlus),
        processLinks(outils),
        processLinks(patients),
      ])

      // Construire les données de la fiche avec les IDs des liens traités
      const ficheData: FicheData = {
        ...values,
        pourEnSavoirPlus: pourEnSavoirPlusIds.map(id => ({ id, titre: '', url: '', description: '' })), // Les données complètes seront récupérées par updateFiche
        outils: outilsIds.map(id => ({ id, titre: '', url: '', description: '' })),
        patients: patientsIds.map(id => ({ id, titre: '', url: '', description: '' })),
      }

      await updateFiche(ficheData)

      notifications.show({
        title: 'Succès',
        message: 'Fiche mise à jour avec succès',
        color: 'green',
        icon: <IconCheck size="1rem" />,
      })

      redirect('/admin/fiches')
    } catch (error) {
      console.error('Error updating fiche:', error)

      notifications.show({
        title: 'Erreur',
        message: error instanceof Error ? error.message : 'Une erreur est survenue lors de la mise à jour',
        color: 'red',
        icon: <IconX size="1rem" />,
      })
    } finally {
      setIsSubmitting(false)
    }
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

          <Box>
            {form.values.illustration?.url && (
              <Box mt="sm">
                <Text size="sm" c="dimmed" mb="xs">Aperçu :</Text>
                <Image
                  src={`https:${form.values.illustration.url}`}
                  alt={form.values.illustration.title}
                  h={120}
                  w="auto"
                  fit="contain"
                  radius="md"
                />
              </Box>
            )}
          </Box>

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
            Pour le moment, ces champs conservent leur contenu existant.
          </Alert>

          <Title order={3} mt="xl">Liens et ressources (optionnels)</Title>

          <Alert color="yellow">
            Les modifications des liens ne seront appliquées qu'à l'enregistrement de la fiche.
          </Alert>

          <LinkEditor
            label="Pour aller plus loin"
            description="Liens pour approfondir le sujet"
            links={pourEnSavoirPlus}
            onLinksChangeAction={setPourEnSavoirPlus}
          />

          <LinkEditor
            label="Quelques outils"
            description="Outils pratiques liés à cette fiche"
            links={outils}
            onLinksChangeAction={setOutils}
          />

          <LinkEditor
            label="Pour les patients"
            description="Ressources destinées aux patients"
            links={patients}
            onLinksChangeAction={setPatients}
          />

          <Group justify="flex-end" mt="xl">
            <Button type="submit" loading={isSubmitting} size="md">
              Enregistrer les modifications
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}
